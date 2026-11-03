
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../../../components/layout/PageHeader";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";
import { TypingIndicator } from "../components/TypingIndicator";
import { useChat } from "../hooks/useChat";
import { sendMessageToNyra } from "../../../services/chatApi";
import type { ChatMessage } from "../types/message.types";
import "../../../styles/ChatPage.css";
import { ActionConfirmationModal } from "../../../components/modals/ActionConfirmationModal";
import type { PendingAction } from "../../../services/chatApi";
import { confirmAction, cancelAction } from "../../../services/actionApi";

export function ChatPage() {
  // 1. Estado compartido de las conversaciones
  const {
    activeConversationId,
    messages,
    addMessage,
  } = useChat();

  // 2. Estado de la solicitud HTTP
  const [pendingConversationId, setPendingConversationId] =
    useState<string | null>(null);
  const [pendingAction, setPendingAction] =
  useState<PendingAction | null>(null);

  const [requestError, setRequestError] = useState<{
    conversationId: string;
    message: string;
  } | null>(null);

  // Evita solicitudes duplicadas antes de que React
  // actualice el estado visual.
  const pendingRef = useRef(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);


  const isCurrentChatLoading =
    pendingConversationId === activeConversationId &&
    pendingConversationId !== null;

  // 3. Scroll automático
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isCurrentChatLoading, requestError]);

  // 4. Enviar mensajes a Claude
  const handleSendMessage = async (content: string) => {
    const trimmedContent = content.trim();

    if (
      !trimmedContent ||
      pendingRef.current ||
      !activeConversationId
    ) {
      return;
    }

    // Conservamos el ID de la conversación original.
    const conversationId = activeConversationId;

    // Capturamos el historial ANTES de agregar
    // el mensaje nuevo para no enviarlo dos veces.
    const history = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    pendingRef.current = true;
    setPendingConversationId(conversationId);
    setRequestError(null);

    addMessage(conversationId, userMessage);

    try {
      const response = await sendMessageToNyra({
        message: trimmedContent,
        history,
      });
      console.log("[NYRA] Respuesta del backend:", response);
console.log("[NYRA] Acción pendiente:", response.pending_action);
      if (response.pending_action) {
        setPendingAction(response.pending_action);
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        createdAt: new Date().toISOString(),
      };

      // Se guarda en el chat original, aunque
      // el usuario haya seleccionado otro.
      addMessage(conversationId, assistantMessage);

    } catch (error) {
      console.error("Error al consultar NYRA:", error);

      setRequestError({
        conversationId,
        message:
          "No se pudo obtener una respuesta de NYRA. " +
          "Verificá que el backend esté funcionando.",
      });

    } finally {
      pendingRef.current = false;
      setPendingConversationId(null);
    }
  };
    const handleConfirmAction = async (actionId: string) => {
    await confirmAction(actionId);
    setPendingAction(null);
  };

  const handleCancelAction = async (actionId: string) => {
    await cancelAction(actionId);
    setPendingAction(null);
  };
  return (
    <section className="chat-page">
      <div className="chat-page-workspace">
       <PageHeader
        title="NYRA Chat"
        subtitle="Modelo no conectado"
        variant="chat"
      />

        <div
          className="chat-page-messages"
          ref={messagesContainerRef}
        >
          <MessageList messages={messages} />

          {isCurrentChatLoading && <TypingIndicator />}

          {requestError?.conversationId ===
            activeConversationId && (
            <p
              role="alert"
              className="chat-page-error"
            >
              {requestError.message}
            </p>
          )}
        </div>

        <footer className="chat-page-footer">
          <ChatInput onSendMessage={handleSendMessage} />
        </footer>
      </div>
          <ActionConfirmationModal
      action={pendingAction}
      onConfirm={handleConfirmAction}
      onCancel={handleCancelAction}
    />
    </section>
  );
}

