import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


const ActionButtons = ({ onAddFolder, onQuickNote }: any) => {
      const [addFolderVisible, setAddFolderVisible] = useState(false)

    const handleAddFolder = () => {
    setAddFolderVisible(true)
  }
  return (
    <View className="absolute bottom-8 left-6 right-6 mb-2">
        <View className="flex-row items-center justify-center gap-5">
          <TouchableOpacity
            onPress={onQuickNote}
            className="w-14 h-14 bg-[#003554] rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onAddFolder}
            className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm"
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
              Add Folder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default ActionButtons

const styles = StyleSheet.create({})