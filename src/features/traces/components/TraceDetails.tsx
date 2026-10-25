
import { CheckCircle2, CircleX, LoaderCircle, Clock3 } from "lucide-react";

import type { Trace } from "../types/trace.types";
import "../../../styles/TraceDetails.css";

interface TraceDetailsProps {
  trace: Trace | null;
}

export function TraceDetails({ trace }: TraceDetailsProps) {
  if (!trace) {
    return (
      <section className="trace-details trace-details--empty">
        <p>Seleccioná una ejecución para ver sus detalles.</p>
      </section>
    );
  }

  const statusLabel = {
    running: "En ejecución",
    completed: "Completada",
    failed: "Fallida",
  }[trace.status];

  return (
    <section className="trace-details">
      <div className="trace-details-header">
        <div>
          <h2>{trace.title}</h2>
          <span className={`trace-details-status trace-details-status--${trace.status}`}>
            {statusLabel}
          </span>
        </div>

        <div className="trace-details-duration">
          <Clock3 size={16} />
          <span>
            {trace.durationMs !== undefined
              ? `${trace.durationMs.toLocaleString("es-AR")} ms`
              : "En curso"}
          </span>
        </div>
      </div>

      <h3 className="trace-details-subtitle">Eventos de ejecución</h3>

      <ol className="trace-details-events">
        {trace.events.map((event) => {
          const StatusIcon =
            event.status === "completed"
              ? CheckCircle2
              : event.status === "failed"
                ? CircleX
                : LoaderCircle;

          return (
            <li key={event.id} className="trace-details-event">
              <StatusIcon
                size={19}
                className={`trace-details-event-icon trace-details-event-icon--${event.status}`}
                aria-hidden="true"
              />

              <div className="trace-details-event-body">
                <strong>{event.name}</strong>

                {event.details && <p>{event.details}</p>}

                <small>
                  {event.durationMs !== undefined
                    ? `${event.durationMs.toLocaleString("es-AR")} ms`
                    : "Sin duración registrada"}
                </small>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
