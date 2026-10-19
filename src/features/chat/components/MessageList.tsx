
import type { ChatMessage } from "../types/message.types";
import { MessageBubble } from "./MessageBubble";
import "../../../styles/MessageList.css";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>Tu conversación con NYRA comienza aquí.</p>
      </div>
    );
  }

  return (
    <div className="message-list" role="log" aria-label="Mensajes del chat">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}
