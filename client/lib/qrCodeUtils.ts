import * as SecureStore from 'expo-secure-store';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export interface ShareableCard {
  id: string;
  type: string;
  expiresAt: number;
  data: any;
}

/**
 * Generate a time-limited shareable link for a card
 */
export const generateShareableLink = async (
  cardData: any,
  expirationMinutes: number = 30
): Promise<{ link: string; token: string; expiresAt: number }> => {
  try {
    // Generate a unique token
    const token = generateUniqueToken();
    const expiresAt = Date.now() + expirationMinutes * 60 * 1000;

    // Store the card data with expiration
    const shareableData: ShareableCard = {
      id: token,
      type: cardData.type || 'identity',
      expiresAt,
      data: cardData,
    };

    await SecureStore.setItemAsync(
      `shareable_${token}`,
      JSON.stringify(shareableData)
    );

    // Generate link (in production, this would be your actual domain)
    const link = `digitalid://share/${token}`;

    return { link, token, expiresAt };
  } catch (error) {
    console.error('Error generating shareable link:', error);
    throw error;
  }
};

/**
 * Generate QR code data for sharing
 */
export const generateQRCodeData = async (
  cardData: any,
  expirationMinutes: number = 30
): Promise<{ qrData: string; expiresAt: number }> => {
  try {
    const { link, expiresAt } = await generateShareableLink(
      cardData,
      expirationMinutes
    );

    // QR code will contain the link and expiration info
    const qrData = JSON.stringify({
      link,
      expiresAt,
      type: 'digitalid_share',
    });

    return { qrData, expiresAt };
  } catch (error) {
    console.error('Error generating QR code data:', error);
    throw error;
  }
};

/**
 * Retrieve shared card data using token
 */
export const retrieveSharedCard = async (
  token: string
): Promise<ShareableCard | null> => {
  try {
    const dataString = await SecureStore.getItemAsync(`shareable_${token}`);
    if (!dataString) return null;

    const data: ShareableCard = JSON.parse(dataString);

    // Check if expired
    if (Date.now() > data.expiresAt) {
      // Clean up expired data
      await SecureStore.deleteItemAsync(`shareable_${token}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error retrieving shared card:', error);
    return null;
  }
};

/**
 * Revoke a shareable link
 */
export const revokeShareableLink = async (token: string): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(`shareable_${token}`);
    return true;
  } catch (error) {
    console.error('Error revoking shareable link:', error);
    return false;
  }
};

/**
 * Clean up expired shareable links
 */
export const cleanupExpiredLinks = async (): Promise<void> => {
  // This would be called periodically to clean up expired tokens
  // Implementation would depend on how we store all tokens
  // For now, expiration is checked on retrieval
};

/**
 * Generate a unique token
 */
const generateUniqueToken = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}`;
};

/**
 * Share QR code image
 */
export const shareQRCodeImage = async (qrCodeUri: string): Promise<void> => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Sharing is not available on this device');
    }

    await Sharing.shareAsync(qrCodeUri, {
      mimeType: 'image/png',
      dialogTitle: 'Share QR Code',
    });
  } catch (error) {
    console.error('Error sharing QR code:', error);
    throw error;
  }
};

/**
 * Save QR code to file system
 */
export const saveQRCodeToFile = async (
  svgRef: any,
  fileName: string = 'qr-code'
): Promise<string> => {
  try {
    // This would be implemented with the actual QR code library's save method
    const fileUri = `${FileSystem.documentDirectory}${fileName}.png`;
    // Save implementation depends on QR code library
    return fileUri;
  } catch (error) {
    console.error('Error saving QR code:', error);
    throw error;
  }
};
