import { useChatroomsContext } from "../../../../contexts/signed-out/chat-rooms/chat-rooms.context";
import ChatIcon from "@mui/icons-material/Chat";
import ItemTabs from "../../../shared/mui/chat-tabs/chat-tabs.component";
import ChatMessages from "../chat-room/chat-messages.component";

const ChatroomsList = () => {
  const { chatrooms, chatroomMessages } = useChatroomsContext();

  if (!chatrooms || chatrooms.length === 0) return null;

  const tabList = chatrooms.map((chatroom) => ({
    value: chatroom.chatroomId,
    label: chatroom.chatroomName,
    icon: <ChatIcon />,
  }));

  const panelList = chatroomMessages.map((chatroom) => ({
    value: chatroom.chatroomId,
    children: <ChatMessages chatroom={ chatroom }/>,
  }));

  return <ItemTabs tabList={tabList} panelList={panelList} />;
};

export default ChatroomsList;




// import { useChatroomsContext } from "../../../../contexts/signed-out/chat-rooms/chat-rooms.context"
// import ChatIcon from '@mui/icons-material/Chat';
// import ItemTabs from "../../../shared/mui/tabs/tabs.component"
// import Chatroom from "./chat-room/chat-room.component";

// const ChatroomsList = () => {
//   const { chatrooms, chatroomMessages } = useChatroomsContext()

//   let tabList: any[] = []
//   let panelList: any[] = []

//   if (chatrooms && chatrooms.length !== 0) {
//     tabList = chatrooms.map((chatroom) => {
//       return {
//         value: chatroom.chatroomId,
//         icon: <ChatIcon/>,
//         label: chatroom.chatroomName
//       }
//     })
//   }

//   if (chatroomMessages && chatroomMessages.length !== 0) {
//     panelList = chatroomMessages.map((chatroom) => {
//       return {
//         value: chatroom.chatroomId,
//         children: <Chatroom/>
//       }
//     })
//   }

//   if (tabList.length === 0) return null

//   return (
//     <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
//   )
// }

// export default ChatroomsList

