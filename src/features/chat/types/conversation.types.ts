
import type { ChatMessage } from "./message.types";

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}
