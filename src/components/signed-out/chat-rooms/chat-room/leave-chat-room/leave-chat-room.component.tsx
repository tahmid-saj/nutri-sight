import { Typography } from "@mui/material"
import { LeaveChatRoomContainer } from "./leave-chat-room.styles.tsx"
import React, { useState } from "react"

import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx";
import Button from "../../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts"
import { useChatroomsContext } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.context.tsx"
import { ChatroomMessages } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.types.ts";

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
      <SimplePaper styles={paperStyles}>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Leave</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </LeaveChatRoomContainer>
  );
}

export default LeaveChatroom