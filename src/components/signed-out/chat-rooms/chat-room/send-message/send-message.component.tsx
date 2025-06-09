import { Fragment, useState } from "react"
import "./send-message.styles.scss"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useChatroomsContext } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.context";
import { ChatroomMessages } from "../../../../../contexts/signed-out/chat-rooms/chat-rooms.types";

type FormFields = {
  messageInput: string
}

const defaultFormFields = {
  messageInput: ""
}

const SendMessage = ({ chatroom }: { chatroom: ChatroomMessages }) => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { sendChatroomMessage } = useChatroomsContext()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendChatroomMessage(chatroom.chatroomId, formFields.messageInput, chatroom.chatroomName)

    resetFormFields()
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="send-message-container">
      <div className="send-message-form">
        <textarea placeholder="Enter your message" className="send-message-input" 
        name="messageInput" rows={ 5 } onChange={ handleChange } value={ formFields.messageInput }></textarea>
        <button className="send-message-btn" type="button" onClick={ handleSubmit } title="Send">
          <KeyboardDoubleArrowUpIcon fontSize="large" sx={{ color: "black" }}/>
        </button>
      </div>
    </div>
  )
}

export default SendMessage