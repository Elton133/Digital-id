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
} from "react-native"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from "@/schemas"
import { signupSchema } from "@/schemas"
import LottieView from "lottie-react-native"
import { Image } from "react-native"
import { images } from "@/constants/images"


const SignUpScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Sign up:", { fullName, email, password })
      router.push("/screens/biometric-setup-screen")
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        <View className="flex-row items-center px-6 py-4 bg-white/80 backdrop-blur-sm">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 p-2 rounded-full bg-gray-100"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-lg font-semibold text-gray-800">
            Create Account
          </Text>
        </View>

        <ScrollView className="flex-1 px-6">
          {/* Title */}
          <View className="mb-8">
            <View className="items-center justify-center mb-3 overflow-hidden">
              <LottieView
                source={require("../../../assets/animations/Fingerprint.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-2xl font-bold text-gray-800 mb-2">
              Join Digital ID  
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
              Create your account to start storing smarter!
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4 mb-8 gap-4">
            {/* Full Name */}
            <View>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-md font-semibold mb-2">
                Full Name
              </Text>
              <TextInput
                {...register("fullName")}
                placeholder="Enter your full name"
                style={{ fontFamily: "Gilroy-Regular", height: 45, fontSize: 16, lineHeight: 20, textAlignVertical: 'center', justifyContent: 'center' }}
                className="border border-gray-200 rounded-full px-4 text-base bg-gray-50"
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-md font-semibold mb-2">
                Email Address
              </Text>
              <TextInput
                {...register("email")}
                placeholder="Enter your email"
                style={{ fontFamily: "Gilroy-Regular", height: 45, fontSize: 16, lineHeight: 20, textAlignVertical: 'center', justifyContent: 'center' }}
                className="border border-gray-200 rounded-full px-4 text-base bg-gray-50"
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
                  {...register("password")}
                  placeholder="Create a password"
                  style={{ fontFamily: "Gilroy-Regular", height: 45, fontSize: 16, lineHeight: 20, textAlignVertical: 'center', justifyContent: 'center' }}
                  className="border border-gray-200 rounded-full px-4 text-base bg-gray-50"
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

            {/* Confirm Password */}
            <View>
              <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-gray-700 text-md font-semibold mb-2">
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
                  style={{ fontFamily: "Gilroy-Regular", height: 45, fontSize: 16, lineHeight: 20, textAlignVertical: 'center', justifyContent: 'center' }}
                  className="border border-gray-200 rounded-full px-4 text-base bg-gray-50"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`rounded-full py-4 items-center mb-6 ${
              isLoading ? "bg-gray-300" : "bg-[#003554]"
            }`}
          >
            <Text style={{ fontFamily: "Gilroy-SemiBold" }} className="text-white text-base font-semibold">
              {isLoading ? "Creating Account..." : "Create Account"}
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

          {/* Social Sign Up */}
          <View className="flex-row space-x-4 mb-8 gap-4">
                      <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-50 rounded-full py-3 shadow-sm">
                        <Image
                          source={images.google}
                          className="w-[25px] h-[25px]"
                          resizeMode="contain"
                        />
          
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-50 rounded-full py-3 shadow-sm">
                        <Ionicons name="logo-apple" size={20} color="#000" />
                      </TouchableOpacity>
                    </View>

          {/* Login Link */}
          <View className="items-center mb-8">
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen
