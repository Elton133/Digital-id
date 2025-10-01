import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export function CameraOverlay({ lightingCondition, pulseAnim }: { lightingCondition: string; pulseAnim: any }) {
  return (
    <>
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: lightingCondition === "bad" ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 255, 0, 0.2)",
            opacity: pulseAnim,
          },
        ]}
      />
      <View style={styles.lightingFeedback}>
        <Text style={{ color: lightingCondition === "bad" ? "red" : "green" }}>
          {lightingCondition === "bad" ? "Poor lighting" : "Good lighting"}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject },
  lightingFeedback: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
});
