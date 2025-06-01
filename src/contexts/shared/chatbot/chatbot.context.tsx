import { useState, createContext, FC } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponseStream } from "../../../utils/api-requests/chatbot.requests";

import { ChatbotContextType, ChatbotProviderProps } from "./chatbot.types"

// initial state
export const ChatBotContext = createContext<ChatbotContextType>({
  chatbotResponse: "",
  getChatbotResponse: () => {}
})

// chatbot provider
export const ChatBotProvider: FC<ChatbotProviderProps> = ({ children }) => {
  const [chatbotResponse, setChatBotResponse] = useState<string>("")

  const getChatbotResponse = async (messageInput: string): Promise<void> => {
    if (validateChatBotMessageInput(messageInput)) return

    // reset response before new stream
    setChatBotResponse("")

    await getChatBotResponseStream(
      messageInput,
      (chunk: string) => {
        // append each chunk to the current state
        setChatBotResponse(prev => prev + chunk)
      },
      () => {
        console.log("Streaming completed")
      }
    )
  }

  const value = { chatbotResponse, getChatbotResponse }

  return (
    <ChatBotContext.Provider value={ value }>
      { children }
    </ChatBotContext.Provider>
  )
}