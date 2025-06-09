import "./message.styles"
import { MessageContainer } from "./message.styles"
import PeerMessage from "../peer-message/peer-message.component"
import UserMessage from "../user-message/user-message.component"
import { ChatroomMessage } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.types"
import { useChatroomsContext } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.context"


const MessageCoupled = ({ message }: { message: ChatroomMessage }) => {
  const { userInfo } = useChatroomsContext()

  return (
    <MessageContainer>
      { userInfo?.userId === message.userId && <UserMessage userMessage={ message }></UserMessage> }
      { userInfo?.userId !== message.userId && <PeerMessage peerMessage={ message }></PeerMessage> }
    </MessageContainer>
  )
}

export default MessageCoupled