import { Chatroom } from "../../contexts/signed-out/chat-rooms/chat-rooms.types";

export const validateCreateChatroom = (chatrooms: Chatroom[], chatroomId: string) => {
  // can't create a chatroom that the user is already in

  return chatrooms.find((chatroom) => chatroom.chatroomId === chatroomId)
}

export const validateJoinChatroom = (chatrooms: Chatroom[], chatroomId: string) => {
  // can't join a chatroom that the user is already in

  return chatrooms.find((chatroom) => chatroom.chatroomId === chatroomId)
}