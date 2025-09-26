// "use client"
// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Animated,
//   Alert,
// } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { CameraView, CameraType, FlashMode, useCameraPermissions } from "expo-camera"
// import { Ionicons } from "@expo/vector-icons"
// import { useRouter } from "expo-router"

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// interface CapturedImage {
//   uri: string
//   side: "front" | "back"
// }

// type CaptureStep = "front" | "back" | "complete"
// type LightingCondition = "good" | "poor" | "checking"

// const AddCardCamera: React.FC = () => {
//   const router = useRouter()
//   const [permission, requestPermission] = useCameraPermissions()
//   const cameraRef = useRef<CameraView | null>(null)
//   const [currentStep, setCurrentStep] = useState<CaptureStep>("front")
//   const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
//   const [lightingCondition, setLightingCondition] = useState<LightingCondition>("checking")
//   const [isCapturing, setIsCapturing] = useState(false)

//   // Animation values
//   const pulseAnim = useRef(new Animated.Value(1)).current
//   const overlayOpacity = useRef(new Animated.Value(0.8)).current

//   useEffect(() => {
//     startPulseAnimation()
//     simulateLightingDetection()
//   }, [])

//   const startPulseAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start()
//   }

//   const simulateLightingDetection = () => {
//     // Simulate lighting condition detection
//     const interval = setInterval(() => {
//       const conditions: LightingCondition[] = ["good", "poor", "good", "good"]
//       const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
//       setLightingCondition(randomCondition)
//     }, 2000)

//     return () => clearInterval(interval)
//   }

//   const takePicture = async () => {
//     if (cameraRef.current && !isCapturing) {
//       setIsCapturing(true)
//       try {
//         const photo = await cameraRef.current.takePictureAsync({
//           quality: 0.8,
//           base64: false,
//         })

//         if (photo) {
//           const newImage: CapturedImage = {
//             uri: photo.uri,
//             side: currentStep as "front" | "back",
//           }

//           setCapturedImages((prev) => [...prev, newImage])

//           if (currentStep === "front") {
//             setCurrentStep("back")
//           } else {
//             setCurrentStep("complete")
//             Alert.alert("Success!", "Both sides of your ID have been captured successfully.")
//           }
//         }
//       } catch (error) {
//         Alert.alert("Error", "Failed to capture image. Please try again.")
//       } finally {
//         setIsCapturing(false)
//       }
//     }
//   }

//   const retakePhoto = () => {
//     if (currentStep === "back") {
//       setCurrentStep("front")
//       setCapturedImages([])
//     } else if (currentStep === "complete") {
//       setCurrentStep("front")
//       setCapturedImages([])
//     }
//   }

//   const getLightingColor = () => {
//     switch (lightingCondition) {
//       case "good":
//         return "#22c55e"
//       case "poor":
//         return "#ef4444"
//       default:
//         return "#f59e0b"
//     }
//   }

//   const getLightingText = () => {
//     switch (lightingCondition) {
//       case "good":
//         return "Good lighting detected"
//       case "poor":
//         return "Poor lighting - move to better light"
//       default:
//         return "Checking lighting..."
//     }
//   }

//   const getStepInstructions = () => {
//     switch (currentStep) {
//       case "front":
//         return {
//           title: "Capture Front of ID",
//           subtitle: "Position your ID within the frame and ensure all text is clearly visible",
//         }
//       case "back":
//         return {
//           title: "Capture Back of ID",
//           subtitle: "Flip your ID and position the back within the frame",
//         }
//       case "complete":
//         return {
//           title: "Capture Complete",
//           subtitle: "Both sides of your ID have been successfully captured",
//         }
//     }
//   }

//   if (!permission) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centerContent}>
//           <Text style={styles.permissionText}>Requesting camera permission...</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   if (!permission.granted) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centerContent}>
//           <Ionicons name="camera-outline" size={64} color="#6b7280" />
//           <Text style={styles.permissionText}>Camera access is required</Text>
//           <Text style={styles.permissionSubtext}>
//             Please enable camera permissions in your device settings to continue
//           </Text>
//           <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
//             <Text style={styles.retryButtonText}>Grant Permission</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   const instructions = getStepInstructions()

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#000000" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={()=> router.push("/screens/folder-details")}>
//           <Ionicons name="arrow-back" size={24} color="#ffffff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add ID Card</Text>
//         <View style={styles.stepIndicator}>
//           <Text style={styles.stepText}>
//             {currentStep === "complete" ? "2/2" : currentStep === "front" ? "1/2" : "2/2"}
//           </Text>
//         </View>
//       </View>

