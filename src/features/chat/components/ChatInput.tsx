
import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

import "../../../styles/ChatInput.css";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="chat-input-container">
        <textarea
          className="chat-input-textarea"
          placeholder="Escribí un mensaje a NYRA..."
          aria-label="Mensaje para NYRA"
          rows={2}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="chat-input-actions">
          <span className="chat-input-hint">
            Enter para enviar · Shift + Enter para nueva línea
          </span>

          <button
            className="chat-input-send"
            type="submit"
            disabled={!message.trim()}
            aria-label="Enviar mensaje"
          >
            <ArrowUp size={19} strokeWidth={2} />
          </button>
        </div>
      </div>
    </form>
  );
}
