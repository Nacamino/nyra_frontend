
import { useState } from "react";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
} from "lucide-react";

import type { Conversation } from "../types/conversation.types";

import "../../../styles/ConversationList.css";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: ConversationListProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="conversation-list">
      <div className="conversation-list-header">
        <button
          type="button"
          className="conversation-list-toggle"
          aria-expanded={isExpanded}
          aria-controls="nyra-conversation-items"
          onClick={() => setIsExpanded((previous) => !previous)}
        >
          <span>Conversaciones</span>

          {isExpanded ? (
            <ChevronUp size={17} aria-hidden="true" />
          ) : (
            <ChevronDown size={17} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className="conversation-list-new"
          onClick={onNewChat}
          aria-label="Crear nueva conversación"
          title="Nuevo chat"
        >
          <Plus size={18} strokeWidth={1.8} />
        </button>
      </div>

      {isExpanded && (
        <nav
          id="nyra-conversation-items"
          className="conversation-list-items"
          aria-label="Historial de conversaciones"
        >
          {conversations.map((conversation) => {
            const isActive =
              conversation.id === activeConversationId;

            return (
              <div
                key={conversation.id}
                className="conversation-list-row"
              >
                <button
                  type="button"
                  className={`conversation-list-item ${
                    isActive
                      ? "conversation-list-item--active"
                      : ""
                  }`}
                  onClick={() =>
                    onSelectConversation(conversation.id)
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  <MessageSquare
                    size={17}
                    aria-hidden="true"
                  />

                  <span className="conversation-list-name">
                    {conversation.title}
                  </span>
                </button>

                <button
                  type="button"
                  className="conversation-list-delete"
                  onClick={() =>
                    onDeleteConversation(conversation.id)
                  }
                  aria-label={`Eliminar conversación: ${conversation.title}`}
                  title="Eliminar conversación"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </nav>
      )}
    </section>
  );
}