//       {/* Camera View */}
//       <View style={styles.cameraContainer}>
//         <CameraView 
//           style={styles.camera} 
//           facing="back" 
//           flash="auto" 
//           ref={cameraRef}
//         >
//           {/* Card Overlay */}
//           <View style={styles.overlay}>
//             <View style={styles.cardFrame}>
//               <Animated.View
//                 style={[
//                   styles.cardOutline,
//                   {
//                     transform: [{ scale: pulseAnim }],
//                     borderColor: lightingCondition === "good" ? "#22c55e" : "#ffffff",
//                   },
//                 ]}
//               />

//               {/* Corner guides */}
//               <View style={[styles.corner, styles.topLeft]} />
//               <View style={[styles.corner, styles.topRight]} />
//               <View style={[styles.corner, styles.bottomLeft]} />
//               <View style={[styles.corner, styles.bottomRight]} />
//             </View>
//           </View>
//         </CameraView>
//       </View>

//       {/* Instructions Panel */}
//       <View style={styles.instructionsPanel}>
//         <View style={styles.lightingIndicator}>
//           <View style={[styles.lightingDot, { backgroundColor: getLightingColor() }]} />
//           <Text style={[styles.lightingText, { color: getLightingColor() }]}>{getLightingText()}</Text>
//         </View>

//         <Text style={styles.instructionTitle}>{instructions.title}</Text>
//         <Text style={styles.instructionSubtitle}>{instructions.subtitle}</Text>

//         {/* Tips */}
//         <View style={styles.tipsContainer}>
//           <View style={styles.tip}>
//             <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
//             <Text style={styles.tipText}>Ensure all text is clearly visible</Text>
//           </View>
//           <View style={styles.tip}>
//             <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
//             <Text style={styles.tipText}>Avoid shadows and glare</Text>
//           </View>
//           <View style={styles.tip}>
//             <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
//             <Text style={styles.tipText}>Keep the card flat and straight</Text>
//           </View>
//         </View>
//       </View>

//       {/* Bottom Controls */}
//       <View style={styles.bottomControls}>
//         {currentStep !== "complete" && (
//           <>
//             <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto} disabled={capturedImages.length === 0}>
//               <Ionicons name="refresh" size={24} color={capturedImages.length === 0 ? "#6b7280" : "#ffffff"} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.captureButton,
//                 {
//                   backgroundColor: lightingCondition === "good" ? "#22c55e" : "#6b7280",
//                   opacity: isCapturing ? 0.7 : 1,
//                 },
//               ]}
//               onPress={takePicture}
//               disabled={isCapturing || lightingCondition === "poor"}
//             >
//               <Ionicons name="camera" size={32} color="#ffffff" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.flashButton}>
//               <Ionicons name="flash" size={24} color="#ffffff" />
//             </TouchableOpacity>
//           </>
//         )}

