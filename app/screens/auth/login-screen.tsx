"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"
import { loginSchema } from "@/schemas"
import type { LoginSchema } from "@/schemas"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { images } from "@/constants/images"
import { login } from "@/services/AuthServices"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

    const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

const handleLogin = async (formData: LoginSchema) => {
    setIsLoading(true)
    try {
      const data = await login(formData.email, formData.password)
      // console.log("Logged in:", data)

      // FIX: use AsyncStorage instead of localStorage in React Native
      await AsyncStorage.setItem("token", data.data.token)

      Alert.alert("Success", "Logged in successfully!")
     router.push("/screens/main")
    } catch (err) {
      let errorMessage = "Login failed";

      Alert.alert("Error", errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push("/screens/biometric-login-screen");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
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
              Log In to Ares
            </Text>
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base text-center">
              Access your documents and continue organizing
            </Text>
          </View>

          {/* Form */}
     

<View className="space-y-4 gap-4 mb-6">
  {/* Email */}
  <View>
    <Text
      style={{ fontFamily: "Gilroy-SemiBold" }}
      className="text-gray-700 text-md font-semibold mb-2"
    >
      Email Address
    </Text>
    <Controller
      control={control}
      name="email"
      rules={{ required: "Email is required" }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Enter your email"
          style={{
            height: 45,
            fontSize: 16,
            lineHeight: 20,
            textAlignVertical: "center",
            fontFamily: "Gilroy-Regular",
            justifyContent: "center",
          }}
          className="border border-gray-200 rounded-full text-base px-4 bg-gray-50"
          keyboardType="email-address"
          autoCapitalize="none"
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      )}
    />
  </View>

  {/* Password */}
  <View>
    <Text
      style={{ fontFamily: "Gilroy-SemiBold" }}
      className="text-gray-700 text-md font-semibold mb-2"
    >
      Password
    </Text>
    <View className="relative">
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter your password"
            style={{
              fontFamily: "Gilroy-Regular",
              height: 45,
              fontSize: 16,
              lineHeight: 20,
              textAlignVertical: "center",
              justifyContent: "center",
            }}
            className="border border-gray-200 rounded-full px-4 pr-12 text-base bg-gray-50"
            secureTextEntry={!showPassword}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4"
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          color="#6b7280"
        />
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
            onPress={handleSubmit(handleLogin)}
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
            <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-[#003554] text-sm mx-4">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login */}
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

          {/* Sign Up Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text style={{ fontFamily: "Gilroy-Regular" }} className="text-gray-500 text-base">
                Don&#39;t have an account?{" "}
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
