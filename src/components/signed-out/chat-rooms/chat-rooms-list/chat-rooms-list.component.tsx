import { useChatroomsContext } from "../../../../contexts/signed-out/chat-rooms/chat-rooms.context"
import ChatIcon from '@mui/icons-material/Chat';
import ItemTabs from "../../../shared/mui/tabs/tabs.component"
import Chatroom from "./chat-room/chat-room.component";

const ChatroomsList = () => {
  const { chatrooms, chatroomMessages } = useChatroomsContext()

  let tabList: any[] = []
  let panelList: any[] = []

  if (chatrooms && chatrooms.length !== 0) {
    tabList = chatrooms.map((chatroom) => {
      return {
        value: "chatroom",
        icon: <ChatIcon/>,
        label: chatroom.chatroomName
      }
    })

    panelList = chatroomMessages.map((chatroom) => {
      return {
        value: "chatroom-messages",
        children: <Chatroom/>
      }
    })
  }

  if (tabList.length === 0 || panelList.length === 0) return null

  return (
    <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
  )
}

export default ChatroomsList