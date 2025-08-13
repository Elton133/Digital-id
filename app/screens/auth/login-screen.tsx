"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import type React from "react"
import { useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator
} from "react-native"
import LottieView from "lottie-react-native"

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Login:", { email, password })
      router.push("/screens/biometric-login-screen")
    } catch (error) {
      Alert.alert("Error", "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push("/screens/biometric-login-screen")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        {/* <View className="flex-row items-center px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800">
            Welcome Back
          </Text>
        </View> */}

        <ScrollView className="flex-1 px-6">
          {/* App Icon */}
          <View className="items-center mt-14 mb-12">
           <View className="items-center justify-center mb-3 overflow-hidden">
              <LottieView
                source={require("../../../assets/animations/Fingerprint.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-bold text-gray-800 mb-2">
              Log In to Digital ID
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base text-center">
              Access your documents and continue organizing
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4 gap-4 mb-6">
            {/* Email */}
            <View>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-md font-semibold mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                style={{ fontFamily: "Gilroy-Regular" }}
                className="border border-gray-200 rounded-full px-4 py-4 text-base bg-gray-50"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-md font-semibold mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  style={{ fontFamily: "Gilroy-Regular" }}
                  className="border border-gray-200 rounded-full px-4 py-4 pr-12 text-base bg-gray-50"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword} className="items-end mb-8">
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-[#0D1B2A] text-sm font-semibold">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`rounded-full py-4 items-center mb-6 ${
              isLoading ? "bg-gray-300" : "bg-[#003554]"
            }`}
          >
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold">
              {isLoading ? <ActivityIndicator color="#ffffff" size="small" /> : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-400 text-sm mx-4">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login */}
          <View className="flex-row space-x-4 mb-8 gap-4">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-200 rounded-full py-3">
              <Ionicons name="logo-google" size={20} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-200 rounded-full py-3">
              <Ionicons name="logo-apple" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/screens/auth/signup-screen")}>
                <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-[#003554] text-base font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen
