import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Chatroom, ChatroomMessage, ChatroomMessages, ChatroomsContextType, ChatroomsProviderProps, ChatroomUserInfo } from "./chat-rooms.types";
import { v4 as uuid } from "uuid";
import { CHATROOMS_WS_ACTIONS } from "../../../utils/constants/chat-rooms.constants"

// helpers
const updateChatroomMessagesHelper = (chatroomMessages: ChatroomMessages[], chatroomMessage: any) => {
  const chatroomId = chatroomMessage.chatroomId;

  console.log(chatroomMessages)

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


const createChatroomHelper = (chatrooms: Chatroom[], chatroomMessages: ChatroomMessages[],
    chatroomName: string, chatroomId: string): [Chatroom[], ChatroomMessages[]] => {
  return [
    [
      ...chatrooms,
      {
        chatroomId,
        chatroomName,
        countMembers: 0,
        members: []
      }
    ], [
      ...chatroomMessages,
      {
        chatroomId,
        chatroomName,
        messages: []
      }
    ]
  ]
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


const leaveChatroomHelper = (chatrooms: Chatroom[], chatroomMessages: ChatroomMessages[], 
    chatroomId: string): [Chatroom[], ChatroomMessages[]] => {
  const resChatrooms = chatrooms.filter((chatroom) => chatroom.chatroomId !== chatroomId)

  const resChatroomMessages = chatroomMessages.filter((chatroom) => chatroom.chatroomId !== chatroomId)

  return [resChatrooms, resChatroomMessages]
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
        setChatroomMessages(prev => updateChatroomMessagesHelper(prev, {
          userId: data.userId,
          userName: data.name,
          message: data.message,
          chatroomId: data.chatRoomId,
          time: Date.now().toString()
        }))
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

  const createChatroom = (userName: string, chatroomName: string): string | undefined => {
    const chatroomId = uuid()

    // create user info if it doesn't already exist
    let currentUserInfo = userInfo
    if (!userInfo) {
      currentUserInfo = {
        userId: uuid(),
        name: userName
      }
    }
    
    setUserInfo(currentUserInfo)
    console.log(chatrooms)

    const [newChatrooms, newChatroomMessages] = createChatroomHelper(chatrooms, chatroomMessages, chatroomName, chatroomId)
    setChatrooms(newChatrooms)
    setChatroomMessages(newChatroomMessages)

    console.log(newChatrooms)

    // join chatroom
    if (ws.current?.readyState === WebSocket.OPEN) {  
      const updatedChatrooms = joinChatroomHelper(newChatrooms, currentUserInfo!, chatroomId)
      setChatrooms(updatedChatrooms)

      ws.current.send(JSON.stringify({
        action: CHATROOMS_WS_ACTIONS.subscribe,
        userId: currentUserInfo?.userId,
        name: currentUserInfo?.name,
        chatroomId,
        chatroomName
      }))

      console.log(chatroomId, chatroomName)
      return chatroomId
    } else {
      console.log("Websocket is not open");
    }

    return undefined
  }

  // const joinChatroom = (userInfo: ChatroomUserInfo, chatroomId: string, chatroomName: string, chatrooms: Chatroom[]) => {
  //   if (ws.current?.readyState === WebSocket.OPEN) {  
  //     const updatedChatrooms = joinChatroomHelper(chatrooms, userInfo!, chatroomId)
  //     setChatrooms(updatedChatrooms)

  //     ws.current.send(JSON.stringify({
  //       action: CHATROOMS_WS_ACTIONS.subscribe,
  //       userId: userInfo.userId,
  //       name: userInfo.name,
  //       chatroomId,
  //       chatroomName
  //     }))

  //     console.log(chatroomId, chatroomName)
  //   } else {
  //     console.log("Websocket is not open");
  //   }
  // }

  const joinExistingChatroom = (userName: string, chatroomId: string, chatroomName: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {  
      // create user info if it doesn't already exist
      let currentUserInfo = userInfo
      if (!userInfo) {
        currentUserInfo = {
          userId: uuid(),
          name: userName
        }
      }
      
      setUserInfo(currentUserInfo)

      const [newChatrooms, newChatroomMessages] = createChatroomHelper(chatrooms, chatroomMessages, chatroomName, chatroomId)
      setChatrooms(newChatrooms)
      setChatroomMessages(newChatroomMessages)

      const updatedChatrooms = joinChatroomHelper(newChatrooms, currentUserInfo!, chatroomId)
      setChatrooms(updatedChatrooms)

      ws.current.send(JSON.stringify({
        action: CHATROOMS_WS_ACTIONS.subscribe,
        userId: currentUserInfo?.userId,
        name: currentUserInfo?.name,
        chatroomId,
        chatroomName
      }))

      console.log(chatroomId, chatroomName)
    } else {
      console.log("Websocket is not open");
    }
  }

  const leaveChatroom = (chatroomId: string, chatroomName: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const [updatedChatrooms, updatedChatroomMessages] = leaveChatroomHelper(chatrooms, chatroomMessages, chatroomId)
      setChatrooms(updatedChatrooms)
      setChatroomMessages(updatedChatroomMessages)

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
      
      // const updatedChatroomMessages = sendChatroomMessageHelper(chatroomMessages, chatroomId, messageInfo)
      // setChatroomMessages(updatedChatroomMessages)

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
      createChatroom, joinExistingChatroom, leaveChatroom, sendChatroomMessage }}>
      { children }
    </ChatroomsContext.Provider>
  )
}

export const useChatroomsContext = () => {
  const context = useContext(ChatroomsContext)
  if (!context) throw new Error("useChatroomsContext must be used within WebSocketProvider")
    return context
}