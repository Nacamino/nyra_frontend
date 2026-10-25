export type ConnectionStatus =
    | "connected"
    | "disconnected"
    | "unknown";

export type ModelStatusInfo = {
    model: string | null;
    connection: ConnectionStatus;
};
