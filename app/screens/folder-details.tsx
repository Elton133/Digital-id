// original implementation

// "use client"
// import { Ionicons } from "@expo/vector-icons"
// import { LinearGradient } from "expo-linear-gradient"
// import type React from "react"
// import { useState } from "react"
// import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { useRouter } from "expo-router"
// import GhanaCard3D from "@/components/card-component"
// import { images } from "@/constants/images"


// interface FolderItem {
//   id: string
//   name: string
//   type: "document" | "image" | "certificate"
//   dateAdded: string
//   tag?: "verified" | "needs-update"
// }

// interface FolderDetailsProps {
//   folderName: string
//   createdDate: string
//   lastUpdated: string
//   items: FolderItem[]
// }

// const FolderDetails: React.FC<FolderDetailsProps> = ({ folderName, createdDate, lastUpdated, items = [] }) => {
//   const [selectedItems, setSelectedItems] = useState<string[]>([])
//   const router = useRouter();

//   const getDocumentIcon = (type: string) => {
//     switch (type) {
//       case "image":
//         return <Ionicons name="image-outline" size={20} color="#003554" />
//       case "certificate":
//         return <Ionicons name="shield-checkmark-outline" size={20} color="#003554" />
//       default:
//         return <Ionicons name="document-text-outline" size={20} color="#003554" />
//     }
//   }

//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "verified":
//         return "bg-green-100 text-green-800"
//       case "needs-update":
//         return "bg-orange-100 text-orange-800"
//       default:
//         return ""
//     }
//   }

//   const EmptyState = () => (
//     <View className="flex-1 justify-center items-center py-16">
//       <LinearGradient
//         colors={["#60A5FA", "#A78BFA"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={{
//           width: 96,
//           height: 96,
//           borderRadius: 24,
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: 16,
//         }}
//       >
//         <Ionicons name="document-text-outline" size={32} color="black" />
//       </LinearGradient>
//       <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800 mb-2">
//         No documents yet
//       </Text>
//       <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mb-6 px-8">
//         Start building your digital identity by adding your first document
//       </Text>
//       <TouchableOpacity className="bg-[#003554] px-6 py-3 rounded-xl">
//         <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white font-semibold">
//           Add Document
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//       }}
//       className="flex-1"
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 py-4 bg-white">
//         <View className="flex-row items-center">
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3" onPress={() => router.push("/screens/main")}>
//             <Ionicons name="arrow-back" size={20} color="#003554" />
//           </TouchableOpacity>
//           <View>
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
//               {folderName}
//             </Text>
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-sm text-gray-500">
//               {items.length} items
//             </Text>
//           </View>
//         </View>

//         <View className="flex-row items-center space-x-8 gap-2">
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
//             <Ionicons name="search-outline" size={20} color="#003554" />
//           </TouchableOpacity>
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
//             <Ionicons name="options-outline" size={20} color="#003554" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Content */}
//       <ScrollView className="flex-1 px-6 py-4" style={styles.container}>
//         {/* Stats Card */}
//         <View className="bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-2">
//             Folder Stats
//           </Text>
//           <View className="flex-row justify-between">
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-[#003554]">
//                 {items.length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Items
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-green-600">
//                 {items.filter((item) => item.tag === "verified").length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Verified
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-orange-600">
//                 {items.filter((item) => item.tag === "needs-update").length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Needs Update
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Folder Info Card */}
//         <View className="bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-3">
//             Folder Information
//           </Text>
//           <View className="space-y-2">
//             <View className="flex-row items-center">
//               <Ionicons name="calendar-outline" size={16} color="#6b7280" />
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
//                 Created: {createdDate}
//               </Text>
//             </View>
//             <View className="flex-row items-center">
//               <Ionicons name="time-outline" size={16} color="#6b7280" />
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
//                 Updated: {lastUpdated}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <GhanaCard3D
//                   frontImage={images.front}
//                   backImage={images.back}
//                   title="Ghana Card"
//                   description="This is a 3D representation of the Ghana Card."
//                 />
//                 <GhanaCard3D
//                   frontImage={images.schoolfront}
//                   backImage={images.schoolback}
//                   title="School ID"
//                   description="This is a 3D representation of the School ID."
//                 />
//       </ScrollView>

