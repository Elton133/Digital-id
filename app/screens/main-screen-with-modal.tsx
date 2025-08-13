"use client"

import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import AddFolderModal from "@/components/add-folder-modal"
import GhanaCard3D from "@/components/card-component"
import { images } from "@/constants/images"
import ActionButtons from "@/components/action-buttons"

interface Folder {
  id: string
  name: string
  noteCount: number
  color: string
  icon: string
}

const MainScreenWithModal: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "1",
      name: "Government ID's",
      noteCount: 0,
      color: "bg-gray-400",
      icon: "document-text",
    },
    {
      id: "2",
      name: "Documents",
      noteCount: 0,
      color: "bg-gray-400",
      icon: "document-text",
    },
  ])

  const [addFolderVisible, setAddFolderVisible] = useState(false)

  const handleAddFolder = () => {
    setAddFolderVisible(true)
  }

  const handleCreateFolder = (name: string, color: string, icon: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      noteCount: 0,
      color,
      icon,
    }
    setFolders([...folders, newFolder])
  }

  const handleQuickNote = () => {
    console.log("Quick note")
  }

  const handleFolderPress = (folderId: string) => {
    console.log("Open folder:", folderId)
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-[#003554] rounded-tr-lg rounded-br-2xl rounded-bl-lg rounded-tl-md items-center justify-center mr-3">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-xl font-bold">
              E
            </Text>
            <View className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
          </View>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
            Digital ID
          </Text>
        </View>

        <View className="flex-row items-center space-x-8 gap-2">
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="book-outline" size={20} color="#003554" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="options-outline" size={20} color="#003554" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="folder-outline" size={20} color="#003554" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-4">
        {folders.map((folder) => (
          <TouchableOpacity
            key={folder.id}
            onPress={() => handleFolderPress(folder.id)}
            className="flex-row items-center bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)] "
          >
            <View
              className={`w-14 h-14 bg-gradient-to-br ${folder.color} rounded-2xl items-center justify-center mr-4`}
            >
              <Ionicons name={folder.icon as any} size={24} color="white" />
            </View>

            <View className="flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-1">
                {folder.name}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                {folder.noteCount} notes
              </Text>
            </View>

            <TouchableOpacity className="p-2">
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <GhanaCard3D frontImage={images.front} backImage={images.back} title="Ghana Card" description="This is a 3D representation of the Ghana Card." />
        <GhanaCard3D frontImage={images.schoolfront} backImage={images.schoolback} title="School ID" description="This is a 3D representation of the School ID." />
      </ScrollView>

      {/* Floating Action Buttons */}
      <ActionButtons
        onAddFolder={handleAddFolder}
        onQuickNote={handleQuickNote}
      />

      <AddFolderModal
        visible={addFolderVisible}
        onClose={() => setAddFolderVisible(false)}
        onCreateFolder={handleCreateFolder}
      />
    </SafeAreaView>
  )
}

export default MainScreenWithModal
