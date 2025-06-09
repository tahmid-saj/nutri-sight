import { ChatroomMessage } from "../../contexts/signed-out/chat-rooms/chat-rooms.types"
import { errorOnAddRemoveChatroomUser, errorOnCreateChatroom, errorOnGetChatrooms, errorOnSendChatroomMessage } from "../errors/chat-rooms.errors"

// chatrooms api requests

// get chatrooms
export async function getChatrooms() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_CHATROOMS}${process.env.REACT_APP_API_CHATROOMS_GET_CHATROOMS}`)
    const resJSON = await response.json()

    return resJSON.chatrooms
  } catch (error) {
    errorOnGetChatrooms()
  }
}

// create chatroom
export async function createChatroom(chatroomId: string, chatroomName: string) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_CHATROOMS}${process.env.REACT_APP_API_CHATROOMS_CREATE_CHATROOM}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatroomId: chatroomId,
        chatroomName: chatroomName
      })
    })
    const resJSON = await response.json()

    return resJSON
  } catch (error) {
    errorOnCreateChatroom()
  }
}

// add / remove userId to chatroom
export async function addRemoveChatroomUser(operation: string, chatroomId: string, userId: string) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_CHATROOMS}${process.env.REACT_APP_API_CHATROOMS_ADD_REMOVE_CHATROOM_USER}/${chatroomId}?op=${operation}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId
      })
    })
    const resJSON = await response.json()

    return resJSON
  } catch (error) {
    errorOnAddRemoveChatroomUser()
  }
}

// user sends message to chatroom
export async function sendChatroomMessage(chatroomId: string, messageInfo: ChatroomMessage) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_CHATROOMS}${process.env.REACT_APP_API_CHATROOMS_USER_SEND_CHATROOM_MSG}/${chatroomId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageInfo)
    })
    const resJSON = await response.json()

    return resJSON
  } catch (error) {
    errorOnSendChatroomMessage()
  }
}