//       {/* Docked Bottom Actions */}
//       <View className="absolute bottom-8 left-6 right-6 mb-2">
//            <View className="flex-row justify-around px-6 py-4">
//         <TouchableOpacity onPress={() => router.push("/screens/add-card")}
//           className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm"
//         >
//           <Ionicons name="add" size={20} color="white" />
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
//             Add Card
//                 </Text>
//               </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//            <Ionicons name="create-outline" size={20} color="white" />
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white font-semibold ml-2">
//             Edit
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//            <Ionicons name="ellipsis-horizontal-outline" size={20} color="white" />
//           {/* <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white font-semibold ml-2"> */}
//         </TouchableOpacity>
//       </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#f9fafb",
//   },
// })

// export default FolderDetails





// works perfectly but for single cards only
// "use client"
// import { Ionicons } from "@expo/vector-icons"
// import { LinearGradient } from "expo-linear-gradient"
// import type React from "react"
// import { useState, useEffect } from "react"
// import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View , Alert, Image } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { useRouter } from "expo-router"
// import GhanaCard3D from "@/components/card-component"
// import { getStoredCardImages, getImageUri, hasStoredCardImages, StoredCardImages, deleteStoredCardImages } from "@/lib/imageUtils"

// interface FolderItem {
//   id: string
//   name: string
//   type: "document" | "image" | "certificate"
//   dateAdded: string
//   tag?: "verified" | "needs-update"
// }

// interface FolderDetailsProps {
//   folderName: string
//   createdDate: string
//   lastUpdated: string
//   items: FolderItem[]
// }

// const FolderDetails: React.FC<FolderDetailsProps> = ({ folderName, createdDate, lastUpdated, items = [] }) => {
//   const [images, setImages] = useState<StoredCardImages | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedItems, setSelectedItems] = useState<string[]>([])
//   const [imageUris, setImageUris] = useState<{front: any, back: any} | null>(null)
//   const router = useRouter();

//   useEffect(() => {
//     loadStoredImages()
//   }, [])

//   const loadStoredImages = async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const storedImages = await getStoredCardImages()
      
//       if (storedImages) {
//         setImages(storedImages)
        
//         // Convert stored images to proper URIs for display
//         const frontUri = getImageUri(storedImages.front)
//         const backUri = getImageUri(storedImages.back)
        
//         console.log('Front URI:', frontUri)
//         console.log('Back URI:', backUri)
        
//         setImageUris({
//           front: frontUri,
//           back: backUri
//         })
//       } else {
//         setError('No stored card images found. Please capture your ID first.')
//       }
//     } catch (err) {
//       console.error('Error loading images:', err)
//       setError('Failed to load stored images')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDeleteImages = () => {
//     Alert.alert(
//       'Delete ID Images',
//       'Are you sure you want to delete your stored ID images? This action cannot be undone.',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             const success = await deleteStoredCardImages()
//             if (success) {
//               setImages(null)
//               setImageUris(null)
//               setError('Images deleted successfully')
//               Alert.alert('Success', 'Your ID images have been deleted.')
//             } else {
//               Alert.alert('Error', 'Failed to delete images')
//             }
//           },
//         },
//       ]
//     )
//   }

//   // Test component to verify images are loading correctly
//   const ImagePreview = () => (
//     <View className="items-center mb-4">
//       <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-2">
//         Image Preview Test
//       </Text>
//       <View className="flex-row justify-around w-full">
//         <View className="items-center">
//           <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 mb-1">Front</Text>
//           {imageUris?.front ? (
//             <Image 
//               source={{ uri: imageUris.front }} 
//               style={{ width: 100, height: 60, borderRadius: 8 }}
//               resizeMode="cover"
//             />
//           ) : (
//             <View className="w-20 h-12 bg-gray-200 rounded justify-center items-center">
//               <Text className="text-gray-500 text-xs">No image</Text>
//             </View>
//           )}
//         </View>
//         <View className="items-center">
//           <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 mb-1">Back</Text>
//           {imageUris?.back ? (
//             <Image 
//               source={{ uri: imageUris.back }} 
//               style={{ width: 100, height: 60, borderRadius: 8 }}
//               resizeMode="cover"
//             />
//           ) : (
//             <View className="w-20 h-12 bg-gray-200 rounded justify-center items-center">
//               <Text className="text-gray-500 text-xs">No image</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </View>
//   )

//   const getDocumentIcon = (type: string) => {
//     switch (type) {
//       case "image":
//         return <Ionicons name="image-outline" size={20} color="#003554" />
//       case "certificate":
//         return <Ionicons name="shield-checkmark-outline" size={20} color="#003554" />
//       default:
//         return <Ionicons name="document-text-outline" size={20} color="#003554" />
//     }
//   }

