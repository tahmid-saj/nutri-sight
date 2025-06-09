import { Typography } from "@mui/material"
import { JoinChatroomContainer } from "./join-chat-room.styles.tsx"
import React, { useContext, useState } from "react"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { useChatroomsContext } from "../../../../contexts/signed-in/chat-rooms/chat-rooms.context.tsx"

const initialFormFields = {
  chatroomId: "",
  chatroomName: ""
}

const defaultFormFields = {
  chatroomId: "",
  chatroomName: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const JoinChatroom = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { joinExistingChatroom } = useChatroomsContext()
  
  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.chatroomId === "" || formFields.chatroomName === "") {
      return
    }

    // join chatroom
    joinExistingChatroom(formFields.chatroomId, formFields.chatroomName)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <JoinChatroomContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Join a chatroom
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Chatroom ID"
            type="text"
            required
            onChange={handleChange}
            name="chatroomId"
            value={formFields.chatroomId}
          />
          
          <FormInput
            label="Chatroom Name"
            type="text"
            required
            onChange={handleChange}
            name="chatroomName"
            value={formFields.chatroomName}/>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Join</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </JoinChatroomContainer>
  );
}

export default JoinChatroom