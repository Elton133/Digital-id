"use client"
import type React from "react"
import { View, Text, TouchableOpacity, StatusBar, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CameraView } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"
import { useAddCardCamera } from "@/lib/addCard/useAddCardCamera"
import { addCardStyles as styles } from "@/lib/addCard/styles"

const AddCardCamera: React.FC = () => {
  const {
    permission,
    requestPermission,
    cameraRef,
    currentStep,
    capturedImages,
    lightingCondition,
    isCapturing,
    pulseAnim,
    instructions,
    takePicture,
    retakePhoto,
    handleContinue,
    getLightingColor,
    getLightingText,
  } = useAddCardCamera()

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleContinue}>
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

export default AddCardCamera

 










