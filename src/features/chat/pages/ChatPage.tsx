
import { ChatHeader } from "../components/ChatHeader";
import { MessageList } from "../components/MessageList";
import { mockMessages } from "../mocks/mockMessages";
import { ChatInput } from "../components/ChatInput";
import "../../../styles/ChatPage.css";
import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../types/message.types";



export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockMessages
  );

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Esta es una respuesta simulada de NYRA 💜",
      createdAt: new Date().toISOString(),
    };
    
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      assistantMessage,
    ]);
    
  };

  const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
        container.scrollTop = container.scrollHeight;
    }
    }, [messages]);

  return (
    <section className="chat-page">
      <ChatHeader />

    <div
        className="chat-page-messages"
        ref={messagesContainerRef}
        >
        <MessageList messages={messages} />
    </div>

      <footer className="chat-page-footer">
        <ChatInput onSendMessage={handleSendMessage} />
      </footer>
    </section>
  );
}