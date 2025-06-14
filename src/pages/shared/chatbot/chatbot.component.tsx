import { useState, useContext, FormEvent, ChangeEvent } from "react"
import FormInput from "../../../components/shared/form-input/form-input.component.tsx"
import Button from "../../../components/shared/button/button.component.tsx"
import "./chatbot.styles.tsx"
import { ChatBotContainer, ChatBotInputMessage } from "./chatbot.styles.tsx"
import ChatBotResponse from "../../../components/shared/chatbot/chatbot-response/chatbot-response.component.tsx"
import { ChatBotContext } from "../../../contexts/shared/chatbot/chatbot.context.tsx"
import { Divider, Typography } from "@mui/material"
import { ButtonsContainer } from "../../../components/shared/button/button.styles.tsx"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.ts"

type FormFields = {
  messageInput: string
}

const defaultFormFields = {
  messageInput: ""
}

const ChatBot = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { getChatbotResponse, chatbotResponse } = useContext(ChatBotContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await getChatbotResponse(formFields.messageInput)
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <ChatBotContainer>
      <div className="container">
        <Typography sx={{ color: COLOR_CODES.general["6"] }} variant="h6">Ask the chatbot for some nutrition advice</Typography>
        <Typography sx={{ color: COLOR_CODES.general["7"] }} paragraph>Example: Can you give me some nutrition advice?</Typography>

        <ChatBotInputMessage onSubmit={ handleSubmit }>
          <FormInput label="Message chatbot" type="text" required onChange={ handleChange }
                    name="messageInput" value={ formFields.messageInput }/>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                  <Button type="submit">Send</Button>
                  <Button type="button" onClick={ resetFormFields }>Clear</Button>
                </div>
              </div>
            </div>

        </ChatBotInputMessage>
        {
          chatbotResponse !== "" && chatbotResponse !== undefined &&
          <ChatBotResponse></ChatBotResponse>
        }

        <Divider orientation="horizontal" flexItem/>
      </div>
    </ChatBotContainer>
  )
}

export default ChatBot