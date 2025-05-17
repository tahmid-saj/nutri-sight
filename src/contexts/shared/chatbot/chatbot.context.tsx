import { useState, createContext, FC } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponse } from "../../../utils/api-requests/chatbot.requests";

import { ChatbotContextType, ChatbotProviderProps } from "./chatbot.types"

// helper functions
const getChatbotResponseHelper = async (chatbotResponse: string, messageInput: string): Promise<string> => {
  if (validateChatBotMessageInput(messageInput)) return chatbotResponse

  const res = await getChatBotResponse(messageInput)
  return res as string
}

// initial state
export const ChatBotContext = createContext<ChatbotContextType>({
  chatbotResponse: "",
  getChatbotResponse: () => {}
})

// chatbot provider
export const ChatBotProvider: FC<ChatbotProviderProps> = ({ children }) => {
  const [chatbotResponse, setChatBotResponse] = useState<string>("")

  const getChatbotResponse = async (messageInput: string): Promise<void> => {
    const resChatBot = await getChatbotResponseHelper(chatbotResponse, messageInput)
    setChatBotResponse(resChatBot)
  }

  const value = { chatbotResponse, getChatbotResponse }

  return (
    <ChatBotContext.Provider value={ value }>
      { children }
    </ChatBotContext.Provider>
  )
}