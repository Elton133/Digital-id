"use client"
import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useState, useEffect } from "react"
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import GhanaCard3D from "@/components/card-component"
import {
  getAllStoredCardImages,
  getImageUri,
  deleteStoredCardByTimestamp,
  type StoredCardImages,
} from "@/lib/imageUtils"

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
  items: FolderItem[]
}

type Card = {
  front: string
  back: string
  timestamp: number
}

const FolderDetails: React.FC<FolderDetailsProps> = ({ folderName, createdDate, lastUpdated, items = [] }) => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadStoredCards()
  }, [])

  const loadStoredCards = async () => {
    try {
      setLoading(true)
      setError(null)
      const storedCards: StoredCardImages[] = await getAllStoredCardImages() // Must return array
      if (storedCards.length > 0) {
        const mappedCards = storedCards.map((card) => ({
          front: getImageUri(card.front),
          back: getImageUri(card.back),
          timestamp: card.timestamp,
        }))
        setCards(mappedCards)
      } else {
        setError("No stored cards found")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to load cards")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCard = (timestamp: number) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteStoredCardByTimestamp(timestamp)
          if (success) {
            setCards(cards.filter((c) => c.timestamp !== timestamp))
            Alert.alert("Deleted", "Card deleted successfully")
          } else {
            Alert.alert("Error", "Failed to delete card")
          }
        },
      },
    ])
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600">
          Loading cards...
        </Text>
      </SafeAreaView>
    )
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

      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3"
            onPress={() => router.push("/screens/main")}
          >
            <Ionicons name="arrow-back" size={20} color="#003554" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
              {folderName || "Folder Name"}
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-sm text-gray-500">
              {cards.length} cards • {items.length} items
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4" style={styles.container}>
        {/* Error */}
        {/* {error && (
          <View className="bg-red-100 rounded-lg p-3 mb-4">
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-red-800">
              {error}
            </Text>
          </View>
        )} */}
          {/* <View className="flex-row items-end space-x-8 gap-2 mb-4">
           <TouchableOpacity
            onPress={() => router.push("/screens/add-card")}
            className="flex-row items-center bg-black rounded-full px-5 py-3 shadow-sm">
            <Ionicons name="add" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
              Add Card
            </Text>
          </TouchableOpacity>
        </View> */}

        <View className="bg-black rounded-2xl p-4 mb-1 shadow-sm">
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-white mb-2">
            Collection Stats
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-white">
                {cards.length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white text-sm">
                Cards
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-white">
                {items.filter((item) => item.tag === "verified").length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white text-sm">
                Verified
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-white">
                {items.filter((item) => item.tag === "needs-update").length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white text-sm">
                Needs Update
              </Text>
            </View>
          </View>
        </View>

        {/* <View className="bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-3">
            Folder Information
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#6b7280" />
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
                Created: {createdDate}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
                Updated: {lastUpdated}
              </Text>
            </View>
          </View>
        </View> */}

        {/* Display all cards */}
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <View key={index} className="mb-6 items-center">
              <GhanaCard3D
                frontImage={{ uri: card.front }}
                backImage={{ uri: card.back }}
                title="Ghana Card"
                description={`Captured: ${new Date(card.timestamp).toLocaleString()}`}
              />
              <TouchableOpacity
                onPress={() => handleDeleteCard(card.timestamp)}
                className="bg-red-600 px-6 py-4 shadow-sm rounded-full"
              >
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-center">
                  Delete This Card
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="bg-white rounded-2xl p-6 items-center justify-center mb-4 mt-5">
            <Ionicons name="card-outline" size={48} color="#9ca3af" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mt-2">
              No Cards Found
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mt-1">
              Capture your IDs to display it here
            </Text>
             <TouchableOpacity
            onPress={() => router.push("/screens/add-card")}
            className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm mt-10">
            <Ionicons name="add" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
              Add Card
            </Text>
          </TouchableOpacity>
          </View>
        )}

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
})

export default FolderDetails
