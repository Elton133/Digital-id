"use client"

import BiometricOptions from "@/components/biometric-options"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useState, useEffect } from "react"
import { Alert, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'
import {
  checkBiometricCapabilities,
  saveBiometricPreference,
  authenticateWithBiometrics,
  setupSessionTimeout,
} from "@/lib/biometricAuth"

const BiometricSetupScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<"faceId" | "fingerprint" | "pin" | null>(null)
  const [availableMethods, setAvailableMethods] = useState<string[]>([])

  useEffect(() => {
    checkAvailability()
  }, [])

  const checkAvailability = async () => {
    const capabilities = await checkBiometricCapabilities()
    if (capabilities.isAvailable) {
      setAvailableMethods(capabilities.supportedTypes)
    } else {
      setAvailableMethods(['pin'])
    }
  }

  const handleSetupBiometric = async () => {
    if (!selectedMethod) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      Alert.alert("Please select an authentication method")
      return
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    try {
      if (selectedMethod === "pin") {
        router.push("/screens/pin-setup-screen")
      } else {
        // Test biometric authentication
        const result = await authenticateWithBiometrics(
          `Set up ${selectedMethod === "faceId" ? "Face ID" : "Fingerprint"} authentication`
        )

        if (result.success) {
          await saveBiometricPreference(selectedMethod)
          await setupSessionTimeout(5) // 5 minute session timeout
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          
          Alert.alert(
            "Setup Complete",
            `${selectedMethod === "faceId" ? "Face ID" : "Fingerprint"} has been set up successfully!`,
            [
              {
                text: "Continue",
                onPress: () => router.push("/screens/main"),
              },
            ]
          )
        } else {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          Alert.alert("Setup Failed", result.error || "Please try again or choose a different method")
        }
      }
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert("Setup Failed", "Please try again or choose a different method")
    }
  }

  const handleSetupMethodSelect = async (method: "faceId" | "fingerprint" | "pin") => {
    await Haptics.selectionAsync()
    setSelectedMethod(method)
  }

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Alert.alert(
      "Skip Biometric Setup?",
      "You can always set this up later in Settings. Your account will be less secure without biometric authentication.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", onPress: () => router.push("/screens/main") },
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4 mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="mb-12">
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-bold text-gray-800 mb-3">
            Secure Your Documents
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base leading-6">
            Choose how you&#39;d like to protect your notes and keep them secure.
          </Text>
        </View>

        {/* Biometric Options */}
        <BiometricOptions 
          selectedMethod={selectedMethod} 
          onBiometricOptionSelect={handleSetupMethodSelect}
          availableMethods={availableMethods}
        />

        {/* Setup Button */}
        <TouchableOpacity
          onPress={handleSetupBiometric}
          disabled={!selectedMethod}
          className={`rounded-2xl py-4 items-center mb-4 ${
            selectedMethod ? "bg-[#003554]" : "bg-gray-200"
          }`}
        >
          <Text
            style={{ fontFamily: "Gilroy-SemiBold" }}
            className={`text-base font-semibold ${selectedMethod ? "text-white" : "text-gray-400"}`}
          >
            Set Up Authentication
          </Text>
        </TouchableOpacity>

        {/* Security Note */}
        <View className="bg-blue-50 rounded-xl p-4">
          <View className="flex-row items-start">
            <Ionicons name="shield-checkmark" size={20} color="#3b82f6" />
            <View className="flex-1 ml-3">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-blue-800 text-sm font-semibold mb-1">
                Your Privacy Matters
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-blue-700 text-xs leading-4">
                Your biometric data is stored securely on your device and never shared with Digital ID or third parties.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BiometricSetupScreen