//         {currentStep === "complete" && (
//           <View style={styles.completeControls}>
//             <TouchableOpacity style={styles.retakeAllButton} onPress={retakePhoto}>
//               <Text style={styles.retakeAllText}>Retake Photos</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.continueText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 4)",
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   permissionText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#ffffff",
//     textAlign: "center",
//     marginTop: 20,
//     fontFamily: "Gilroy-SemiBold",
//   },
//   permissionSubtext: {
//     fontSize: 14,
//     color: "#9ca3af",
//     textAlign: "center",
//     marginTop: 10,
//     lineHeight: 20,
//     fontFamily: "Gilroy-Regular",
//   },
//   retryButton: {
//     backgroundColor: "#3b82f6",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   retryButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Gilroy-SemiBold",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: "#000000",
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#ffffff",
//     fontFamily: "Gilroy-SemiBold",
//   },
//   stepIndicator: {
//     backgroundColor: "#374151",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   stepText: {
//     color: "#ffffff",
//     fontSize: 12,
//     fontWeight: "600",
//     fontFamily: "Gilroy-SemiBold",
//   },
//   cameraContainer: {
//     flex: 1,
//     margin: 20,
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   camera: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   cardFrame: {
//     width: screenWidth * 0.8,
//     height: screenWidth * 0.5,
//     position: "relative",
//   },
//   cardOutline: {
//     flex: 1,
//     borderWidth: 3,
//     borderRadius: 12,
//     borderColor: "#ffffff",
//     backgroundColor: "transparent",
//   },
//   corner: {
//     position: "absolute",
//     width: 20,
//     height: 20,
//     borderColor: "#ffffff",
//     borderWidth: 3,
//   },
//   topLeft: {
//     top: -3,
//     left: -3,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     borderTopLeftRadius: 12,
//   },
//   topRight: {
//     top: -3,
//     right: -3,
//     borderLeftWidth: 0,
//     borderBottomWidth: 0,
//     borderTopRightRadius: 12,
//   },
//   bottomLeft: {
//     bottom: -3,
//     left: -3,
//     borderRightWidth: 0,
//     borderTopWidth: 0,
//     borderBottomLeftRadius: 12,
//   },
//   bottomRight: {
//     bottom: -3,
//     right: -3,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderBottomRightRadius: 12,
//   },
//   instructionsPanel: {
//     backgroundColor: "#111827",
//     padding: 20,
//     marginHorizontal: 20,
//     borderRadius: 16,
//     marginBottom: 20,
//   },
//   lightingIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   lightingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   lightingText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#ffffff",
//     fontFamily: "Gilroy-SemiBold",
//   },
//   instructionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#ffffff",
//     marginBottom: 8,
//     fontFamily: "Gilroy-SemiBold",
//   },
//   instructionSubtitle: {
//     fontSize: 14,
//     color: "#9ca3af",
//     lineHeight: 20,
//     marginBottom: 16,
//     fontFamily: "Gilroy-Regular",
//   },
//   tipsContainer: {
//     gap: 8,
//   },
//   tip: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   tipText: {
//     fontSize: 14,
//     color: "#d1d5db",
//     marginLeft: 8,
//     fontFamily: "Gilroy-Regular",
//   },
//   bottomControls: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   retakeButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#374151",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   captureButton: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   flashButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#374151",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   completeControls: {
//     flexDirection: "row",
//     width: "100%",
//     gap: 12,
//   },
//   retakeAllButton: {
//     flex: 1,
//     backgroundColor: "#374151",
//     paddingVertical: 16,
//     borderRadius: 24,
//     alignItems: "center",
//   },
//   retakeAllText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Gilroy-SemiBold",
//   },
//   continueButton: {
//     flex: 1,
//     backgroundColor: "#22c55e",
//     paddingVertical: 16,
//     borderRadius: 24,
//     alignItems: "center",
//   },
//   continueText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Gilroy-SemiBold",
//   },
// })

// export default AddCardCamera





"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CameraView, useCameraPermissions } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as FileSystem from 'expo-file-system/legacy'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoredCardImages, deleteAllStoredCards } from "@/lib/imageUtils"



const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

interface CapturedImage {
  uri: string
  localPath: string
  side: "front" | "back"
  timestamp: number
}

type CaptureStep = "front" | "back" | "complete"
type LightingCondition = "good" | "poor" | "checking"

const AddCardCamera: React.FC = () => {
  const router = useRouter()
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)
  const [currentStep, setCurrentStep] = useState<CaptureStep>("front")
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [lightingCondition, setLightingCondition] = useState<LightingCondition>("checking")
  const [isCapturing, setIsCapturing] = useState(false)

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current
  const overlayOpacity = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    startPulseAnimation()
    simulateLightingDetection()
  }, [])

  // const saveImageLocally = async (imageUri: string, side: "front" | "back"): Promise<string> => {
  //   try {
  //     // Create a unique filename with timestamp
  //     const timestamp = Date.now()
  //     const filename = `ghana_card_${side}_${timestamp}.jpg`
  //     const localPath = `${FileSystem.documentDirectory}${filename}`
      
  //     // Copy the image from camera cache to permanent storage
  //     await FileSystem.copyAsync({
  //       from: imageUri,
  //       to: localPath,
  //     })
      
  //     console.log(`Image saved locally: ${localPath}`)
  //     return localPath
  //   } catch (error) {
  //     console.error('Error saving image locally:', error)
  //     throw new Error('Failed to save image locally')
  //   }
  // }

  const saveImageLocally = async (imageUri: string, side: "front" | "back"): Promise<string> => {
  console.log(`Saving ${side} image:`, imageUri)
  return imageUri // Just return the camera URI directly
}

