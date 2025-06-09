import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Chatroom, ChatroomMessages, ChatroomsContextType, ChatroomsProviderProps, ChatroomUserInfo } from "./chat-rooms.types";

// helpers
const updateChatroomMessagesHelper = (chatroomMessages: ChatroomMessages[], chatroomMessage: any) => {
  const chatroomId = chatroomMessage.chatroomId

  return chatroomMessages.map((chatroom) => {
    if (chatroom.chatroomId === chatroomId) {
      chatroom.messages.push({
        userId: chatroomMessage.userId,
        message: chatroomMessage.message,
        time: Date.now().toString()
      })
    }

    return chatroom
  })
}

export const ChatroomsContext = createContext<ChatroomsContextType | undefined>(undefined)

export const ChatroomsProvider: React.FC<ChatroomsProviderProps> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const [userInfo, setUserInfo] = useState<ChatroomUserInfo | undefined>(undefined)
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
  const [chatroomMessages, setChatroomMessages] = useState<ChatroomMessages[]>([])

  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_API_CHATROOMS_WS_URL!)

    ws.current.onopen = () => {
      console.log("Connected to websocket")
    }

    ws.current.onmessage = (event) => {
      try {
        console.log("Received: ", event.data)
        const data = JSON.parse(event.data)

        // update chatroomMessages
        const newChatroomMessages = updateChatroomMessagesHelper(chatroomMessages, data)
        setChatroomMessages(newChatroomMessages)
      } catch (err) {
        console.log("Failed to receive location update: ", err)
      }
    }

    ws.current.onclose = () => {
      console.log("Websocket closed")
    }

    ws.current.onerror = (error) => {
      console.error("Websocket error: ", error)
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const createChatroom = (name: string) => {

  }

  const joinChatroom = (chatroomId: string) => {

  }

  const leaveChatroom = (chatroomId: string) => {

  }

  const sendChatroomMessage = (message: string) => {

  }

  return (
    <ChatroomsContext.Provider value={{ userInfo, chatrooms, chatroomMessages,
      createChatroom, joinChatroom, leaveChatroom, sendChatroomMessage }}>
      { children }
    </ChatroomsContext.Provider>
  )
}

export const useChatroomsContext = () => {
  const context = useContext(ChatroomsContext)
  if (!context) throw new Error("useChatroomsContext must be used within WebSocketProvider")
    return context
}