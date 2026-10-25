
import type { Trace } from "../types/trace.types";

export const mockTraces: Trace[] = [
  {
    id: "trace-001",
    conversationId: "chat-001",
    title: "Consultar archivos PDF",
    status: "completed",
    startedAt: "2026-10-25T17:30:00",
    durationMs: 1240,
    events: [
      {
        id: "event-001",
        name: "Solicitud recibida",
        status: "completed",
        timestamp: "2026-10-25T17:30:00",
        durationMs: 5,
      },
      {
        id: "event-002",
        name: "Modelo seleccionado",
        status: "completed",
        timestamp: "2026-10-25T17:30:00",
        durationMs: 15,
        details: "Proveedor: Ollama",
      },
      {
        id: "event-003",
        name: "Herramienta ejecutada",
        status: "completed",
        timestamp: "2026-10-25T17:30:01",
        durationMs: 80,
        details: "list_recent_files",
      },
      {
        id: "event-004",
        name: "Respuesta generada",
        status: "completed",
        timestamp: "2026-10-25T17:30:01",
        durationMs: 1140,
      },
    ],
  },
  {
    id: "trace-002",
    conversationId: "chat-001",
    title: "Consulta al modelo local",
    status: "completed",
    startedAt: "2026-10-25T17:35:00",
    durationMs: 850,
    events: [
      {
        id: "event-005",
        name: "Solicitud recibida",
        status: "completed",
        timestamp: "2026-10-25T17:35:00",
      },
      {
        id: "event-006",
        name: "Respuesta generada",
        status: "completed",
        timestamp: "2026-10-25T17:35:01",
        durationMs: 850,
      },
    ],
  },
  {
    id: "trace-003",
    conversationId: "chat-001",
    title: "Error al consultar archivos",
    status: "failed",
    startedAt: "2026-10-25T17:40:00",
    durationMs: 120,
    events: [
      {
        id: "event-007",
        name: "Solicitud recibida",
        status: "completed",
        timestamp: "2026-10-25T17:40:00",
      },
      {
        id: "event-008",
        name: "Acceso a archivos",
        status: "failed",
        timestamp: "2026-10-25T17:40:00",
        durationMs: 120,
        details: "Permiso denegado",
      },
    ],
  },
];
