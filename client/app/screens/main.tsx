import ActionButtons from "@/components/action-buttons"
import AddFolderModal from "@/components/add-folder-modal"
import FolderOptionsMenu from "@/components/FolderOptionsMenu"
import GhanaCard3D from "@/components/card-component"
// import { images } from "@/constants/images"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import type React from "react"
import { useState } from "react"
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'
import QRCodeModal from "@/components/QRCodeModal"

interface Folder {
  id: string
  name: string
  noteCount: number
  color: [string, string]  
  icon: string
}

const Main: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "1",
      name: "Government ID's",
      noteCount: 0,
      color: ["#60A5FA", "#A78BFA"],
      icon: "document-text",
    },
    {
      id: "2",
      name: "Documents",
      noteCount: 0,
      color: ["#60A5FA", "#A78BFA"],
      icon: "document-text",
    },
  ])

  const [addFolderVisible, setAddFolderVisible] = useState(false)
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [qrModalVisible, setQrModalVisible] = useState(false)
  const [selectedCardData, setSelectedCardData] = useState<any>(null)

  const handleAddFolder = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setAddFolderVisible(true)
  }

  const handleCreateFolder = async (name: string, color: [string, string], icon: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      noteCount: 0,
      color,
      icon,
    }
    setFolders([...folders, newFolder])
  }

  const handleQuickNote = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    console.log("Quick note")
  }

  const handleFolderPress = async (folderId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push("/screens/folder-details")
  }

  const handleFolderOptions = async (folder: Folder) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedFolder(folder)
    setOptionsMenuVisible(true)
  }

  const handleEditFolder = () => {
    Alert.alert('Edit Folder', `Edit "${selectedFolder?.name}" functionality would go here`)
  }

  const handleShareFolder = () => {
    if (selectedFolder) {
      setSelectedCardData({ 
        type: 'folder',
        name: selectedFolder.name,
        id: selectedFolder.id 
      })
      setQrModalVisible(true)
    }
  }

  const handleDeleteFolder = async () => {
    if (selectedFolder) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setFolders(folders.filter(f => f.id !== selectedFolder.id))
      Alert.alert('Deleted', `"${selectedFolder.name}" has been deleted`)
    }
  }

  const handleProfilePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/screens/profile-screen')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="flex-1"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={handleProfilePress}
            className="w-10 h-10 bg-[#003554] rounded-tr-lg rounded-br-2xl rounded-bl-lg rounded-tl-md items-center justify-center mr-3"
          >
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-xl font-bold">
              E
            </Text>
            <View className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
            Digital ID
          </Text>
        </View>

        <View className="flex-row items-center space-x-8 gap-2">
          <TouchableOpacity 
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              router.push('/screens/documents-screen')
            }}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="book-outline" size={20} color="#003554" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              router.push('/screens/emergency-access-screen')
            }}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="medical-outline" size={20} color="#003554" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
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
            <LinearGradient
              colors={folder.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Ionicons name={folder.icon as any} size={24} color="black" />
            </LinearGradient>

            <View className="flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-1">
                {folder.name}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                {folder.noteCount} notes
              </Text>
            </View>

            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation()
                handleFolderOptions(folder)
              }}
              className="p-2"
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Buttons */}
      <ActionButtons onAddFolder={handleAddFolder} onQuickNote={handleQuickNote} />

      <AddFolderModal
        visible={addFolderVisible}
        onClose={() => setAddFolderVisible(false)}
        onCreateFolder={handleCreateFolder}
      />

      <FolderOptionsMenu
        visible={optionsMenuVisible}
        onClose={() => setOptionsMenuVisible(false)}
        folderName={selectedFolder?.name || ''}
        onEdit={handleEditFolder}
        onShare={handleShareFolder}
        onDelete={handleDeleteFolder}
      />

      <QRCodeModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        cardData={selectedCardData}
        cardTitle={selectedCardData?.name || 'Folder'}
      />
    </SafeAreaView>
  )
}

export default Main
