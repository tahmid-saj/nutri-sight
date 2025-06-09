import "./chat-messages.styles"
import { Fragment } from "react"
import { ChatMessagesContainer } from "./chat-messages.styles"
import Message from "./message/message.component"
import SendMessage from "./send-message/send-message.component"
import { ChatroomMessages } from "../../../../contexts/signed-in/chat-rooms/chat-rooms.types"
import LeaveChatroom from "./leave-chat-room/leave-chat-room.component"

const ChatMessages = ({ chatroom }: { chatroom: ChatroomMessages }) => {

  return (
    <Fragment>
      <LeaveChatroom chatroom={ chatroom }></LeaveChatroom>

      <ChatMessagesContainer>
        {
          chatroom.messages.map((message, index) => {
            return (
              <Message key={ index } message={ message }></Message>
            )
          })
        }
      </ChatMessagesContainer>

      <SendMessage chatroom={ chatroom }></SendMessage>
    </Fragment>
  )
}

export default ChatMessages