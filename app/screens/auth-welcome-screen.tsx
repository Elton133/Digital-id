"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, Image } from "react-native"
import { images } from "@/constants/images"

const AuthWelcomeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 px-6">
        {/* App Icon and Branding */}
        <View className="items-center mt-20 mb-16">
             <View className="w-28 h-28 rounded-2xl items-center justify-center overflow-hidden">
                        <Image
                          source={images.id}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                              </View>

          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-3xl font-bold text-gray-800 mb-3">
            Welcome to Digital ID
          </Text>
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-center text-base leading-6">
            Your smart document companion.{"\n"}Organize your documents beautifully, securely and with ease of access.
          </Text>
        </View>

        {/* Auth Buttons */}
        <View className="space-y-4 mb-8 gap-5">
          {/* Continue with Apple */}
          <TouchableOpacity
            onPress={() => console.log("Apple Sign In")}
            className="flex-row items-center justify-center bg-black rounded-2xl py-4 px-6"
          >
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-3">
              Continue with Apple
            </Text>
          </TouchableOpacity>

          {/* Continue with Google */}
          <TouchableOpacity
            onPress={() => console.log("Google Sign In")}
            className="flex-row items-center justify-center border-2 border-gray-200 rounded-2xl py-4 px-6"
          >
            <View className="w-5 h-5 bg-red-500 rounded-full mr-3" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-800 text-base font-semibold">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Sign Up with Email */}
          <TouchableOpacity
            onPress={() => router.push("/screens/auth/signup-screen")}
            className="flex-row items-center justify-center bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl py-4 px-6"
          >
            <Ionicons name="mail-outline" size={20} color="white" />
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold ml-3">
              Sign up with Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="items-center">
          <View className="flex-row items-center">
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/screens/auth/login-screen")}>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-[#003554] text-base font-semibold">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Privacy */}
        <View className="items-center mt-8 mb-4">
          <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-400 text-sm text-center leading-4">
            By continuing, you agree to our{" "}
            <Text className="text-[#003554]">Terms of Service</Text> and{" "}
            <Text className="text-[#003554]">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AuthWelcomeScreen
