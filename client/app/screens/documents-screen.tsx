"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React, { useState, useEffect } from "react"
import { ScrollView, StatusBar, Text, TouchableOpacity, View, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'
import { LinearGradient } from "expo-linear-gradient"
import {
  getAllDocuments,
  getDocumentsByCategory,
  getAllCategories,
  deleteDocument,
  searchDocuments,
  getExpiringDocuments,
  type Document,
  type DocumentCategory,
} from "@/lib/documentManager"

const DocumentsScreen: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [categories, setCategories] = useState<DocumentCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expiringDocs, setExpiringDocs] = useState<Document[]>([])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [selectedCategory, searchQuery])

  const loadData = async () => {
    try {
      const [allDocs, cats, expiring] = await Promise.all([
        getAllDocuments(),
        getAllCategories(),
        getExpiringDocuments(30),
      ])
      
      setDocuments(allDocs)
      setCategories(cats)
      setExpiringDocs(expiring)
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const filterDocuments = async () => {
    try {
      if (searchQuery) {
        const results = await searchDocuments(searchQuery)
        setDocuments(results)
      } else if (selectedCategory === 'all') {
        const allDocs = await getAllDocuments()
        setDocuments(allDocs)
      } else {
        const categoryDocs = await getDocumentsByCategory(selectedCategory)
        setDocuments(categoryDocs)
      }
    } catch (error) {
      console.error('Error filtering documents:', error)
    }
  }

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const handleAddDocument = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Alert.alert('Add Document', 'Document creation screen would go here')
  }

  const handleDocumentPress = async (doc: Document) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Alert.alert(doc.name, `Type: ${doc.type}\nCreated: ${new Date(doc.createdAt).toLocaleDateString()}`)
  }

  const handleDeleteDocument = async (docId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteDocument(docId)
            if (success) {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              loadData()
              Alert.alert('Success', 'Document deleted successfully')
            }
          },
        },
      ]
    )
  }

  const handleCategoryPress = async (categoryId: string) => {
    await Haptics.selectionAsync()
    setSelectedCategory(categoryId)
  }

  const getCategoryById = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleBack}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#003554" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
            Documents
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAddDocument}
          className="w-10 h-10 bg-[#003554] rounded-full items-center justify-center"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search documents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-base"
            style={{ fontFamily: "Gilroy-Regular" }}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Expiring Documents Alert */}
        {expiringDocs.length > 0 && (
          <View className="mx-6 mt-4 bg-orange-50 rounded-xl p-4">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={20} color="#f97316" />
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-orange-800 ml-2 flex-1">
                {expiringDocs.length} document{expiringDocs.length > 1 ? 's' : ''} expiring soon
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('Expiring Documents', expiringDocs.map(d => d.name).join('\n'))}>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-orange-600">View</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4">
          <TouchableOpacity
            onPress={() => handleCategoryPress('all')}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === 'all' ? 'bg-[#003554]' : 'bg-white'
            }`}
          >
            <Text
              style={{ fontFamily: "Gilroy-SemiBold" }}
              className={`${selectedCategory === 'all' ? 'text-white' : 'text-gray-700'}`}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category.id ? 'bg-[#003554]' : 'bg-white'
              }`}
            >
              <Text
                style={{ fontFamily: "Gilroy-SemiBold" }}
                className={`${selectedCategory === category.id ? 'text-white' : 'text-gray-700'}`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Documents List */}
        <View className="px-6 pb-6">
          {documents.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center justify-center mt-4">
              <Ionicons name="document-outline" size={48} color="#9ca3af" />
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mt-4">
                No Documents Found
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mt-2">
                {searchQuery ? 'Try a different search term' : 'Add your first document to get started'}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  onPress={handleAddDocument}
                  className="mt-6 bg-[#003554] rounded-full px-6 py-3"
                >
                  <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white">
                    Add Document
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            documents.map((doc) => {
              const category = getCategoryById(doc.category)
              const isExpiring = doc.expiryDate && doc.expiryDate < Date.now() + 30 * 24 * 60 * 60 * 1000
              const isExpired = doc.expiryDate && doc.expiryDate < Date.now()

              return (
                <TouchableOpacity
                  key={doc.id}
                  onPress={() => handleDocumentPress(doc)}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
                >
                  <View className="flex-row items-center">
                    {category && (
                      <LinearGradient
                        colors={category.color}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                      >
                        <Ionicons name={category.icon as any} size={20} color="white" />
                      </LinearGradient>
                    )}
                    <View className="flex-1">
                      <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-base text-gray-800 mb-1">
                        {doc.name}
                      </Text>
                      <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-sm text-gray-500">
                        {doc.type} • {new Date(doc.createdAt).toLocaleDateString()}
                      </Text>
                      {(isExpiring || isExpired) && (
                        <Text
                          style={{ fontFamily: "Gilroy-SemiBold" }}
                          className={`text-xs mt-1 ${isExpired ? 'text-red-600' : 'text-orange-600'}`}
                        >
                          {isExpired ? 'Expired' : 'Expiring soon'}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteDocument(doc.id)}
                      className="p-2"
                    >
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DocumentsScreen
