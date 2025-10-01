import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Alert, Animated } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { useRouter } from "expo-router"
import * as FileSystem from "expo-file-system/legacy"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StoredCardImages } from "@/lib/imageUtils"

export type CaptureStep = "front" | "back" | "complete"
export type LightingCondition = "good" | "poor" | "checking"

export interface CapturedImage {
  uri: string
  localPath: string
  side: "front" | "back"
  timestamp: number
}

const STORAGE_KEY = "ghana_card_images"

const saveImageLocally = async (
  imageUri: string,
  side: "front" | "back",
): Promise<string> => {
  try {
    const timestamp = Date.now()
    const filename = `ghana_card_${side}_${timestamp}.jpg`
    const localPath = `${FileSystem.documentDirectory}${filename}`
    await FileSystem.copyAsync({ from: imageUri, to: localPath })
    return localPath
  } catch (error) {
    console.error("Error saving image locally:", error)
    throw error
  }
}

const saveImagePaths = async (frontPath: string, backPath: string) => {
  try {
    const newCard: StoredCardImages = {
      front: frontPath,
      back: backPath,
      timestamp: Date.now(),
    }

    const storedData = await AsyncStorage.getItem(STORAGE_KEY)

    let cards: StoredCardImages[] = []
    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (Array.isArray(parsed)) {
        cards = parsed
      } else if (parsed && typeof parsed === "object") {
        cards = [parsed]
      }
    }

    cards.push(newCard)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch (error) {
    console.error("Error saving image paths:", error)
  }
}

const deleteStoredImages = async (images: CapturedImage[]) => {
  try {
    for (const image of images) {
      const fileInfo = await FileSystem.getInfoAsync(image.localPath)
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(image.localPath)
      }
    }
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error deleting stored images:", error)
  }
}

export function useAddCardCamera() {
  const router = useRouter()
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)
  const [currentStep, setCurrentStep] = useState<CaptureStep>("front")
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [lightingCondition, setLightingCondition] = useState<LightingCondition>("checking")
  const [isCapturing, setIsCapturing] = useState(false)

  // Animation
  const pulseAnim = useRef(new Animated.Value(1)).current

  const startPulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [pulseAnim])

  useEffect(() => {
    startPulseAnimation()
  }, [startPulseAnimation])

  // Simulated lighting detection with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      const conditions: LightingCondition[] = ["good", "poor", "good", "good"]
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
      setLightingCondition(randomCondition)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const takePicture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return
    setIsCapturing(true)
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      })

      if (photo) {
        const localPath = await saveImageLocally(photo.uri, currentStep as "front" | "back")
        const newImage: CapturedImage = {
          uri: photo.uri,
          localPath,
          side: (currentStep as "front" | "back"),
          timestamp: Date.now(),
        }

        setCapturedImages((prev) => {
          const updated = [...prev, newImage]
          if (updated.length === 2) {
            const frontImage = updated.find((img) => img.side === "front")
            const backImage = updated.find((img) => img.side === "back")
            if (frontImage && backImage) {
              // Fire and forget
              void saveImagePaths(frontImage.localPath, backImage.localPath)
            }
          }
          return updated
        })

        if (currentStep === "front") {
          setCurrentStep("back")
        } else {
          setCurrentStep("complete")
          Alert.alert(
            "Success!",
            "Both sides of your ID have been captured and saved securely on your device.",
            [{ text: "OK", onPress: () => {} }],
          )
        }
      }
    } catch (error) {
      console.error("Camera error:", error)
      Alert.alert("Error", "Failed to capture and save image. Please try again.")
    } finally {
      setIsCapturing(false)
    }
  }, [cameraRef, currentStep, isCapturing])

  const retakePhoto = useCallback(async () => {
    if (currentStep === "back") {
      if (capturedImages.length > 0) {
        await deleteStoredImages([capturedImages[0]])
      }
      setCurrentStep("front")
      setCapturedImages([])
    } else if (currentStep === "complete") {
      await deleteStoredImages(capturedImages)
      setCurrentStep("front")
      setCapturedImages([])
    }
  }, [capturedImages, currentStep])

  const handleContinue = useCallback(() => {
    router.push("/screens/folder-details")
  }, [router])

  const getLightingColor = useCallback(() => {
    switch (lightingCondition) {
      case "good":
        return "#22c55e"
      case "poor":
        return "#ef4444"
      default:
        return "#f59e0b"
    }
  }, [lightingCondition])

  const getLightingText = useCallback(() => {
    switch (lightingCondition) {
      case "good":
        return "Good lighting detected"
      case "poor":
        return "Poor lighting - move to better light"
      default:
        return "Checking lighting..."
    }
  }, [lightingCondition])

  const instructions = useMemo(() => {
    switch (currentStep) {
      case "front":
        return {
          title: "Capture Front of ID",
          subtitle:
            "Position your ID within the frame and ensure all text is clearly visible",
        }
      case "back":
        return {
          title: "Capture Back of ID",
          subtitle: "Flip your ID and position the back within the frame",
        }
      case "complete":
        return {
          title: "Capture Complete",
          subtitle: "Both sides of your ID have been saved securely on your device",
        }
    }
  }, [currentStep])

  return {
    // state
    permission,
    requestPermission,
    cameraRef,
    currentStep,
    capturedImages,
    lightingCondition,
    isCapturing,
    pulseAnim,
    // derived
    instructions,
    // actions
    takePicture,
    retakePhoto,
    handleContinue,
    getLightingColor,
    getLightingText,
  }
}

export type UseAddCardCameraReturn = ReturnType<typeof useAddCardCamera>


