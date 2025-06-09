import { Typography } from "@mui/material"
import { CreateChatRoomContainer } from "./create-chat-room.styles.tsx"
import React, { useState } from "react"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { useChatroomsContext } from "../../../../contexts/signed-out/chat-rooms/chat-rooms.context.tsx"

const initialFormFields = {
  userName: "John",
  chatroomName: "Running"
}

const defaultFormFields = {
  userName: "",
  chatroomName: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const CreateAlert = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { createChatroom } = useChatroomsContext()
  
  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.userName === "" || formFields.chatroomName === "") {
      return
    }

    // create chatroom
    createChatroom(formFields.userName, formFields.chatroomName)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <CreateChatRoomContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Create a chatroom
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            type="text"
            required
            onChange={handleChange}
            name="userName"
            value={formFields.userName}
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
                  <Button type="submit">Create</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </CreateChatRoomContainer>
  );
}

export default CreateAlert