// saves as a single object
  // const saveImagePaths = async (frontPath: string, backPath: string) => {
  //   try {
  //     const imageData = {
  //       front: frontPath,
  //       back: backPath,
  //       timestamp: Date.now(),
  //     }
      
  //     // Save to AsyncStorage for app-wide access
  //     await AsyncStorage.setItem('ghana_card_images', JSON.stringify(imageData))
  //     console.log('Image paths saved to AsyncStorage successfully')
  //   } catch (error) {
  //     console.error('Error saving image paths:', error)
  //   }
  // }

  // saving as an array
const saveImagePaths = async (frontPath: string, backPath: string) => {
  try {
    const newCard: StoredCardImages = {
      front: frontPath,
      back: backPath,
      timestamp: Date.now(),
    }

    const storedData = await AsyncStorage.getItem('ghana_card_images')

    // Ensure cards is always an array
    let cards: StoredCardImages[] = []
    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (Array.isArray(parsed)) {
        cards = parsed
      } else if (parsed && typeof parsed === 'object') {
        cards = [parsed] // wrap the old object in an array
      }
    }

    cards.push(newCard)
    await AsyncStorage.setItem('ghana_card_images', JSON.stringify(cards))

    console.log('Image paths saved to AsyncStorage successfully')
  } catch (error) {
    console.error('Error saving image paths:', error)
  }
}



  const startPulseAnimation = () => {
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
  }

  const simulateLightingDetection = () => {
    // Simulate lighting condition detection
    const interval = setInterval(() => {
      const conditions: LightingCondition[] = ["good", "poor", "good", "good"]
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
      setLightingCondition(randomCondition)
    }, 2000)

    return () => clearInterval(interval)
  }

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true)
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        })

        if (photo) {
          // Save image locally first
          const localPath = await saveImageLocally(photo.uri, currentStep as "front" | "back")
          
          const newImage: CapturedImage = {
            uri: photo.uri,
            localPath: localPath,
            side: currentStep as "front" | "back",
            timestamp: Date.now(),
          }

          setCapturedImages((prev) => {
            const updated = [...prev, newImage]
            
            // If we have both images, save their paths
            if (updated.length === 2) {
              const frontImage = updated.find(img => img.side === "front")
              const backImage = updated.find(img => img.side === "back")
              
              if (frontImage && backImage) {
                saveImagePaths(frontImage.localPath, backImage.localPath)
              }
            }
            
            return updated
          })

          if (currentStep === "front") {
            setCurrentStep("back")
          } else {
            setCurrentStep("complete")
            Alert.alert("Success!", "Both sides of your ID have been captured and saved securely on your device.", [
              {
                text: "OK",
                onPress: () => console.log("Images stored locally")
              }
            ])
          }
        }
      } catch (error) {
        console.error('Camera error:', error)
        Alert.alert("Error", "Failed to capture and save image. Please try again.")
      } finally {
        setIsCapturing(false)
      }
    }
  }

  const deleteStoredImages = async (images: CapturedImage[]) => {
    try {
      // Delete physical files
      for (const image of images) {
        const fileExists = await FileSystem.getInfoAsync(image.localPath)
        if (fileExists.exists) {
          await FileSystem.deleteAsync(image.localPath)
          console.log(`Deleted image: ${image.localPath}`)
        }
      }
      
      // Clear from AsyncStorage
      await AsyncStorage.removeItem('ghana_card_images')
      console.log('Cleared image paths from AsyncStorage')
    } catch (error) {
      console.error('Error deleting stored images:', error)
    }
  }

  const retakePhoto = async () => {
    if (currentStep === "back") {
      // Delete the front image if retaking
      if (capturedImages.length > 0) {
        await deleteStoredImages([capturedImages[0]])
      }
      setCurrentStep("front")
      setCapturedImages([])
    } else if (currentStep === "complete") {
      // Delete both images if retaking all
      await deleteStoredImages(capturedImages)
      setCurrentStep("front")
      setCapturedImages([])
    }
  }

  const handleContinue = () => {
    // Navigate to the next screen after successful capture
    router.push("/screens/folder-details")
  }

  const getLightingColor = () => {
    switch (lightingCondition) {
      case "good":
        return "#22c55e"
      case "poor":
        return "#ef4444"
      default:
        return "#f59e0b"
    }
  }

  const getLightingText = () => {
    switch (lightingCondition) {
      case "good":
        return "Good lighting detected"
      case "poor":
        return "Poor lighting - move to better light"
      default:
        return "Checking lighting..."
    }
  }

  const getStepInstructions = () => {
    switch (currentStep) {
      case "front":
        return {
          title: "Capture Front of ID",
          subtitle: "Position your ID within the frame and ensure all text is clearly visible",
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
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="camera-outline" size={64} color="#6b7280" />
          <Text style={styles.permissionText}>Camera access is required</Text>
          <Text style={styles.permissionSubtext}>
            Please enable camera permissions in your device settings to continue
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
            <Text style={styles.retryButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const instructions = getStepInstructions()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> router.push("/screens/folder-details")}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add ID Card</Text>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>
            {currentStep === "complete" ? "2/2" : currentStep === "front" ? "1/2" : "2/2"}
          </Text>
        </View>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView 
          style={styles.camera} 
          facing="back" 
          flash="auto" 
          ref={cameraRef}
        >
          {/* Card Overlay */}
          <View style={styles.overlay}>
            <View style={styles.cardFrame}>
              <Animated.View
                style={[
                  styles.cardOutline,
                  {
                    transform: [{ scale: pulseAnim }],
                    borderColor: lightingCondition === "good" ? "#22c55e" : "#ffffff",
                  },
                ]}
              />

              {/* Corner guides */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </CameraView>
      </View>

      {/* Instructions Panel */}
      <View style={styles.instructionsPanel}>
        <View style={styles.lightingIndicator}>
          <View style={[styles.lightingDot, { backgroundColor: getLightingColor() }]} />
          <Text style={[styles.lightingText, { color: getLightingColor() }]}>{getLightingText()}</Text>
        </View>

        <Text style={styles.instructionTitle}>{instructions.title}</Text>
        <Text style={styles.instructionSubtitle}>{instructions.subtitle}</Text>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <View style={styles.tip}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.tipText}>Ensure all text is clearly visible</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.tipText}>Avoid shadows and glare</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.tipText}>Keep the card flat and straight</Text>
          </View>
          {currentStep === "complete" && (
            <View style={styles.tip}>
              <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
              <Text style={styles.tipText}>Images stored securely on your device</Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {currentStep !== "complete" && (
          <>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto} disabled={capturedImages.length === 0}>
              <Ionicons name="refresh" size={24} color={capturedImages.length === 0 ? "#6b7280" : "#ffffff"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.captureButton,
                {
                  backgroundColor: lightingCondition === "good" ? "#22c55e" : "#6b7280",
                  opacity: isCapturing ? 0.7 : 1,
                },
              ]}
              onPress={takePicture}
              disabled={isCapturing || lightingCondition === "poor"}
            >
              <Ionicons name="camera" size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flashButton}>
              <Ionicons name="flash" size={24} color="#ffffff" />
            </TouchableOpacity>
          </>
        )}

        {currentStep === "complete" && (
          <View style={styles.completeControls}>
            <TouchableOpacity style={styles.retakeAllButton} onPress={retakePhoto}>
              <Text style={styles.retakeAllText}>Retake Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  permissionSubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#000000",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  stepIndicator: {
    backgroundColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stepText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cardFrame: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.5,
    position: "relative",
  },
  cardOutline: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: -3,
    right: -3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  instructionsPanel: {
    backgroundColor: "#111827",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  lightingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  lightingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  lightingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  instructionSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
    marginBottom: 16,
  },
  tipsContainer: {
    gap: 8,
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    fontSize: 14,
    color: "#d1d5db",
    marginLeft: 8,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  retakeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  completeControls: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  retakeAllButton: {
    flex: 1,
    backgroundColor: "#374151",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  retakeAllText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default AddCardCamera