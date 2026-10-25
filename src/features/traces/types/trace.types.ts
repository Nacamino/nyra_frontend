
export type TraceStatus =
  | "running"
  | "completed"
  | "failed";

export type TraceEventStatus =
  | "started"
  | "completed"
  | "failed";

export interface TraceEvent {
  id: string;
  name: string;
  status: TraceEventStatus;
  timestamp: string;
  durationMs?: number;
  details?: string;
}

export interface Trace {
  id: string;
  conversationId: string;
  title: string;
  status: TraceStatus;
  startedAt: string;
  durationMs?: number;
  events: TraceEvent[];
}
