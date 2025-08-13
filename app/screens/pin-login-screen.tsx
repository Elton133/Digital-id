"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useState } from "react"
import { Alert, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native"

const PinLoginScreen: React.FC = () => {
  const [pin, setPin] = useState("")
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 3

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      const newPin = pin + number
      setPin(newPin)

      // Auto-verify when PIN is complete
      if (newPin.length === 6) {
        verifyPin(newPin)
      }
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const verifyPin = async (enteredPin: string) => {
    // Simulate PIN verification
    await new Promise((resolve) => setTimeout(resolve, 500))

    // For demo purposes, let's say the correct PIN is "123456"
    if (enteredPin === "123456") {
      router.push("/screens/main-screen-with-modal")
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setPin("")

      if (newAttempts >= maxAttempts) {
        Alert.alert(
          "Too Many Attempts",
          "You've exceeded the maximum number of attempts. Please sign in with your email and password.",
          [
            {
              text: "Sign In",
              onPress: () => router.push("/screens/auth/login-screen"),
            },
          ],
        )
      } else {
        Alert.alert("Incorrect PIN", `Wrong PIN. ${maxAttempts - newAttempts} attempts remaining.`, [
          { text: "Try Again" },
        ])
      }
    }
  }

  const renderPinDots = () => {
    return (
      <View className="flex-row justify-center space-x-4 mb-12 gap-2">
        {[...Array(6)].map((_, index) => (
          <View key={index} className={`w-8 h-8 rounded-full ${index < pin.length ? "bg-[#003554]" : "bg-gray-200"}`} />
        ))}
      </View>
    )
  }

  const keypadNumbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "delete"],
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4 mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/screens/biometric-login-screen")}>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-[#003554] text-base">
              Use Biometric
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="items-center mb-12">
          <View className="w-16 h-16 bg-[#003554] rounded-2xl items-center justify-center shadow-lg mb-6">
            <Ionicons name="keypad-outline" size={24} color="white" />
          </View>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-bold text-gray-800 mb-3">
            Enter PIN
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base text-center">
            Enter your 6-digit PIN to access Digital ID
          </Text>
          {attempts > 0 && (
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-red-500 text-sm mt-2">
              {maxAttempts - attempts} attempts remaining
            </Text>
          )}
        </View>

        {/* PIN Dots */}
        {renderPinDots()}

        {/* Keypad */}
        <View className="flex-1 justify-center">
          {keypadNumbers.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-center space-x-8 mb-6 gap-5">
              {row.map((number, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  onPress={() => {
                    if (number === "delete") {
                      handleDelete()
                    } else if (number !== "") {
                      handleNumberPress(number)
                    }
                  }}
                  className={`w-16 h-16 rounded-full items-center justify-center ${number === "" ? "" : "bg-gray-100"}`}
                  disabled={number === ""}
                >
                  {number === "delete" ? (
                    <Ionicons name="backspace-outline" size={24} color="#6b7280" />
                  ) : number !== "" ? (
                    <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-semibold text-gray-800">
                      {number}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Alternative Options */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={() => router.push("/screens/auth/login-screen")}>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
              Sign in with email instead
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PinLoginScreen
