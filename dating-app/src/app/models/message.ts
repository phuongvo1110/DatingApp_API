export interface Message {
    id: number
    senderUsername: string
    senderPhotoUrl: string
    recipientPhotoUrl: string
    recipientUsername: string
    content: string
    dateRead: Date
    messageSent: Date
    senderId: number
    recipientId: number
  }
  