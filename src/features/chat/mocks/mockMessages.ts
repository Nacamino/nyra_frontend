
import type { ChatMessage } from "../types/message.types";

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-001",
    role: "user",
    content: "Hola NYRA, ¿cómo estás?",
    createdAt: "2026-10-18T18:00:00",
  },
  {
    id: "msg-002",
    role: "assistant",
    content: "¡Hola! Estoy lista para ayudarte. ¿Qué te gustaría hacer?",
    createdAt: "2026-10-18T18:00:01",
  },
  {
    id: "msg-003",
    role: "user",
    content: "¿Podés revisar mis archivos PDF?",
    createdAt: "2026-10-18T18:01:00",
  },
  {
    id: "msg-004",
    role: "assistant",
    content:
      "Todavía estamos en modo demostración. Pronto podré consultar tus archivos autorizados.",
    createdAt: "2026-10-18T18:01:01",
  },
];
