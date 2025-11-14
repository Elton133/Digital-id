import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface EmergencyInfo {
  fullName: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  medicalConditions?: string[];
  emergencyContacts: EmergencyContact[];
  identityNumber?: string;
  lastUpdated: number;
}

const EMERGENCY_INFO_KEY = 'emergency_info';
const OFFLINE_CACHE_KEY = 'offline_verification_cache';

/**
 * Save emergency information
 */
export const saveEmergencyInfo = async (info: EmergencyInfo): Promise<void> => {
  try {
    const data = {
      ...info,
      lastUpdated: Date.now(),
    };
    await SecureStore.setItemAsync(EMERGENCY_INFO_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving emergency info:', error);
    throw error;
  }
};

/**
 * Get emergency information
 */
export const getEmergencyInfo = async (): Promise<EmergencyInfo | null> => {
  try {
    const dataString = await SecureStore.getItemAsync(EMERGENCY_INFO_KEY);
    if (!dataString) return null;
    return JSON.parse(dataString);
  } catch (error) {
    console.error('Error getting emergency info:', error);
    return null;
  }
};

/**
 * Add emergency contact
 */
export const addEmergencyContact = async (
  contact: Omit<EmergencyContact, 'id'>
): Promise<EmergencyContact> => {
  try {
    const info = await getEmergencyInfo();
    if (!info) throw new Error('No emergency info found');

    const newContact: EmergencyContact = {
      ...contact,
      id: Date.now().toString(),
    };

    info.emergencyContacts.push(newContact);
    info.lastUpdated = Date.now();

    await SecureStore.setItemAsync(EMERGENCY_INFO_KEY, JSON.stringify(info));
    return newContact;
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    throw error;
  }
};

/**
 * Update emergency contact
 */
export const updateEmergencyContact = async (
  contactId: string,
  updates: Partial<EmergencyContact>
): Promise<EmergencyContact | null> => {
  try {
    const info = await getEmergencyInfo();
    if (!info) return null;

    const index = info.emergencyContacts.findIndex((c) => c.id === contactId);
    if (index === -1) return null;

    info.emergencyContacts[index] = {
      ...info.emergencyContacts[index],
      ...updates,
    };
    info.lastUpdated = Date.now();

    await SecureStore.setItemAsync(EMERGENCY_INFO_KEY, JSON.stringify(info));
    return info.emergencyContacts[index];
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    throw error;
  }
};

/**
 * Delete emergency contact
 */
export const deleteEmergencyContact = async (contactId: string): Promise<boolean> => {
  try {
    const info = await getEmergencyInfo();
    if (!info) return false;

    info.emergencyContacts = info.emergencyContacts.filter((c) => c.id !== contactId);
    info.lastUpdated = Date.now();

    await SecureStore.setItemAsync(EMERGENCY_INFO_KEY, JSON.stringify(info));
    return true;
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    return false;
  }
};

/**
 * Cache essential info for offline verification
 */
export const cacheOfflineVerificationData = async (
  identityData: any
): Promise<void> => {
  try {
    const cacheData = {
      timestamp: Date.now(),
      data: identityData,
    };
    await AsyncStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching offline verification data:', error);
    throw error;
  }
};

/**
 * Get offline verification data
 */
export const getOfflineVerificationData = async (): Promise<any | null> => {
  try {
    const cacheString = await AsyncStorage.getItem(OFFLINE_CACHE_KEY);
    if (!cacheString) return null;

    const cache = JSON.parse(cacheString);
    
    // Check if cache is less than 7 days old
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - cache.timestamp > sevenDaysInMs) {
      // Cache expired
      await AsyncStorage.removeItem(OFFLINE_CACHE_KEY);
      return null;
    }

    return cache.data;
  } catch (error) {
    console.error('Error getting offline verification data:', error);
    return null;
  }
};

/**
 * Share emergency info with contact
 */
export const shareEmergencyInfoWithContact = async (
  contactId: string,
  method: 'sms' | 'email' = 'sms'
): Promise<{ success: boolean; message: string }> => {
  try {
    const info = await getEmergencyInfo();
    if (!info) {
      return { success: false, message: 'No emergency info found' };
    }

    const contact = info.emergencyContacts.find((c) => c.id === contactId);
    if (!contact) {
      return { success: false, message: 'Contact not found' };
    }

    // Format emergency info for sharing
    const shareText = formatEmergencyInfoForSharing(info);

    // In a real app, you would use Linking or a messaging library
    // For now, we'll just prepare the message
    return {
      success: true,
      message: `Emergency info would be shared with ${contact.name} via ${method}`,
    };
  } catch (error) {
    console.error('Error sharing emergency info:', error);
    return {
      success: false,
      message: 'Failed to share emergency info',
    };
  }
};

/**
 * Format emergency info for sharing
 */
const formatEmergencyInfoForSharing = (info: EmergencyInfo): string => {
  let text = `EMERGENCY INFORMATION\n\n`;
  text += `Name: ${info.fullName}\n`;
  
  if (info.bloodType) text += `Blood Type: ${info.bloodType}\n`;
  if (info.allergies && info.allergies.length > 0) {
    text += `Allergies: ${info.allergies.join(', ')}\n`;
  }
  if (info.medications && info.medications.length > 0) {
    text += `Medications: ${info.medications.join(', ')}\n`;
  }
  if (info.medicalConditions && info.medicalConditions.length > 0) {
    text += `Medical Conditions: ${info.medicalConditions.join(', ')}\n`;
  }
  
  text += `\nEMERGENCY CONTACTS:\n`;
  info.emergencyContacts.forEach((contact) => {
    text += `- ${contact.name} (${contact.relationship}): ${contact.phone}\n`;
  });

  return text;
};

/**
 * Get quick access essential info
 */
export const getQuickAccessInfo = async (): Promise<{
  name: string;
  identityNumber?: string;
  emergencyContactsCount: number;
  bloodType?: string;
} | null> => {
  try {
    const info = await getEmergencyInfo();
    if (!info) return null;

    return {
      name: info.fullName,
      identityNumber: info.identityNumber,
      emergencyContactsCount: info.emergencyContacts.length,
      bloodType: info.bloodType,
    };
  } catch (error) {
    console.error('Error getting quick access info:', error);
    return null;
  }
};
