"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useState } from "react"
import { Alert, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const PinSetupScreen: React.FC = () => {
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [step, setStep] = useState<"create" | "confirm">("create")

  const handleNumberPress = (number: string) => {
    if (step === "create") {
      if (pin.length < 6) {
        setPin(pin + number)
      }
    } else {
      if (confirmPin.length < 6) {
        setConfirmPin(confirmPin + number)
      }
    }
  }

  const handleDelete = () => {
    if (step === "create") {
      setPin(pin.slice(0, -1))
    } else {
      setConfirmPin(confirmPin.slice(0, -1))
    }
  }

  const handleContinue = () => {
    if (step === "create" && pin.length === 6) {
      setStep("confirm")
    } else if (step === "confirm" && confirmPin.length === 6) {
      if (pin === confirmPin) {
        Alert.alert("PIN Created", "Your PIN has been set up successfully!", [
          {
            text: "Continue",
            onPress: () => router.push("/screens/main"),
          },
        ])
      } else {
        Alert.alert("PIN Mismatch", "PINs do not match. Please try again.", [
          {
            text: "OK",
            onPress: () => {
              setConfirmPin("")
              setStep("create")
              setPin("")
            },
          },
        ])
      }
    }
  }

  const renderPinDots = (currentPin: string) => {
    return (
      <View className="flex-row justify-center space-x-4 mb-12 gap-2">
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            className={`w-8 h-8 rounded-full ${index < currentPin.length ? "bg-[#003554]" : "bg-gray-200"}`}
          />
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
        <View className="flex-row items-center py-4 mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="items-center mb-12">
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-bold text-gray-800 mb-3">
            {step === "create" ? "Create PIN" : "Confirm PIN"}
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-md text-center">
            {step === "create" ? "Create a 6-digit PIN to secure your notes" : "Enter your PIN again to confirm"}
          </Text>
        </View>

        {/* PIN Dots */}
        {renderPinDots(step === "create" ? pin : confirmPin)}

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

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          disabled={(step === "create" ? pin.length : confirmPin.length) !== 6}
          className={`rounded-full py-4 items-center mb-8 ${
            (step === "create" ? pin.length : confirmPin.length) === 6
              ? "bg-[#003554]"
              : "bg-gray-200"
          }`}
        >
          <Text
            style={{ fontFamily: "Gilroy-SemiBold" }}
            className={`text-base font-semibold ${
              (step === "create" ? pin.length : confirmPin.length) === 6 ? "text-white" : "text-gray-400"
            }`}
          >
            {step === "create" ? "Continue" : "Confirm PIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PinSetupScreen
