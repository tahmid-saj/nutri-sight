import { Fragment } from "react"
import "./user-message.styles"
import SimplePaper from "../../../../shared/mui/paper/paper.component"
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants"
import { ChatroomMessage } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.types"

const paperStyles = {
  backgroundColor: "#333333",
  margin: "0.75% 2% 0.75% 23%"
}

const UserMessage = ({ userMessage }: { userMessage: ChatroomMessage }) => {
  return (
    <Fragment>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ color: COLOR_CODES.general["6"] }}>{ userMessage.userName }</Typography>
        <Typography sx={{ color: COLOR_CODES.general["0"] }}>{ userMessage.message }</Typography>
      </SimplePaper>
    </Fragment>
  )
}

export default UserMessage