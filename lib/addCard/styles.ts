import { StyleSheet, Dimensions } from "react-native"

const { width: screenWidth } = Dimensions.get("window")

export const addCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  permissionSubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#000000",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  stepIndicator: {
    backgroundColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stepText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cardFrame: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.5,
    position: "relative",
  },
  cardOutline: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: -3,
    right: -3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  instructionsPanel: {
    backgroundColor: "#111827",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  lightingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  lightingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  lightingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  instructionSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
    marginBottom: 16,
  },
  tipsContainer: {
    gap: 8,
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    fontSize: 14,
    color: "#d1d5db",
    marginLeft: 8,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  retakeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  completeControls: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  retakeAllButton: {
    flex: 1,
    backgroundColor: "#374151",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  retakeAllText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export type AddCardStyles = typeof addCardStyles


