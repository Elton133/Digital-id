"use client"

import { images } from "@/constants/images"
import { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Platform } from "react-native"

export default function GhanaCard3D({frontImage, backImage, title, description}: any) {
  const [showFront, setShowFront] = useState(true)
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  // Gesture logic with smoother sensitivity
  const panGesture = Gesture.Pan().onChange((event) => {
    rotateX.value = withSpring(event.translationY / 15, {
      damping: 15,
      stiffness: 100,
    })
    rotateY.value = withSpring(-event.translationX / 15, {
      damping: 15,
      stiffness: 100,
    })
  })

  // Reset gesture when pan ends
  const resetGesture = Gesture.Pan().onEnd(() => {
    rotateX.value = withSpring(0)
    rotateY.value = withSpring(0)
  })

  const combinedGesture = Gesture.Simultaneous(panGesture, resetGesture)

  // Animation style with enhanced 3D effect
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      // Removed translateZ: not supported in React Native
    ],
  }))

  // Shadow animation that responds to rotation
const shadowStyle = useAnimatedStyle(() => {
  if (Platform.OS === "ios") {
    const shadowOffsetX = rotateY.value * 0.5;
    const shadowOffsetY = Math.abs(rotateX.value) * 0.3 + 8;
    const shadowOpacity = 0.15 + Math.abs(rotateX.value + rotateY.value) * 0.01;

    return {
      shadowOffset: {
        width: shadowOffsetX,
        height: shadowOffsetY,
      },
      shadowOpacity: Math.min(shadowOpacity, 0.3),
      shadowRadius: 12 + Math.abs(rotateX.value + rotateY.value) * 0.2,
    };
  } else {
    // Android fallback
    return {
      elevation: 8 + Math.abs(rotateX.value + rotateY.value) * 0.2,
    };
  }
});

  return (
    <View style={styles.container}>
      {/* Card container with proper z-index and spacing */}
      <View style={styles.cardContainer}>
        <GestureDetector gesture={combinedGesture}>
          <Animated.View style={[styles.cardWrapper, animatedStyle]}>
            {/* Card thickness layers */}
            <View style={styles.cardThickness} />
            <View style={styles.cardThickness2} />
            <View style={styles.cardThickness3} />

            {/* Main card with enhanced shadow */}
            <Animated.View style={[styles.card, shadowStyle]}>
              {/* Card image */}
              <Image source={showFront ? frontImage : backImage} style={styles.image} />

              {/* Persistent dividing line */}
              <View style={styles.divider} />

              {/* Card edge highlight for realism */}
              <View style={styles.cardHighlight} />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>

      <TouchableOpacity onPress={() => setShowFront(!showFront)} style={styles.button}>
        <Text style={styles.buttonText}>{showFront ? "Show Back" : "Show Front"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50, // Ensures card has breathing room
  },
  cardContainer: {
    // Ensures proper layering and prevents background interference
    zIndex: 10,
    elevation: 10,
    marginVertical: 40, // Extra space to prevent clipping
  },
  cardWrapper: {
    width: 300,
    height: 190,
    position: "relative",
  },
  // Thickness layers for 3D effect
  cardThickness: {
    position: "absolute",
    width: 300,
    height: 190,
    backgroundColor: "#e8e8e8",
    borderRadius: 12,
    top: 3,
    left: 3,
    zIndex: 1,
  },
  cardThickness2: {
    position: "absolute",
    width: 300,
    height: 190,
    backgroundColor: "#d5d5d5",
    borderRadius: 12,
    top: 2,
    left: 2,
    zIndex: 2,
  },
  cardThickness3: {
    position: "absolute",
    width: 300,
    height: 190,
    backgroundColor: "#c8c8c8",
    borderRadius: 12,
    top: 1,
    left: 1,
    zIndex: 3,
  },
  card: {
    width: 300,
    height: 190,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    zIndex: 4,
    // Enhanced shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backfaceVisibility: "hidden",
  },
  divider: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 5,
  },
  // Subtle highlight on card edge for realism
  cardHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#006b3f",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
