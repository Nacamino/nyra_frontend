import { BrainCircuit, UserRound } from "lucide-react";
import "../../../styles/MessageBubble.css";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <article
      className={`message-bubble ${
        isUser ? "message-bubble--user" : "message-bubble--assistant"
      }`}
    >
      <div className="message-bubble-avatar" aria-hidden="true">
        {isUser ? (
          <UserRound size={18} />
        ) : (
          <BrainCircuit size={18} />
        )}
      </div>

      <div className="message-bubble-body">
        <p className="message-bubble-content">
          {content}
        </p>
      </div>
    </article>
  );
}
