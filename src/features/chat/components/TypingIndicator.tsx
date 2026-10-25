
import { BrainCircuit, LoaderCircle } from "lucide-react";
import "../../../styles/TypingIndicator.css";

export function TypingIndicator() {
  return (
    <div className="typing-indicator" role="status">
      <div className="typing-indicator-avatar">
        <BrainCircuit size={18} />
      </div>

      <div className="typing-indicator-content">
        <LoaderCircle size={17} className="typing-indicator-spinner" />
        <span>NYRA está pensando...</span>
      </div>
    </div>
  );
}
