import { ChatroomsContainer } from "./chat-rooms.styles"
import { Divider } from "@mui/material"
import CreateChatroom from "../../../components/signed-out/chat-rooms/create-chat-room/create-chat-room.component"
import JoinChatroom from "../../../components/signed-out/chat-rooms/join-chat-room/join-chat-room.component"
import { useChatroomsContext } from "../../../contexts/signed-out/chat-rooms/chat-rooms.context"
import ChatroomsList from "../../../components/signed-out/chat-rooms/chat-rooms-list/chat-rooms-list.component"

const ChatroomsPage = () => {
  const { chatrooms } = useChatroomsContext()

  return (
    <div>
      <ChatroomsContainer>
        <CreateChatroom></CreateChatroom>
        <JoinChatroom></JoinChatroom>

        <Divider/>

        {
          chatrooms !== undefined && chatrooms.length !== 0 && <ChatroomsList/>
        }
      </ChatroomsContainer>
    </div>
  )
}

export default ChatroomsPage