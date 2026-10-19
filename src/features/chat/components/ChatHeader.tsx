import "../../../styles/ChatHeader.css";
import { BrainCircuit, Cpu, ChevronDown } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="chat-header-identity">
        <div className="chat-header-icon">
          <BrainCircuit size={26} strokeWidth={1.7} />
        </div>

        <div>
          <h1 className="chat-header-title">NYRA Chat</h1>
          <p className="chat-header-status">
            Modelo no conectado
          </p>
        </div>
      </div>

      <div className="chat-header-model">
        <Cpu size={18} strokeWidth={1.7} />
        <span>Modelo local</span>
        <ChevronDown size={16} />
      </div>
    </header>
  );
}