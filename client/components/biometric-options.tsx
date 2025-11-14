import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface BiometricOptionsProps {
  selectedMethod: "faceId" | "fingerprint" | "pin" | null
  onBiometricOptionSelect: (method: "faceId" | "fingerprint" | "pin") => void
  availableMethods?: string[]
}

const BiometricOptions = ({selectedMethod, onBiometricOptionSelect, availableMethods = ['faceId', 'fingerprint', 'pin']}: BiometricOptionsProps) => {

      const biometricOptions = [
        {
          id: "faceId",
          title: "Face ID",
          description: "Use your face to unlock Digital ID",
          icon: "scan-outline",
          available: availableMethods.includes('faceId'),
        },
        {
          id: "fingerprint",
          title: "Fingerprint",
          description: "Use your fingerprint to unlock Digital ID",
          icon: "finger-print-outline",
          available: availableMethods.includes('fingerprint'),
        },
        {
          id: "pin",
          title: "PIN Code",
          description: "Create a 6-digit PIN to unlock Digital ID",
          icon: "keypad-outline",
          available: availableMethods.includes('pin'),
        },
      ]

  return (
    <View className="space-y-4 mb-12 gap-3">
          {biometricOptions.filter(option => option.available).map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => onBiometricOptionSelect(option.id as "faceId" | "fingerprint" | "pin")}
              disabled={!option.available}
              className={`border-2 rounded-2xl p-4 ${
                selectedMethod === option.id ? "border-[#003554] bg-white" : "border-gray-200 bg-white"
              } ${!option.available ? "opacity-50" : ""}`}
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
  )
}

export default BiometricOptions

// const styles = StyleSheet.create({})