import { ReactNode } from "react";

export type ChatroomsContextType = {
  userInfo: ChatroomUserInfo | undefined,
  chatrooms: Chatroom[],
  chatroomMessages: ChatroomMessages[]

  createChatroom: (userName: string, chatroomName: string) => void,
  joinExistingChatroom: (userName: string, chatroomId: string, chatroomName: string) => void,
  leaveChatroom: (chatroomId: string, chatroomName: string) => void,

  sendChatroomMessage: (chatroomId: string, message: string, chatroomName: string) => void
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
  chatroomName: string,
  messages: ChatroomMessage[]
}

export type ChatroomMessage = {
  userId: string,
  userName: string,
  message: string,
  time: string | Date
}