import { apiConfig } from "../config/api.config";

export interface ChatApiMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatApiRequest {
  message: string;
  history: ChatApiMessage[];
}

export interface PendingAction {
  action_id: string;
  action: "open_file" | "create_note";
  filename: string;
  scope: string;
  requires_confirmation: boolean;
  content?: string | null;
}

export interface ChatApiResponse {
  reply: string;
  model: string;
  pending_action: PendingAction | null;
}

export async function sendMessageToNyra(
  request: ChatApiRequest
): Promise<ChatApiResponse> {
  const response = await fetch(
    `${apiConfig.baseUrl}${apiConfig.endpoints.chat}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error(
      `NYRA Backend respondió con HTTP ${response.status}`
    );
  }

  return (await response.json()) as ChatApiResponse;
}