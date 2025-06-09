import "./peer-message.styles"
import { PeerMessageContainer, MessageContainer } from "./peer-message.styles"
import SimplePaper from "../../../../shared/mui/paper/paper.component"
import { Typography } from "@mui/material"
import FunctionsIcon from '@mui/icons-material/Functions';
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants"
import { ChatroomMessage } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.types";

const paperStyles = {
  backgroundColor: "#333333",
  margin: "0.75% 10% 0.75% 2%",
  position: "relative"
}

const SigmaMessage = ({ peerMessage }: { peerMessage: ChatroomMessage }) => {
  return (
    <PeerMessageContainer>
      <SimplePaper styles={ paperStyles }>
        <FunctionsIcon sx={{ backgroundColor: COLOR_CODES.general["6"], borderRadius: "2rem",
          margin: "0.25% 1% 15px 0%" }}/>
        <MessageContainer>
          <Typography sx={{ color: COLOR_CODES.general["4"] }}>{ peerMessage.message }</Typography>
        </MessageContainer>
      </SimplePaper>
    </PeerMessageContainer>
  )
}

export default SigmaMessage