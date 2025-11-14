import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BiometricType = 'fingerprint' | 'faceId' | 'iris' | 'pin';

interface BiometricCapabilities {
  isAvailable: boolean;
  supportedTypes: BiometricType[];
}

/**
 * Check if biometric authentication is available and what types are supported
 */
export const checkBiometricCapabilities = async (): Promise<BiometricCapabilities> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return { isAvailable: false, supportedTypes: [] };
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return { isAvailable: false, supportedTypes: [] };
    }

    const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const supportedTypes: BiometricType[] = [];

    supportedAuthTypes.forEach((type) => {
      if (type === LocalAuthentication.AuthenticationType.FINGERPRINT) {
        supportedTypes.push('fingerprint');
      } else if (type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) {
        supportedTypes.push('faceId');
      } else if (type === LocalAuthentication.AuthenticationType.IRIS) {
        supportedTypes.push('iris');
      }
    });

    return {
      isAvailable: true,
      supportedTypes,
    };
  } catch (error) {
    console.error('Error checking biometric capabilities:', error);
    return { isAvailable: false, supportedTypes: [] };
  }
};

/**
 * Authenticate user with biometrics
 */
export const authenticateWithBiometrics = async (
  promptMessage: string = 'Authenticate to continue'
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel: 'Cancel',
      fallbackLabel: 'Use PIN',
      disableDeviceFallback: false,
    });

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error || 'Authentication failed',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Authentication error',
    };
  }
};

/**
 * Save user's preferred biometric method
 */
export const saveBiometricPreference = async (method: BiometricType): Promise<void> => {
  try {
    await AsyncStorage.setItem('biometric_preference', method);
  } catch (error) {
    console.error('Error saving biometric preference:', error);
    throw error;
  }
};

/**
 * Get user's preferred biometric method
 */
export const getBiometricPreference = async (): Promise<BiometricType | null> => {
  try {
    const preference = await AsyncStorage.getItem('biometric_preference');
    return preference as BiometricType | null;
  } catch (error) {
    console.error('Error getting biometric preference:', error);
    return null;
  }
};

/**
 * Store PIN securely
 */
export const storePIN = async (pin: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('user_pin', pin);
    await AsyncStorage.setItem('biometric_preference', 'pin');
  } catch (error) {
    console.error('Error storing PIN:', error);
    throw error;
  }
};

/**
 * Verify PIN
 */
export const verifyPIN = async (pin: string): Promise<boolean> => {
  try {
    const storedPin = await SecureStore.getItemAsync('user_pin');
    return storedPin === pin;
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return false;
  }
};

/**
 * Check if PIN is set
 */
export const isPINSet = async (): Promise<boolean> => {
  try {
    const pin = await SecureStore.getItemAsync('user_pin');
    return pin !== null;
  } catch (error) {
    console.error('Error checking PIN:', error);
    return false;
  }
};

/**
 * Setup session timeout
 */
export const setupSessionTimeout = async (timeoutMinutes: number = 5): Promise<void> => {
  try {
    const timeoutMs = timeoutMinutes * 60 * 1000;
    const expiryTime = Date.now() + timeoutMs;
    await AsyncStorage.setItem('session_expiry', expiryTime.toString());
  } catch (error) {
    console.error('Error setting up session timeout:', error);
  }
};

/**
 * Check if session is expired
 */
export const isSessionExpired = async (): Promise<boolean> => {
  try {
    const expiryTime = await AsyncStorage.getItem('session_expiry');
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  } catch (error) {
    console.error('Error checking session expiry:', error);
    return true;
  }
};

/**
 * Refresh session
 */
export const refreshSession = async (): Promise<void> => {
  await setupSessionTimeout();
};

/**
 * Clear session
 */
export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('session_expiry');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};
