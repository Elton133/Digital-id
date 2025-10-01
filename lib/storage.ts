import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { StoredCardImages } from './imageUtils'

export const saveImageLocally = async (imageUri: string, side: "front" | "back"): Promise<string> => {
  console.log(`Saving ${side} image:`, imageUri)
  return imageUri // returning the camera URI directly
}

export const saveImagePaths = async (frontPath: string, backPath: string) => {
  try {
    const newCard: StoredCardImages = {
      front: frontPath,
      back: backPath,
      timestamp: Date.now(),
    }

    const storedData = await AsyncStorage.getItem('ghana_card_images')
    let cards: StoredCardImages[] = []

    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (Array.isArray(parsed)) cards = parsed
      else if (parsed && typeof parsed === 'object') cards = [parsed]
    }

    cards.push(newCard)
    await AsyncStorage.setItem('ghana_card_images', JSON.stringify(cards))
    console.log('Image paths saved to AsyncStorage successfully')
  } catch (error) {
    console.error('Error saving image paths:', error)
  }
}

export const deleteStoredImages = async (images: { localPath: string }[]) => {
  try {
    for (const image of images) {
      const fileExists = await FileSystem.getInfoAsync(image.localPath)
      if (fileExists.exists) {
        await FileSystem.deleteAsync(image.localPath)
        console.log(`Deleted image: ${image.localPath}`)
      }
    }
    await AsyncStorage.removeItem('ghana_card_images')
    console.log('Cleared image paths from AsyncStorage')
  } catch (error) {
    console.error('Error deleting stored images:', error)
  }
}
