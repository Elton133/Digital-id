"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useState } from "react"
import { Alert, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native"

const BiometricSetupScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<"faceId" | "fingerprint" | "pin" | null>(null)

  const biometricOptions = [
    {
      id: "faceId",
      title: "Face ID",
      description: "Use your face to unlock Digital ID",
      icon: "scan-outline",
      available: true,
    },
    {
      id: "fingerprint",
      title: "Fingerprint",
      description: "Use your fingerprint to unlock Digital ID",
      icon: "finger-print-outline",
      available: true,
    },
    {
      id: "pin",
      title: "PIN Code",
      description: "Create a 6-digit PIN to unlock Digital ID",
      icon: "keypad-outline",
      available: true,
    },
  ]

  const handleSetupBiometric = async () => {
    if (!selectedMethod) {
      Alert.alert("Please select an authentication method")
      return
    }

    try {
      // Simulate biometric setup
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (selectedMethod === "pin") {
        router.push("/screens/pin-setup-screen")
      } else {
        // Simulate biometric authentication setup
        Alert.alert(
          "Setup Complete",
          `${selectedMethod === "faceId" ? "Face ID" : "Fingerprint"} has been set up successfully!`,
          [
            {
              text: "Continue",
              onPress: () => router.push("/screens/main-screen-with-modal"),
            },
          ]
        )
      }
    } catch (error) {
      Alert.alert("Setup Failed", "Please try again or choose a different method")
    }
  }

  const handleSkip = () => {
    Alert.alert(
      "Skip Biometric Setup?",
      "You can always set this up later in Settings. Your account will be less secure without biometric authentication.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", onPress: () => router.push("/screens/main-screen-with-modal") },
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
            Choose how you'd like to protect your notes and keep them secure.
          </Text>
        </View>

        {/* Biometric Options */}
        <View className="space-y-4 mb-12 gap-3">
          {biometricOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedMethod(option.id as any)}
              className={`border-2 rounded-2xl p-4 ${
                selectedMethod === option.id ? "border-[#003554] bg-white" : "border-gray-200 bg-white"
              }`}
            >
              <View className="flex-row items-center">
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                    selectedMethod === option.id ? "bg-[#003554]" : "bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color={selectedMethod === option.id ? "white" : "#6b7280"}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "Gilroy-SemiBold" }}
                    className={`text-base font-semibold mb-1 ${
                      selectedMethod === option.id ? "text-[#003554]" : "text-gray-800"
                    }`}
                  >
                    {option.title}
                  </Text>
                  <Text
                    style={{ fontFamily: "Gilroy-Regular" }}
                    className={`text-sm ${selectedMethod === option.id ? "text-[#003554]" : "text-gray-500"}`}
                  >
                    {option.description}
                  </Text>
                </View>
                {selectedMethod === option.id && (
                  <View className="w-6 h-6 bg-[#003554] rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
