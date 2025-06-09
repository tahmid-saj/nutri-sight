import { Typography } from "@mui/material"
import { LeaveChatRoomContainer } from "./leave-chat-room.styles.tsx"
import React, { useState } from "react"

import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx";
import Button from "../../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts"
import { useChatroomsContext } from "../../../../../contexts/signed-in/chat-rooms/chat-rooms.context.tsx"
import { ChatroomMessages } from "../../../../../contexts/signed-in/chat-rooms/chat-rooms.types.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const LeaveChatroom = ({ chatroom }: { chatroom: ChatroomMessages }) => {
  const { leaveChatroom } = useChatroomsContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // leave chatroom
    leaveChatroom(chatroom.chatroomId, chatroom.chatroomName)
  }

  return (
    <LeaveChatRoomContainer>
      <SimplePaper styles={{ padding: "1rem", textAlign: "center", backgroundColor: paperStyles.backgroundColor }}>
        <Typography
          paragraph
          style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#ffffff" }}
        >
          ID: {chatroom.chatroomId}
        </Typography>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" color="error">
              Leave
            </Button>
          </div>
        </form>
      </SimplePaper>
    </LeaveChatRoomContainer>
  );
}

export default LeaveChatroom