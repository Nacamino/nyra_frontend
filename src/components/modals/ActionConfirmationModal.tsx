
import { useEffect, useRef, useState } from "react";
import { FileText, X,StickyNote } from "lucide-react";

import type { PendingAction } from "../../services/chatApi";

import "../../styles/ActionConfirmationModal.css";

interface ActionConfirmationModalProps {
  action: PendingAction | null;
  onConfirm: (actionId: string) => Promise<void>;
  onCancel: (actionId: string) => Promise<void>;
}

export function ActionConfirmationModal({
  action,
  onConfirm,
  onCancel,
}: ActionConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const processingRef = useRef(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCreateNote = action?.action === "create_note";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (action && !dialog.open) {
      dialog.showModal();
    }

    if (!action && dialog.open) {
      dialog.close();
    }

    setError(null);
  }, [action]);

  const handleAction = async (
    type: "confirm" | "cancel"
  ) => {
    if (!action || processingRef.current) return;

    processingRef.current = true;
    setIsProcessing(true);
    setError(null);

    try {
      if (type === "confirm") {
        await onConfirm(action.action_id);
      } else {
        await onCancel(action.action_id);
      }
    } catch (err) {
      console.error("Error al procesar la acción:", err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo procesar la solicitud."
      );
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="action-confirmation-modal"
      aria-labelledby="action-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        void handleAction("cancel");
      }}
    >
      {action && (
        <div className="action-confirmation-modal-content">
          <div className="action-confirmation-modal-header">
            <h2 id="action-modal-title">
              {isCreateNote
                ? "Confirmar creación de nota"
                : "Confirmar apertura de archivo"}
            </h2>

            <button
              type="button"
              className="action-confirmation-modal-close"
              onClick={() => void handleAction("cancel")}
              disabled={isProcessing}
              aria-label="Cancelar y cerrar"
            >
              <X size={19} />
            </button>
          </div>

          <div className="action-confirmation-modal-body">
            {isCreateNote
              ? <StickyNote size={32} />
              : <FileText size={32} />}

            <p>
              {isCreateNote
                ? "NYRA preparó esta nota. Revisá el contenido antes de guardarla:"
                : "NYRA solicita autorización para abrir este archivo:"}
            </p>

            <div className="action-confirmation-modal-file">
              <strong>{action.filename}</strong>

              <span>
                Ubicación:{" "}
                {action.scope === "downloads"
                  ? "Descargas"
                  : "NYRA Workspace"}
              </span>
            </div>

            {isCreateNote && (
              <div className="action-confirmation-modal-preview">
                <span className="action-confirmation-modal-preview-label">
                  Vista previa del contenido
                </span>

                <pre>{action.content ?? ""}</pre>
              </div>
            )}

            {error && (
              <p
                className="action-confirmation-modal-error"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <div className="action-confirmation-modal-footer">
            <button
              type="button"
              className="action-confirmation-modal-cancel"
              disabled={isProcessing}
              onClick={() => void handleAction("cancel")}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="action-confirmation-modal-confirm"
              disabled={isProcessing}
              onClick={() => void handleAction("confirm")}
            >
              {isProcessing
                ? "Procesando..."
                : isCreateNote
                  ? "Guardar nota"
                  : "Abrir archivo"}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}