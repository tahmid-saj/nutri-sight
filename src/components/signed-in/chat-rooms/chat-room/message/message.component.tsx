import "./message.styles"
import { MessageContainer } from "./message.styles"
import PeerMessage from "../peer-message/peer-message.component"
import UserMessage from "../user-message/user-message.component"
import { ChatroomMessage } from "../../../../../contexts/signed-in/chat-rooms/chat-rooms.types"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../../../store/shared/user/user.selector"


const MessageCoupled = ({ message }: { message: ChatroomMessage }) => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <MessageContainer>
      { currentUser?.email === message.userId && <UserMessage userMessage={ message }></UserMessage> }
      { currentUser?.email !== message.userId && <PeerMessage peerMessage={ message }></PeerMessage> }
    </MessageContainer>
  )
}

export default MessageCoupled