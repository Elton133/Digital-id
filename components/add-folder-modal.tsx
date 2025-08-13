"use client"

import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useState } from "react"
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

interface AddFolderModalProps {
  visible: boolean
  onClose: () => void
  onCreateFolder: (name: string, color: string, icon: string) => void
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({ visible, onClose, onCreateFolder }) => {
  const [folderName, setFolderName] = useState("")
  const [selectedColor, setSelectedColor] = useState("from-blue-400 to-purple-500")
  const [selectedIcon, setSelectedIcon] = useState("document-text")

  const colors = [
    "bg-blue-400",
    "bg-green-400",
    "bg-pink-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-indigo-400",
  ]

  const icons = ["document-text", "briefcase", "heart", "star", "bookmark", "folder", "camera", "musical-notes"]

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName.trim(), selectedColor, selectedIcon)
      setFolderName("")
      onClose()
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
              {/* Header */}
              <View className="items-center mb-6">
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
                  Create New Folder
                </Text>
              </View>

              {/* Preview */}
              <View className="items-center mb-6">
                <View
                  className={`w-16 h-16 bg-gradient-to-br ${selectedColor} rounded-2xl items-center justify-center mb-3`}
                >
                  <Ionicons name={selectedIcon as any} size={28} color="white" />
                </View>
                <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                  Preview
                </Text>
              </View>

              {/* Folder Name */}
              <View className="mb-6">
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-base font-semibold text-gray-800 mb-2">
                  Folder Name
                </Text>
                <TextInput
                  value={folderName}
                  onChangeText={setFolderName}
                  placeholder="Enter folder name"
                  style={{ fontFamily: "Gilroy-Regular" }}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-base"
                />
              </View>

              {/* Color Selection */}
              <View className="mb-6">
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-base font-semibold text-gray-800 mb-3">
                  Choose Color
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedColor(color)}
                      className={`w-10 h-10 ${color} rounded-lg mb-2 ${
                        selectedColor === color ? "ring-2 ring-gray-400" : ""
                      }`}
                    />
                  ))}
                </View>
              </View>

              {/* Icon Selection */}
              <View className="mb-6">
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-base font-semibold text-gray-800 mb-3">
                  Choose Icon
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {icons.map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedIcon(icon)}
                      className={`w-10 h-10 rounded-full items-center justify-center mb-2 ${
                        selectedIcon === icon ? "bg-gray-200" : "bg-gray-100"
                      }`}
                    >
                      <Ionicons name={icon as any} size={20} color="#6b7280" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row space-x-3 gap-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 border border-gray-300 rounded-full py-3 items-center"
                >
                  <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-base font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCreate} className="flex-1 bg-black rounded-full py-3 items-center">
                  <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold">
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default AddFolderModal
