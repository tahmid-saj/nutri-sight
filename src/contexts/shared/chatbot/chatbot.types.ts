import { ReactNode } from "react";

// chatbot types

export interface ChatbotContextType {
  chatbotResponse: string;
  getChatbotResponse: (messageInput: string) => void;
}

export interface ChatbotProviderProps {
  children: ReactNode;
}