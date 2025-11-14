export interface FolderItem {
  id: string
  name: string
  type: "document" | "image" | "certificate"
  dateAdded: string
  tag?: "verified" | "needs-update"
}

export interface FolderDetailsProps {
  folderName: string
  createdDate: string
  lastUpdated: string
  items: FolderItem[]
}

export type Card = {
  front: string
  back: string
  timestamp: number
}