"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useEffect, useState } from "react"
import { Alert, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BiometricLoginScreen: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<"faceId" | "fingerprint" | "pin">("faceId")
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    // Auto-trigger biometric authentication on screen load
    handleBiometricAuth()
  }, [])

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true)
    try {
      // Simulate biometric authentication
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success/failure
      const success = Math.random() > 0.3 // 70% success rate for demo

      if (success) {
        router.push("/screens/main")
      } else {
        Alert.alert(
          "Authentication Failed",
          `${authMethod === "faceId" ? "Face ID" : "Fingerprint"} authentication failed. Please try again.`,
          [
            { text: "Try Again", onPress: handleBiometricAuth },
            { text: "Use PIN", onPress: () => router.push("/screens/pin-login-screen") },
          ]
        )
      }
    } catch (error) {
      Alert.alert("Error", "Authentication failed. Please try again.")
    } finally {
      setIsAuthenticating(false)
    }
  }

  const getAuthIcon = () => {
    switch (authMethod) {
      case "faceId":
        return "scan-outline"
      case "fingerprint":
        return "finger-print-outline"
      default:
        return "keypad-outline"
    }
  }

  const getAuthTitle = () => {
    switch (authMethod) {
      case "faceId":
        return "Face ID"
      case "fingerprint":
        return "Fingerprint"
      default:
        return "PIN"
    }
  }

  const getAuthDescription = () => {
    switch (authMethod) {
      case "faceId":
        return "Look at your device to unlock Digital ID"
      case "fingerprint":
        return "Place your finger on the sensor to unlock Digital ID"
      default:
        return "Enter your PIN to unlock Digital ID"
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 items-center justify-center px-6">

        {/* Auth Icon */}
        <View className="items-center mb-12">
          <View
            className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${
              isAuthenticating ? "bg-[#003554]" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name={getAuthIcon() as any}
              size={40}
              color={isAuthenticating ? "#ec4899" : "#6b7280"}
            />
          </View>

          <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-xl font-bold text-gray-800 mb-2">
            {isAuthenticating ? `Authenticating with ${getAuthTitle()}` : `Use ${getAuthTitle()}`}
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base text-center">
            {getAuthDescription()}
          </Text>
        </View>

        {/* Loading Indicator */}
        {isAuthenticating && (
          <View className="mb-12">
            <View className="w-8 h-8 border-2 border-[#003554] border-t-transparent rounded-full animate-spin" />
          </View>
        )}

        {/* Action Buttons */}
        <View className="w-full space-y-4">
          {!isAuthenticating && (
            <TouchableOpacity
              onPress={handleBiometricAuth}
              className="bg-[#003554] rounded-2xl py-4 items-center"
            >
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold">
                Try Again
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push("/screens/pin-login-screen")}
            className="border border-gray-300 rounded-2xl py-4 items-center"
          >
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-base font-semibold">
              Use PIN Instead
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/screens/auth/login-screen")}
            className="items-center py-4"
          >
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
              Sign in with different account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BiometricLoginScreen
