import { ReactNode } from "react";

export type ChatroomsContextType = {
  userInfo: ChatroomUserInfo | undefined,
  chatrooms: Chatroom[],
  chatroomMessages: ChatroomMessages[]

  createChatroom: (name: string) => void,
  joinChatroom: (chatroomId: string) => void,
  leaveChatroom: (chatroomId: string) => void,

  sendChatroomMessage: (message: string) => void
}

export interface ChatroomsProviderProps {
  children: ReactNode
}

export type ChatroomUserInfo = {
  userId: string,
  name: string
}

export type Chatroom = {
  chatroomId: string,
  chatroomName: string,
  countMembers: number,
  members: string[]
}

export type ChatroomMessages = {
  chatroomId: string,
  messages: ChatroomMessage[]
}

export type ChatroomMessage = {
  userId: string,
  message: string,
  time: string | Date
}