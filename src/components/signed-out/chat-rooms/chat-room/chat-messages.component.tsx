import "./chat-messages.styles"
import { ChatMessagesContainer } from "./chat-messages.styles"
import Message from "./message/message.component"
import SendMessage from "./send-message/send-message.component"
import { ChatroomMessages } from "../../../../contexts/signed-out/chat-rooms/chat-rooms.types"

const ChatMessages = ({ chatroom }: { chatroom: ChatroomMessages }) => {

  return (
    <ChatMessagesContainer>

      {
        chatroom.messages.map((message, index) => {
          return (
            <Message key={ index } message={ message }></Message>
          )
        })
      }
      
      <SendMessage chatroom={ chatroom }></SendMessage>
    </ChatMessagesContainer>
  )
}

export default ChatMessages