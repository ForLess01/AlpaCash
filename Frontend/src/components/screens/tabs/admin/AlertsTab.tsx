"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function AlertsTab() {
  return (
    <div>
      <SectionLabel n="N°05">Alertas operativas</SectionLabel>
      <div className="grid md:grid-cols-2 gap-4">
        <ArtCard className="p-5 bg-[var(--gold)]/30">
          <div className="font-display text-xl" style={{ fontWeight: 600 }}>1 revisión KYC pendiente</div>
          <div className="text-sm text-[var(--ink)]/70 mt-1">Comprador nuevo esperando validación documental.</div>
        </ArtCard>
        <ArtCard className="p-5 bg-[var(--mint)]/30">
          <div className="font-display text-xl" style={{ fontWeight: 600 }}>Infraestructura estable</div>
          <div className="text-sm text-[var(--ink)]/70 mt-1">Sin degradación de latencia en dashboard ni auth.</div>
        </ArtCard>
      </div>
    </div>
  );
}
