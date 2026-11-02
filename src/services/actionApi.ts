
import { apiConfig } from "../config/api.config";

export interface ActionResult {
  status: string;
  filename?: string;
}

async function postAction(
  endpoint: string,
  actionId: string
): Promise<ActionResult> {
  const response = await fetch(
    `${apiConfig.baseUrl}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action_id: actionId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `No se pudo procesar la acción: HTTP ${response.status}`
    );
  }

  return (await response.json()) as ActionResult;
}

export function confirmAction(
  actionId: string
): Promise<ActionResult> {
  return postAction(
    apiConfig.endpoints.actions.confirm,
    actionId
  );
}

export function cancelAction(
  actionId: string
): Promise<ActionResult> {
  return postAction(
    apiConfig.endpoints.actions.cancel,
    actionId
  );
}
