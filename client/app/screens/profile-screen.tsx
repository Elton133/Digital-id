"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React, { useState, useEffect } from "react"
import { ScrollView, StatusBar, Text, TouchableOpacity, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllDocuments } from "@/lib/documentManager"
import { getEmergencyInfo } from "@/lib/emergencyAccess"
import { getBiometricPreference } from "@/lib/biometricAuth"

const ProfileScreen: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userName, setUserName] = useState<string>('User')
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalCards: 0,
    emergencyContacts: 0,
    lastSync: '',
  })

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      // Load user info (you might want to store this during login)
      const email = await AsyncStorage.getItem('user_email') || 'user@example.com'
      const name = await AsyncStorage.getItem('user_name') || 'Digital ID User'
      setUserEmail(email)
      setUserName(name)

      // Load statistics
      const documents = await getAllDocuments()
      const emergencyInfo = await getEmergencyInfo()
      const lastSyncTime = await AsyncStorage.getItem('last_sync')

      setStats({
        totalDocuments: documents.length,
        totalCards: documents.filter(doc => doc.type === 'card').length,
        emergencyContacts: emergencyInfo?.emergencyContacts.length || 0,
        lastSync: lastSyncTime ? new Date(parseInt(lastSyncTime)).toLocaleString() : 'Never',
      })
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const handleSettingsOption = async (option: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    
    switch (option) {
      case 'personal':
        Alert.alert('Personal Information', 'Edit personal info would go here')
        break
      case 'security':
        router.push('/screens/biometric-setup-screen')
        break
      case 'emergency':
        router.push('/screens/emergency-access-screen')
        break
      case 'documents':
        router.push('/screens/documents-screen')
        break
      case 'backup':
        Alert.alert('Backup & Sync', 'Data backup options would go here')
        break
      case 'privacy':
        Alert.alert('Privacy Settings', 'Privacy controls would go here')
        break
      case 'notifications':
        Alert.alert('Notifications', 'Notification preferences would go here')
        break
      case 'about':
        Alert.alert('About', 'Digital ID v1.0.0\nSecure identity management')
        break
      case 'logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: async () => {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                await AsyncStorage.removeItem('token')
                router.push('/screens/auth/login-screen')
              },
            },
          ]
        )
        break
    }
  }

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', key: 'personal' },
        { icon: 'shield-checkmark-outline', label: 'Security & Biometrics', key: 'security' },
        { icon: 'medical-outline', label: 'Emergency Access', key: 'emergency' },
        { icon: 'document-text-outline', label: 'Documents', key: 'documents' },
      ],
    },
    {
      title: 'Data',
      items: [
        { icon: 'cloud-upload-outline', label: 'Backup & Sync', key: 'backup' },
        { icon: 'lock-closed-outline', label: 'Privacy Settings', key: 'privacy' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications-outline', label: 'Notifications', key: 'notifications' },
        { icon: 'information-circle-outline', label: 'About', key: 'about' },
      ],
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#003554" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
          Profile
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="bg-white mx-6 mt-6 rounded-2xl p-6 shadow-sm">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-[#003554] rounded-tr-2xl rounded-br-3xl rounded-bl-2xl rounded-tl-xl items-center justify-center mb-3">
              <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-white text-3xl font-bold">
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
              {userName}
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm mt-1">
              {userEmail}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between pt-4 border-t border-gray-100">
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-2xl font-bold text-[#003554]">
                {stats.totalDocuments}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-xs mt-1">
                Documents
              </Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-2xl font-bold text-[#003554]">
                {stats.totalCards}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-xs mt-1">
                Cards
              </Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-2xl font-bold text-[#003554]">
                {stats.emergencyContacts}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-xs mt-1">
                Contacts
              </Text>
            </View>
          </View>
        </View>

        {/* Last Sync */}
        <View className="mx-6 mt-4 bg-blue-50 rounded-xl p-3 flex-row items-center">
          <Ionicons name="sync-outline" size={16} color="#3b82f6" />
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-blue-700 text-xs ml-2">
            Last synced: {stats.lastSync}
          </Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} className="mx-6 mt-6">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-sm text-gray-500 mb-3 px-2">
              {section.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.key}>
                  <TouchableOpacity
                    onPress={() => handleSettingsOption(item.key)}
                    className="flex-row items-center px-4 py-4 active:bg-gray-50"
                  >
                    <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                      <Ionicons name={item.icon as any} size={20} color="#003554" />
                    </View>
                    <Text style={{ fontFamily: "Gilroy-Regular" }} className="flex-1 text-gray-800 text-base">
                      {item.label}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && (
                    <View className="h-px bg-gray-100 ml-16" />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => handleSettingsOption('logout')}
          className="mx-6 mt-6 mb-8 bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-sm border border-red-100"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-red-500 text-base ml-2">
            Logout
          </Text>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
