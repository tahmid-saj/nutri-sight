import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Chatroom, ChatroomMessage, ChatroomMessages, ChatroomsContextType, ChatroomsProviderProps, ChatroomUserInfo } from "./chat-rooms.types";
import { v4 as uuid } from "uuid";
import { CHATROOMS_WS_ACTIONS } from "../../../utils/constants/chat-rooms.constants"

// helpers
const updateChatroomMessagesHelper = (chatroomMessages: ChatroomMessages[], chatroomMessage: any) => {
  const chatroomId = chatroomMessage.chatroomId;

  return chatroomMessages.map((chatroom) => {
    if (chatroom.chatroomId === chatroomId) {
      return {
        ...chatroom,
        messages: [
          ...chatroom.messages,
          {
            userId: chatroomMessage.userId,
            userName: chatroomMessage.userName,
            message: chatroomMessage.message,
            time: Date.now().toString()
          }
        ]
      };
    }
    return chatroom;
  });
};


const createChatroomHelper = (chatrooms: Chatroom[], chatroomName: string, chatroomId: string) => {
  return [
    ...chatrooms,
    {
      chatroomId,
      chatroomName,
      countMembers: 0,
      members: []
    }
  ];
};


const joinChatroomHelper = (chatrooms: Chatroom[], userInfo: ChatroomUserInfo, chatroomId: string) => {
  return chatrooms.map((chatroom) => {
    if (chatroom.chatroomId === chatroomId) {
      return {
        ...chatroom,
        countMembers: chatroom.countMembers + 1,
        members: [...chatroom.members, userInfo.name]
      };
    }
    return chatroom;
  });
};


const leaveChatroomHelper = (chatrooms: Chatroom[], chatroomId: string) => {
  return chatrooms.filter((chatroom) => chatroom.chatroomId !== chatroomId)
}

const sendChatroomMessageHelper = (chatroomMessages: ChatroomMessages[], chatroomId: string, messageInfo: ChatroomMessage) => {
  return chatroomMessages.map((chatroom) => {
    if (chatroom.chatroomId === chatroomId) {
      return {
        ...chatroom,
        messages: [...chatroom.messages, messageInfo]
      };
    }
    return chatroom;
  });
};


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

  const createChatroom = (userName: string, chatroomName: string) => {
    const chatroomId = uuid()
    
    // create user info if it doesn't already exist
    if (!userInfo) {
      setUserInfo({
        userId: uuid(),
        name: userName
      })
    }

    console.log(chatrooms)

    const newChatrooms = createChatroomHelper(chatrooms, chatroomName, chatroomId)
    setChatrooms(newChatrooms)
  }

  const joinChatroom = (userName: string, chatroomId: string, chatroomName: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      // create user info if it doesn't already exist
      if (!userInfo) {
        setUserInfo({
          userId: uuid(),
          name: userName
        })
      }
  
      const updatedChatrooms = joinChatroomHelper(chatrooms, userInfo!, chatroomId)
      setChatrooms(updatedChatrooms)

      ws.current.send(JSON.stringify({
        action: CHATROOMS_WS_ACTIONS.subscribe,
        userId: userInfo?.userId,
        name: userInfo?.name,
        chatroomId,
        chatroomName
      }))
    } else {
      console.log("Websocket is not open");
    }
  }

  const leaveChatroom = (chatroomId: string, chatroomName: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const updatedChatrooms = leaveChatroomHelper(chatrooms, chatroomId)
      setChatrooms(updatedChatrooms)

      ws.current.send(JSON.stringify({
        action: CHATROOMS_WS_ACTIONS.unsubscribe,
        userId: userInfo?.userId,
        name: userInfo?.name,
        chatroomId,
        chatroomName
      }))

      ws.current.close()
    } else {
      console.log("Websocket is not open");
    }
  }

  const sendChatroomMessage = (chatroomId: string, message: string, chatroomName: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const messageInfo: ChatroomMessage = {
        userId: userInfo?.userId!,
        userName: userInfo?.name!,
        message: message,
        time: Date.now().toString()
      }
      
      const updatedChatroomMessages = sendChatroomMessageHelper(chatroomMessages, chatroomId, messageInfo)
      setChatroomMessages(updatedChatroomMessages)

      ws.current.send(JSON.stringify({
        action: CHATROOMS_WS_ACTIONS.sendMessage,
        userId: userInfo?.userId,
        name: userInfo?.name,
        chatroomId,
        chatroomName,
        message
      }))
    } else {
      console.log("Websocket is not open");
    }
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