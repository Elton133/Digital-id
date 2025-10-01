import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export function BottomControls({
  step,
  onCapture,
  onRetake,
  onContinue,
}: {
  step: string;
  onCapture: () => void;
  onRetake: () => void;
  onContinue: () => void;
}) {
  return (
    <View style={styles.controls}>
      {step !== "done" ? (
        <>
          <TouchableOpacity onPress={onRetake} style={styles.button}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCapture} style={[styles.button, styles.captureButton]}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={onContinue} style={[styles.button, styles.continueButton]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  buttonText: { color: "#fff" },
  captureButton: { backgroundColor: "#007bff" },
  continueButton: { backgroundColor: "#28a745" },
});
