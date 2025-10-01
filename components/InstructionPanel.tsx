import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function InstructionPanel({ step, lightingCondition }: { step: string; lightingCondition: string }) {
  return (
    <View style={styles.instructions}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
        {step === "front" ? "Capture the front side" : step === "back" ? "Capture the back side" : "All done!"}
      </Text>
      {lightingCondition === "bad" && <Text style={{ color: "red" }}>Try moving to better lighting</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  instructions: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 12,
  },
});
