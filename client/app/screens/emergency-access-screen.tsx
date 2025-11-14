"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React, { useState, useEffect } from "react"
import { ScrollView, StatusBar, Text, TouchableOpacity, View, Alert, TextInput, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'
import {
  getEmergencyInfo,
  saveEmergencyInfo,
  addEmergencyContact,
  deleteEmergencyContact,
  getQuickAccessInfo,
  type EmergencyInfo,
  type EmergencyContact,
} from "@/lib/emergencyAccess"

const EmergencyAccessScreen: React.FC = () => {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo | null>(null)
  const [addContactModalVisible, setAddContactModalVisible] = useState(false)
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({})

  useEffect(() => {
    loadEmergencyInfo()
  }, [])

  const loadEmergencyInfo = async () => {
    try {
      let info = await getEmergencyInfo()
      
      if (!info) {
        // Initialize with default values
        info = {
          fullName: 'User Name',
          emergencyContacts: [],
          lastUpdated: Date.now(),
        }
        await saveEmergencyInfo(info)
      }
      
      setEmergencyInfo(info)
    } catch (error) {
      console.error('Error loading emergency info:', error)
    }
  }

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.back()
  }

  const handleAddContact = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setNewContact({})
    setAddContactModalVisible(true)
  }

  const handleSaveContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      Alert.alert('Missing Information', 'Please fill in all required fields')
      return
    }

    try {
      await addEmergencyContact({
        name: newContact.name,
        phone: newContact.phone,
        relationship: newContact.relationship,
        email: newContact.email,
      })
      
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setAddContactModalVisible(false)
      loadEmergencyInfo()
      Alert.alert('Success', 'Emergency contact added successfully')
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert('Error', 'Failed to add emergency contact')
    }
  }

  const handleDeleteContact = async (contactId: string, contactName: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    
    Alert.alert(
      'Delete Contact',
      `Remove ${contactName} from emergency contacts?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteEmergencyContact(contactId)
            if (success) {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              loadEmergencyInfo()
            }
          },
        },
      ]
    )
  }

  const handleEditBasicInfo = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Alert.alert('Edit Info', 'Edit personal information functionality would go here')
  }

  const quickShareInfo = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    const quickInfo = await getQuickAccessInfo()
    if (quickInfo) {
      Alert.alert('Quick Access Info', `Name: ${quickInfo.name}\nEmergency Contacts: ${quickInfo.emergencyContactsCount}`)
    }
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
            Emergency Access
          </Text>
        </View>
        <TouchableOpacity
          onPress={quickShareInfo}
          className="w-10 h-10 bg-red-100 rounded-full items-center justify-center"
        >
          <Ionicons name="medical" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Quick Access Card */}
        <View className="mx-6 mt-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                <Ionicons name="alert-circle" size={24} color="white" />
              </View>
              <View>
                <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-white text-lg">
                  Quick Access
                </Text>
                <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white/80 text-sm">
                  For emergency situations
                </Text>
              </View>
            </View>
          </View>
          
          <View className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white mb-2">
              {emergencyInfo?.fullName || 'Not Set'}
            </Text>
            {emergencyInfo?.bloodType && (
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white/90 text-sm">
                Blood Type: {emergencyInfo.bloodType}
              </Text>
            )}
            {emergencyInfo?.identityNumber && (
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-white/90 text-sm">
                ID: {emergencyInfo.identityNumber}
              </Text>
            )}
          </View>
        </View>

        {/* Basic Information */}
        <View className="mx-6 mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-500 text-sm">
              BASIC INFORMATION
            </Text>
            <TouchableOpacity onPress={handleEditBasicInfo}>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-[#003554] text-sm">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {[
              { icon: 'person-outline', label: 'Full Name', value: emergencyInfo?.fullName || 'Not set' },
              { icon: 'water-outline', label: 'Blood Type', value: emergencyInfo?.bloodType || 'Not set' },
              { icon: 'medical-outline', label: 'Allergies', value: emergencyInfo?.allergies?.join(', ') || 'None' },
              { icon: 'fitness-outline', label: 'Medical Conditions', value: emergencyInfo?.medicalConditions?.join(', ') || 'None' },
            ].map((item, index, arr) => (
              <React.Fragment key={item.label}>
                <View className="flex-row items-center px-4 py-4">
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name={item.icon as any} size={20} color="#003554" />
                  </View>
                  <View className="flex-1">
                    <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-xs mb-1">
                      {item.label}
                    </Text>
                    <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-800">
                      {item.value}
                    </Text>
                  </View>
                </View>
                {index < arr.length - 1 && <View className="h-px bg-gray-100 ml-16" />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Emergency Contacts */}
        <View className="mx-6 mt-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-500 text-sm">
              EMERGENCY CONTACTS
            </Text>
            <TouchableOpacity onPress={handleAddContact}>
              <View className="flex-row items-center">
                <Ionicons name="add-circle" size={20} color="#003554" />
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-[#003554] text-sm ml-1">
                  Add
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {emergencyInfo?.emergencyContacts && emergencyInfo.emergencyContacts.length > 0 ? (
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {emergencyInfo.emergencyContacts.map((contact, index) => (
                <React.Fragment key={contact.id}>
                  <View className="flex-row items-center px-4 py-4">
                    <View className="w-12 h-12 bg-[#003554] rounded-full items-center justify-center mr-3">
                      <Text style={{ fontFamily: "Gilroy-Bold" }} className="text-white text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-800 text-base">
                        {contact.name}
                      </Text>
                      <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                        {contact.relationship} • {contact.phone}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteContact(contact.id, contact.name)}
                      className="p-2"
                    >
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                  {index < emergencyInfo.emergencyContacts.length - 1 && (
                    <View className="h-px bg-gray-100 ml-16" />
                  )}
                </React.Fragment>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-6 items-center">
              <Ionicons name="people-outline" size={48} color="#9ca3af" />
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-800 mt-3">
                No Emergency Contacts
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mt-1">
                Add trusted contacts for emergencies
              </Text>
            </View>
          )}
        </View>

        {/* Offline Access Info */}
        <View className="mx-6 mb-8 bg-blue-50 rounded-xl p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-blue-700 text-sm ml-2 flex-1">
              This information is stored securely on your device and can be accessed offline in case of emergencies.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal visible={addContactModalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl text-gray-800">
                Add Emergency Contact
              </Text>
              <TouchableOpacity onPress={() => setAddContactModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4 mb-6">
              <View>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 mb-2">
                  Name *
                </Text>
                <TextInput
                  placeholder="Enter name"
                  value={newContact.name}
                  onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  style={{ fontFamily: "Gilroy-Regular" }}
                />
              </View>

              <View>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 mb-2">
                  Relationship *
                </Text>
                <TextInput
                  placeholder="e.g., Mother, Brother, Friend"
                  value={newContact.relationship}
                  onChangeText={(text) => setNewContact({ ...newContact, relationship: text })}
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  style={{ fontFamily: "Gilroy-Regular" }}
                />
              </View>

              <View>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 mb-2">
                  Phone *
                </Text>
                <TextInput
                  placeholder="Enter phone number"
                  value={newContact.phone}
                  onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                  keyboardType="phone-pad"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  style={{ fontFamily: "Gilroy-Regular" }}
                />
              </View>

              <View>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 mb-2">
                  Email (Optional)
                </Text>
                <TextInput
                  placeholder="Enter email"
                  value={newContact.email}
                  onChangeText={(text) => setNewContact({ ...newContact, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border border-gray-200 rounded-xl px-4 py-3"
                  style={{ fontFamily: "Gilroy-Regular" }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSaveContact}
              className="bg-[#003554] rounded-xl py-4 items-center"
            >
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base">
                Save Contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default EmergencyAccessScreen
