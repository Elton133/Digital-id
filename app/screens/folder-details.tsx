"use client"

import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface FolderItem {
  id: string
  name: string
  type: "document" | "image" | "certificate"
  dateAdded: string
  tag?: "verified" | "needs-update"
}

interface FolderDetailsProps {
  folderName: string
  createdDate: string
  lastUpdated: string
  gradientColors: string[]
  items: FolderItem[]
}

const FolderDetails: React.FC<FolderDetailsProps> = ({
  folderName,
  createdDate,
  lastUpdated,
  gradientColors,
  items = [],
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Ionicons name="image-outline" size={20} color="#2563eb" />
      case "certificate":
        return <Ionicons name="shield-checkmark-outline" size={20} color="#16a34a" />
      default:
        return <Ionicons name="document-text-outline" size={20} color="#6b7280" />
    }
  }

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "needs-update":
        return "bg-orange-100 text-orange-800"
      default:
        return ""
    }
  }

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center py-16">
      <View className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center mb-4">
        <Ionicons name="document-text-outline" size={32} color="#9ca3af" />
      </View>
      <Text className="text-xl font-semibold text-gray-900 mb-2">No documents yet</Text>
      <Text className="text-gray-500 text-center mb-6 px-8">
        Start building your digital identity by adding your first document
      </Text>
      <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-xl">
        <Text className="text-white font-semibold">Add Document</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header Section with Gradient */}
      <View
        style={[
          styles.header,
          {
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          },
        ]}
        className="rounded-b-3xl"
      >
        <View className="items-center pt-12 pb-8">
          {/* Folder Icon */}
          <View className="w-16 h-16 bg-white/20 rounded-2xl justify-center items-center mb-4">
            <Ionicons name="folder-outline" size={28} color="white" />
          </View>

          {/* Folder Name */}
          <Text className="text-2xl font-bold text-white mb-2">{folderName}</Text>

          {/* Dates */}
          <View className="items-center space-y-1">
            <Text className="text-white/80 text-sm">Created on {createdDate}</Text>
            <Text className="text-white/80 text-sm">Last updated {lastUpdated}</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between bg-white rounded-2xl p-4 shadow-lg">
          <TouchableOpacity className="items-center flex-1">
            <View className="w-12 h-12 bg-blue-100 rounded-xl justify-center items-center mb-2">
              <Ionicons name="add-outline" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-gray-600 font-medium">Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-12 h-12 bg-green-100 rounded-xl justify-center items-center mb-2">
              <Ionicons name="share-outline" size={20} color="#16a34a" />
            </View>
            <Text className="text-xs text-gray-600 font-medium">Share</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-12 h-12 bg-purple-100 rounded-xl justify-center items-center mb-2">
              <Ionicons name="create-outline" size={20} color="#9333ea" />
            </View>
            <Text className="text-xs text-gray-600 font-medium">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-12 h-12 bg-gray-100 rounded-xl justify-center items-center mb-2">
              <Ionicons name="ellipsis-horizontal-outline" size={20} color="#6b7280" />
            </View>
            <Text className="text-xs text-gray-600 font-medium">More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Items List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <View className="space-y-3">
            <Text className="text-lg font-semibold text-gray-900 mb-2">Documents ({items.length})</Text>

            {items.map((item) => (
              <TouchableOpacity key={item.id} className="bg-white rounded-xl p-4 shadow-lg flex-row items-center">
                {/* Document Icon */}
                <View className="w-12 h-12 bg-gray-50 rounded-xl justify-center items-center mr-4">
                  {getDocumentIcon(item.type)}
                </View>

                {/* Document Info */}
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 mb-1">{item.name}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={12} color="#9ca3af" />
                    <Text className="text-sm text-gray-500 ml-1">{item.dateAdded}</Text>
                  </View>
                </View>

                {/* Tag */}
                {item.tag && (
                  <View className={`px-3 py-1 rounded-full ${getTagStyle(item.tag)}`}>
                    <Text className="text-xs font-medium">{item.tag}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: gradientColors[0] }]} className="shadow-lg">
        <Ionicons name="add-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingTop: 20,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
})

// Example usage component
const ExampleFolderDetails = () => {
  const sampleItems: FolderItem[] = [
    {
      id: "1",
      name: "National ID Card",
      type: "certificate",
      dateAdded: "Jan 15, 2024",
      tag: "verified",
    },
    {
      id: "2",
      name: "Passport Photo",
      type: "image",
      dateAdded: "Jan 12, 2024",
    },
    {
      id: "3",
      name: "Birth Certificate",
      type: "document",
      dateAdded: "Jan 10, 2024",
      tag: "needs-update",
    },
  ]

  return (
    <FolderDetails
      folderName="Personal Documents"
      createdDate="Jan 10, 2024"
      lastUpdated="Jan 15, 2024"
      gradientColors={["#3b82f6", "#1d4ed8"]}
      items={sampleItems}
    />
  )
}

export default ExampleFolderDetails
