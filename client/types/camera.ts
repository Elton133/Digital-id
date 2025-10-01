export interface CapturedImage {
  uri: string
  localPath: string
  side: "front" | "back"
  timestamp: number
}

export type CaptureStep = "front" | "back" | "complete"
export type LightingCondition = "good" | "poor" | "checking"
