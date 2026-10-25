
import { useState } from "react";
import type { ReactNode } from "react";

import { ChatContext } from "../../features/chat/context/ChatContext";

import type { Conversation } from "../../features/chat/types/conversation.types";
import type { ChatMessage } from "../../features/chat/types/message.types";

import { mockMessages } from "../../features/chat/mocks/mockMessages";

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "chat-001",
      title: "Mi primera conversación",
      messages: mockMessages,
    },
  ]);

  const [activeConversationId, setActiveConversationId] =
    useState<string | null>("chat-001");

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  const messages = activeConversation?.messages ?? [];

  const createConversation = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: "Nueva conversación",
      messages: [],
    };

    setConversations((previous) => [
      ...previous,
      newConversation,
    ]);

    setActiveConversationId(newConversation.id);
  };

  const selectConversation = (id: string) => {
    const exists = conversations.some(
      (conversation) => conversation.id === id
    );

    if (!exists) return;

    setActiveConversationId(id);
  };

  
const addMessage = (
  conversationId: string,
  message: ChatMessage
) => {
  setConversations((previous) =>
    previous.map((conversation) => {
      if (conversation.id !== conversationId) {
        return conversation;
      }

      const isFirstMessage =
        conversation.messages.length === 0 &&
        message.role === "user";

      return {
        ...conversation,
        title: isFirstMessage
          ? message.content.trim().slice(0, 40)
          : conversation.title,
        messages: [...conversation.messages, message],
      };
    })
  );
};


  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        messages,
        createConversation,
        selectConversation,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