//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "verified":
//         return "bg-green-100 text-green-800"
//       case "needs-update":
//         return "bg-orange-100 text-orange-800"
//       default:
//         return ""
//     }
//   }

//   if (loading) {
//     return (
//       <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
//         <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600">
//           Loading images...
//         </Text>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//       }}
//       className="flex-1"
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 py-4 bg-white">
//         <View className="flex-row items-center">
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3" onPress={() => router.push("/screens/main")}>
//             <Ionicons name="arrow-back" size={20} color="#003554" />
//           </TouchableOpacity>
//           <View>
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
//               {folderName}
//             </Text>
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-sm text-gray-500">
//               {items.length} items
//             </Text>
//           </View>
//         </View>

//         <View className="flex-row items-center space-x-8 gap-2">
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
//             <Ionicons name="search-outline" size={20} color="#003554" />
//           </TouchableOpacity>
//           <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
//             <Ionicons name="options-outline" size={20} color="#003554" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Content */}
//       <ScrollView className="flex-1 px-6 py-4" style={styles.container}>
//         {/* Debug Info */}
//         {error && (
//           <View className="bg-red-100 rounded-lg p-3 mb-4">
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-red-800">
//               {error}
//             </Text>
//           </View>
//         )}

//         {/* Image Preview Test */}
//         <ImagePreview />

//         {/* Stats Card */}
//         <View className="bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-2">
//             Folder Stats
//           </Text>
//           <View className="flex-row justify-between">
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-[#003554]">
//                 {items.length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Items
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-green-600">
//                 {items.filter((item) => item.tag === "verified").length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Verified
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-orange-600">
//                 {items.filter((item) => item.tag === "needs-update").length}
//               </Text>
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
//                 Needs Update
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Folder Info Card */}
//         <View className="bg-white rounded-2xl p-4 mb-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
//           <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-3">
//             Folder Information
//           </Text>
//           <View className="space-y-2">
//             <View className="flex-row items-center">
//               <Ionicons name="calendar-outline" size={16} color="#6b7280" />
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
//                 Created: {createdDate}
//               </Text>
//             </View>
//             <View className="flex-row items-center">
//               <Ionicons name="time-outline" size={16} color="#6b7280" />
//               <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-600 ml-2">
//                 Updated: {lastUpdated}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Ghana Card 3D Component */}
//         {imageUris?.front && imageUris?.back ? (
//           <View className="items-center mb-4">
//             <GhanaCard3D
//               frontImage={{ uri: imageUris.front }}
//               backImage={{ uri: imageUris.back }}
//               title="Ghana Card"
//               description="National Identification Card"
//             />
//             <TouchableOpacity
//               onPress={handleDeleteImages}
//               className="bg-red-600 px-4 py-2 rounded-xl mt-4"
//             >
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-center">
//                 Delete Card
//               </Text>
//             </TouchableOpacity>
//           </View>
          
//         ) : (
//           <View className="bg-white rounded-2xl p-6 items-center justify-center mb-4">
//             <Ionicons name="card-outline" size={48} color="#9ca3af" />
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mt-2">
//               No Card Images Found
//             </Text>
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mt-1">
//               Capture your Ghana Card to display it here
//             </Text>
//             <TouchableOpacity
//               onPress={() => router.push("/screens/add-card")}
//               className="bg-[#003554] px-6 py-3 rounded-xl mt-4"
//             >
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-center">
//                 Capture Card Now
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {/* Docked Bottom Actions */}
//       <View className="absolute bottom-8 left-6 right-6 mb-2">
//         <View className="flex-row justify-around px-6 py-4">
//           <TouchableOpacity 
//             onPress={() => router.push("/screens/add-card")}
//             className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm"
//           >
//             <Ionicons name="add" size={20} color="white" />
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
//               Add Card
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//             <Ionicons name="create-outline" size={20} color="white" />
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white font-semibold ml-2">
//               Edit
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//             <Ionicons name="ellipsis-horizontal-outline" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#f9fafb",
//   },
// })

// export default FolderDetails












// this one works someway not fully

// "use client"

// import { Ionicons } from "@expo/vector-icons"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useState, useEffect } from "react"
// import {
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Alert,
// } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { useRouter } from "expo-router"
// import GhanaCard3D from "@/components/card-component"
// import {
//   getStoredCardImages,
//   getImageUri,
//   deleteStoredCardImages,
//   StoredCardImages,
// } from "@/lib/imageUtils"

// interface FolderItem {
//   id: string
//   name: string
//   type: "document" | "image" | "certificate"
//   dateAdded: string
//   tag?: "verified" | "needs-update"
// }

