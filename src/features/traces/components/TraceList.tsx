
import {
  CheckCircle2,
  CircleX,
  LoaderCircle,
} from "lucide-react";

import type { Trace, TraceStatus } from "../types/trace.types";

import "../../../styles/TraceList.css"

interface TraceListProps {
  traces: Trace[];
  selectedTraceId: string | null;
  onSelectTrace: (id: string) => void;
}

const statusLabels: Record<TraceStatus, string> = {
  running: "En ejecución",
  completed: "Completada",
  failed: "Fallida",
};

export function TraceList({
  traces,
  selectedTraceId,
  onSelectTrace,
}: TraceListProps) {
  return (
    <section className="trace-list">
      <div className="trace-list-header">
        <h2>Ejecuciones</h2>
        <span>{traces.length} registros</span>
      </div>

      <div className="trace-list-items">
        {traces.map((trace) => {
          const isSelected = trace.id === selectedTraceId;

          const StatusIcon =
            trace.status === "completed"
              ? CheckCircle2
              : trace.status === "failed"
                ? CircleX
                : LoaderCircle;

          return (
            <button
              key={trace.id}
              type="button"
              className={`trace-list-item ${
                isSelected ? "trace-list-item--selected" : ""
              }`}
              onClick={() => onSelectTrace(trace.id)}
              aria-pressed={isSelected}
            >
              <div className="trace-list-item-heading">
                <StatusIcon
                  size={19}
                  className={`trace-list-status-icon trace-list-status-icon--${trace.status}`}
                  aria-hidden="true"
                />

                <div className="trace-list-item-info">
                  <span className="trace-list-item-title">
                    {trace.title}
                  </span>

                  <span className="trace-list-item-id">
                    {trace.id}
                  </span>
                </div>
              </div>

              <div className="trace-list-item-footer">
                <span
                  className={`trace-list-status trace-list-status--${trace.status}`}
                >
                  {statusLabels[trace.status]}
                </span>

                <span className="trace-list-duration">
                  {trace.durationMs !== undefined
                    ? `${trace.durationMs.toLocaleString("es-AR")} ms`
                    : "En curso"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
