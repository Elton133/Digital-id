// import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as FileSystem from 'expo-file-system/legacy'

// export interface StoredCardImages {
//   front: string
//   back: string
//   timestamp: number
// }

// /**
//  * Retrieve stored Ghana Card images from local storage
//  * @returns Promise<StoredCardImages | null>
//  */
// export const getStoredCardImages = async (): Promise<StoredCardImages | null> => {
//   try {
//     const storedData = await AsyncStorage.getItem('ghana_card_images')
    
//     if (!storedData) {
//       console.log('No stored card images found')
//       return null
//     }
    
//     const imageData: StoredCardImages = JSON.parse(storedData)
    
//     // Verify that both image files still exist
//     const frontExists = await FileSystem.getInfoAsync(imageData.front)
//     const backExists = await FileSystem.getInfoAsync(imageData.back)
    
//     if (!frontExists.exists || !backExists.exists) {
//       console.log('Stored images no longer exist, cleaning up')
//       // Clean up invalid data
//       await AsyncStorage.removeItem('ghana_card_images')
//       return null
//     }
    
//     console.log('Retrieved stored card images successfully')
//     return imageData
//   } catch (error) {
//     console.error('Error retrieving stored images:', error)
//     return null
//   }
// }

// /**
//  * Check if Ghana Card images are stored locally
//  * @returns Promise<boolean>
//  */
// export const hasStoredCardImages = async (): Promise<boolean> => {
//   const images = await getStoredCardImages()
//   return images !== null
// }

// /**
//  * Delete all stored Ghana Card images
//  * @returns Promise<boolean> - Success status
//  */
// export const deleteStoredCardImages = async (): Promise<boolean> => {
//   try {
//     const imageData = await getStoredCardImages()
    
//     if (imageData) {
//       // Delete physical files
//       const frontExists = await FileSystem.getInfoAsync(imageData.front)
//       const backExists = await FileSystem.getInfoAsync(imageData.back)
      
//       if (frontExists.exists) {
//         await FileSystem.deleteAsync(imageData.front)
//         console.log('Deleted front image file')
//       }
      
//       if (backExists.exists) {
//         await FileSystem.deleteAsync(imageData.back)
//         console.log('Deleted back image file')
//       }
//     }
    
//     // Remove from AsyncStorage
//     await AsyncStorage.removeItem('ghana_card_images')
//     console.log('Cleared image data from AsyncStorage')
    
//     return true
//   } catch (error) {
//     console.error('Error deleting stored images:', error)
//     return false
//   }
// }

// /**
//  * Get the URI for displaying images in Image components
//  * Since we're using local file paths, we need to ensure proper URI format
//  * @param localPath - The local file path
//  * @returns string - Properly formatted URI
//  */
// export const getImageUri = (localPath: string): string => {
//   // FileSystem.documentDirectory already provides a proper file:// URI
//   // but just to be safe, we'll ensure it's properly formatted
//   return localPath.startsWith('file://') ? localPath : `file://${localPath}`
// }






import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system/legacy'

export interface StoredCardImages {
  front: string
  back: string
  timestamp: number
}

/** Key for AsyncStorage */
const STORAGE_KEY = 'ghana_card_images'

/**
 * Save a new card
 */
export const saveCardImages = async (card: StoredCardImages): Promise<void> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY)
    const cards: StoredCardImages[] = storedData ? JSON.parse(storedData) : []
    cards.push(card)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    console.log('Card saved successfully')
  } catch (err) {
    console.error('Error saving card:', err)
  }
}

/**
 * Retrieve all stored Ghana Card images
 */
export const getAllStoredCardImages = async (): Promise<StoredCardImages[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY)
    if (!storedData) return []

    let cards: StoredCardImages[] = JSON.parse(storedData)

    // Verify files exist, filter out missing ones
    const validCards: StoredCardImages[] = []
    for (const card of cards) {
      const frontExists = await FileSystem.getInfoAsync(card.front)
      const backExists = await FileSystem.getInfoAsync(card.back)
      if (frontExists.exists && backExists.exists) {
        validCards.push(card)
      }
    }

    // Update AsyncStorage to remove invalid cards
    if (validCards.length !== cards.length) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(validCards))
    }

    return validCards
  } catch (err) {
    console.error('Error retrieving cards:', err)
    return []
  }
}

/**
 * Delete a specific card by timestamp
 */
export const deleteStoredCardByTimestamp = async (timestamp: number): Promise<boolean> => {
  try {
    const cards = await getAllStoredCardImages()
    const cardToDelete = cards.find(c => c.timestamp === timestamp)
    if (!cardToDelete) return false

    // Delete files
    const frontExists = await FileSystem.getInfoAsync(cardToDelete.front)
    if (frontExists.exists) await FileSystem.deleteAsync(cardToDelete.front)

    const backExists = await FileSystem.getInfoAsync(cardToDelete.back)
    if (backExists.exists) await FileSystem.deleteAsync(cardToDelete.back)

    // Update AsyncStorage
    const updatedCards = cards.filter(c => c.timestamp !== timestamp)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards))
    console.log('Deleted card successfully')
    return true
  } catch (err) {
    console.error('Error deleting card:', err)
    return false
  }
}

/**
 * Delete all cards
 */
export const deleteAllStoredCards = async (): Promise<boolean> => {
  try {
    const cards = await getAllStoredCardImages()
    for (const card of cards) {
      const frontExists = await FileSystem.getInfoAsync(card.front)
      if (frontExists.exists) await FileSystem.deleteAsync(card.front)

      const backExists = await FileSystem.getInfoAsync(card.back)
      if (backExists.exists) await FileSystem.deleteAsync(card.back)
    }
    await AsyncStorage.removeItem(STORAGE_KEY)
    console.log('All cards deleted')
    return true
  } catch (err) {
    console.error('Error deleting all cards:', err)
    return false
  }
}

/**
 * Format a local path for Image component
 */
export const getImageUri = (localPath: string): string => {
  return localPath.startsWith('file://') ? localPath : `file://${localPath}`
}
