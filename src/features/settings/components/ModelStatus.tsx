import { mockModelStatus } from "../mocks/mockModelStatus";
import type { ConnectionStatus } from "../types/modelStatus.types";

const connectionLabels: Record<ConnectionStatus, string> = {
    connected: "Conectado",
    disconnected: "Desconectado",
    unknown: "Sin verificar",
};

export function ModelStatus() {
    const { model, connection } = mockModelStatus;

    return (
        <div className="model-status">
            <div className="model-status__info">
                <span className="model-status__name">
                {model ?? "Modelo no disponible"}
                </span>

                <span className="model-status__description">
                Información pendiente de integración con el backend
                </span>
            </div>

            <div className="model-status__connection">
                <span
                className={`model-status__indicator model-status__indicator--${connection}`}
                aria-hidden="true"
                />

                <span>{connectionLabels[connection]}</span>
            </div>
        </div>
    );
}
