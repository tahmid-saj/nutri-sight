
// chatbot types

import { ReactNode } from "react";

export interface ChatbotContextType {
  chatbotResponse: string;

  getChatbotResponse: (messageInput: string) => void;
}

export interface ChatbotProviderProps {
  children: ReactNode;
}