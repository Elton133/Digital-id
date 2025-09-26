"use client"

import React, { useState } from "react"
  import type { ColorValue } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient";


interface AddFolderModalProps {
  visible: boolean
  onClose: () => void
    onCreateFolder: (name: string, color: [string, string], icon: string) => void
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({ visible, onClose, onCreateFolder }:any) => {
  const [folderName, setFolderName] = useState("")
  const [selectedColor, setSelectedColor] = useState<[ColorValue, ColorValue]>(["#60a5fa", "#a78bfa"]) // blue to purple
  const [selectedIcon, setSelectedIcon] = useState("document-text")


  const colors: [ColorValue, ColorValue][] = [
    ["#60a5fa", "#a78bfa"], // blue to purple
    ["#34d399", "#10b981"], // green
    ["#f472b6", "#ec4899"], // pink
    ["#facc15", "#f59e0b"], // yellow
    ["#a78bfa", "#6366f1"], // purple
    ["#818cf8", "#4f46e5"], // indigo
  ]

  const icons = ["document-text", "briefcase", "heart", "star", "bookmark", "folder", "camera", "musical-notes"]

const handleCreate = () => {
  if (folderName.trim()) {
    onCreateFolder(folderName.trim(), selectedColor as [string, string], selectedIcon)
    setFolderName("")
    onClose()
  }
}


  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 24,
                  padding: 24,
                  width: "100%",
                  maxWidth: 400,
                  ...Platform.select({
                    ios: {
                      shadowColor: "#000",
                      shadowOpacity: 0.15,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 4 },
                    },
                    android: {
                      elevation: 6,
                    },
                  }),
                }}
              >
                {/* Header */}
                <View style={{ alignItems: "center", marginBottom: 24 }}>
                  <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 20, color: "#1f2937" }}>
                    Create New Folder
                  </Text>
                </View>

                {/* Preview */}
                <View style={{ alignItems: "center", marginBottom: 24 }}>
                  <LinearGradient
                    colors={selectedColor}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name={selectedIcon as any} size={28} color="white" />
                  </LinearGradient>
                  <Text style={{ fontFamily: "Gilroy-Regular", color: "#6b7280", fontSize: 14 }}>Preview</Text>
                </View>

                {/* Folder Name */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 16, color: "#1f2937", marginBottom: 8 }}>
                    Folder Name
                  </Text>
                  <TextInput
                    value={folderName}
                    onChangeText={setFolderName}
                    placeholder="Enter folder name"
                    style={{
                      fontFamily: "Gilroy-Regular",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                    }}
                  />
                </View>

                {/* Color Selection */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 16, color: "#1f2937", marginBottom: 12 }}>
                    Choose Color
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {colors.map((colorSet, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedColor(colorSet)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          marginBottom: 8,
                          borderWidth: selectedColor === colorSet ? 2 : 0,
                          borderColor: "#9ca3af",
                          overflow: "hidden",
                        }}
                      >
                        <LinearGradient colors={colorSet} style={{ flex: 1 }} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Icon Selection */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 16, color: "#1f2937", marginBottom: 12 }}>
                    Choose Icon
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {icons.map((icon, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedIcon(icon)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 8,
                          backgroundColor: selectedIcon === icon ? "#e5e7eb" : "#f3f4f6",
                        }}
                      >
                        <Ionicons name={icon as any} size={20} color="#6b7280" />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 999,
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 16, color: "#374151" }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleCreate}
                    style={{
                      flex: 1,
                      backgroundColor: "black",
                      borderRadius: 999,
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 16, color: "white" }}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default AddFolderModal
