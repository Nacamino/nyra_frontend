
import { ChatHeader } from "../components/ChatHeader";
import { MessageList } from "../components/MessageList";
import { mockMessages } from "../mocks/mockMessages";
import { ChatInput } from "../components/ChatInput";
import { TypingIndicator } from "../components/TypingIndicator";
import type { Conversation } from "../types/conversation.types";
import "../../../styles/ChatPage.css";
import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../types/message.types";
import { useChat } from "../hooks/useChat";



export function ChatPage() {
  // 1. Estado compartido de las conversaciones
  const {
  activeConversationId,
  messages,
  createConversation,
  addMessage,
} = useChat();

  // 2. Estado temporal de la interfaz
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 3. Scroll automático
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  // 4. Limpiar temporizadores al salir de Chat
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 5. Crear conversación
  const handleNewChat = () => {
    if (isLoading) return;

    createConversation();
  };

  // 6. Seleccionar conversación
  // 7. Enviar mensaje
  const handleSendMessage = (content: string) => {
    if (isLoading || !activeConversationId) return;

    // Guardamos el ID del chat al que pertenece
    // esta solicitud.
    const conversationId = activeConversationId;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    addMessage(conversationId, userMessage);
    setIsLoading(true);

    // Respuesta simulada de NYRA
    timeoutRef.current = setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Esta es una respuesta simulada de NYRA 💜",
        createdAt: new Date().toISOString(),
      };

      addMessage(conversationId, assistantMessage);
      setIsLoading(false);
      timeoutRef.current = null;
    }, 1500);
  };

  // 8. Renderizado
  
return (
  <section className="chat-page">
    <div className="chat-page-workspace">
      <ChatHeader
      />

      <div
        className="chat-page-messages"
        ref={messagesContainerRef}
      >
        <MessageList messages={messages} />

        {isLoading && <TypingIndicator />}
      </div>

      <footer className="chat-page-footer">
        <ChatInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  </section>
);
}