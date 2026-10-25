
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import type { Trace } from "../types/trace.types";
import { TraceDetails } from "./TraceDetails";

import "../../../styles/TraceDetailsModal.css";

interface TraceDetailsModalProps {
  trace: Trace | null;
  onClose: () => void;
}

export function TraceDetailsModal({
  trace,
  onClose,
}: TraceDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (trace && !dialog.open) {
      dialog.showModal();
    } else if (!trace && dialog.open) {
      dialog.close();
    }
  }, [trace]);

  return (
    <dialog
      ref={dialogRef}
      className="trace-modal"
      onClose={onClose}
    >
      <div className="trace-modal-header">
        <h2>Detalle de ejecución</h2>

        <button
          type="button"
          className="trace-modal-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar detalle"
        >
          <X size={20} />
        </button>
      </div>

      <div className="trace-modal-body">
        <TraceDetails trace={trace} />
      </div>
    </dialog>
  );
}