// interface FolderDetailsProps {
//   folderName: string
//   createdDate: string
//   lastUpdated: string
//   items: FolderItem[]
// }

// const FolderDetails: React.FC<FolderDetailsProps> = ({
//   folderName,
//   createdDate,
//   lastUpdated,
//   items = [],
// }) => {
//   const [images, setImages] = useState<StoredCardImages | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     loadStoredImages()
//   }, [])

//   const loadStoredImages = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const storedImages = await getStoredCardImages()
//       if (storedImages?.front && storedImages?.back) {
//         setImages(storedImages)
//       } else {
//         setImages(null)
//         setError("No stored card images found. Please capture your ID first.")
//       }
//     } catch (err) {
//       console.error("Error loading images:", err)
//       setError("Failed to load stored images")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDeleteImages = () => {
//     Alert.alert(
//       "Delete ID Images",
//       "Are you sure you want to delete your stored ID images? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             const success = await deleteStoredCardImages()
//             if (success) {
//               setImages(null)
//               setError("Images deleted successfully")
//               Alert.alert("Success", "Your ID images have been deleted.")
//             } else {
//               Alert.alert("Error", "Failed to delete images")
//             }
//           },
//         },
//       ]
//     )
//   }

//   const navigateToCamera = () => {
//     router.push("/screens/add-card")
//   }

//   return (
//     <SafeAreaView
//       style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 py-4 bg-white">
//         <View className="flex-row items-center">
//           <TouchableOpacity
//             className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3"
//             onPress={() => router.push("/screens/main")}
//           >
//             <Ionicons name="arrow-back" size={20} color="#003554" />
//           </TouchableOpacity>
//           <View>
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-semibold text-gray-800">
//               {folderName}
//             </Text>
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-sm text-gray-500">
//               {items.length} items
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
//         {/* Loading / Error State */}
//         {loading ? (
//           <Text style={styles.infoText}>Loading images...</Text>
//         ) : error ? (
//           <View className="flex-1 justify-center items-center py-16">
//             <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mb-4">
//               {error}
//             </Text>
//             <TouchableOpacity
//               onPress={navigateToCamera}
//               className="bg-[#003554] px-6 py-3 rounded-xl"
//             >
//               <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-center">
//                 Add Card
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           images && (
//             <GhanaCard3D
//               frontImage={getImageUri(images.front)}
//               backImage={getImageUri(images.back)}
//               title="Ghana Card"
//               description="Your primary identification card"
//             />
//           )
//         )}
//       </ScrollView>

//       {/* Docked Bottom Actions */}
//       <View className="absolute bottom-8 left-6 right-6 mb-2">
//         <View className="flex-row justify-around px-6 py-4">
//           <TouchableOpacity
//             onPress={navigateToCamera}
//             className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm"
//           >
//             <Ionicons name="add" size={20} color="white" />
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
//               Add Card
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//             <Ionicons name="create-outline" size={20} color="white" />
//             <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white font-semibold ml-2">
//               Edit
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
//             <Ionicons name="ellipsis-horizontal-outline" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//   },
//   infoText: {
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 20,
//   },
// })

// export default FolderDetails





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

        <View className="flex-row items-center space-x-8 gap-2">
           <TouchableOpacity
            onPress={() => router.push("/screens/add-card")}
            className="flex-row items-center bg-black rounded-full px-6 py-4 shadow-sm">
            <Ionicons name="add" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-2">
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4" style={styles.container}>
        {/* Error */}
        {error && (
          <View className="bg-red-100 rounded-lg p-3 mb-4">
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-red-800">
              {error}
            </Text>
          </View>
        )}

        <View className="bg-black rounded-2xl p-4 mb-1 shadow-[2px_2px_2px_rgba(0,0,0,0.1)]">
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mb-2">
            Collection Stats
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-[#003554]">
                {cards.length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                Cards
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-green-600">
                {items.filter((item) => item.tag === "verified").length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
                Verified
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-xl font-bold text-orange-600">
                {items.filter((item) => item.tag === "needs-update").length}
              </Text>
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-sm">
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
          <View className="bg-white rounded-2xl p-6 items-center justify-center mb-4">
            <Ionicons name="card-outline" size={48} color="#9ca3af" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800 mt-2">
              No Cards Found
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center mt-1">
              Capture your Ghana Card to display it here
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/screens/add-card")}
              className="bg-[#003554] px-6 py-3 rounded-xl mt-4"
            >
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-center">
                Capture Card Now
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
