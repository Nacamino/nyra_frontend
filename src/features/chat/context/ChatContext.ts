
import { createContext } from "react";

import type { Conversation } from "../types/conversation.types";
import type { ChatMessage } from "../types/message.types";

export interface ChatContextValue {
  deleteConversation: (id: string) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];

  createConversation: () => void;
  selectConversation: (id: string) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
}

export const ChatContext = createContext<ChatContextValue | null>(
  null
);
