import { router } from "expo-router"
import LottieView from "lottie-react-native"
import { useState } from "react"
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function Index() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    router.push("/screens/auth/login-screen")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Logo / Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/animations/Fingerprint.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.messageContainer}>
          <Text style={styles.mainTitle}>Your Identity,{"\n"}Perfectly Secured</Text>
          <Text style={styles.subtitle}>
            Effortlessly store and manage your{"\n"}digital credentials. Start securing now!
          </Text>
        </View>

        {/* Progress Dots */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          className="rounded-full shadow-sm"
          onPress={handleGetStarted}
          disabled={isLoading}
          style={[styles.getStartedButton, isLoading && styles.buttonDisabled]}
          activeOpacity={0.8}
          aria-label="Get Started"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>

      
      </View>
      <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ from 🇬🇭</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  animationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: { paddingHorizontal: 24, paddingBottom: 90 },
  messageContainer: { alignItems: "center", marginBottom: 24 },
  mainTitle: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 24,
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Gilroy-Regular",
    color: "#6b7280",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  progressDot: {
    width: 6,
    height: 6,
    backgroundColor: "#d1d5db",
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: { backgroundColor: "#003554" },
  getStartedButton: {
    backgroundColor: "#003554",
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
    elevation: 3,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { fontFamily: "Gilroy-SemiBold", color: "#ffffff", fontSize: 16 },
  footer: { alignItems: "center", marginBottom: 24 },
  footerText: { fontFamily: "Gilroy-Regular", fontSize: 12, color: "#9ca3af" },
})
