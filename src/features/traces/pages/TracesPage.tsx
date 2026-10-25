
import { useState } from "react";

import { TraceList } from "../components/TraceList";
import { TraceDetailsModal } from "../components/TraceDetailsModal";
import { mockTraces } from "../mocks/mockTraces";

import "../../../styles/TraceDetailsModal.css";

export function TracesPage() {
  const [selectedTraceId, setSelectedTraceId] =
    useState<string | null>(null);

  const selectedTrace =
    mockTraces.find(
      (trace) => trace.id === selectedTraceId
    ) ?? null;

  return (
    <section className="traces-page">
      <header className="traces-page__header">
        <h1>Trazas de ejecución</h1>
        <p>Seleccioná una ejecución para ver sus detalles.</p>
      </header>

      <div className="traces-page__workspace">
        <TraceList
          traces={mockTraces}
          selectedTraceId={selectedTraceId}
          onSelectTrace={setSelectedTraceId}
        />
      </div>

      <TraceDetailsModal
        trace={selectedTrace}
        onClose={() => setSelectedTraceId(null)}
      />
    </section>
  );
}
