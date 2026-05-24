"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function VisitasTab() {
  return (
    <div>
      <SectionLabel n="N°03">Visitas en campo</SectionLabel>
      <div className="grid md:grid-cols-2 gap-4">
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>18 visitas completadas</div><div className="text-sm text-[var(--ink)]/70 mt-1">Seguimiento de calidad, pasturas y preparación comercial.</div></ArtCard>
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>6 visitas programadas</div><div className="text-sm text-[var(--ink)]/70 mt-1">Pendientes en Puno y Apurímac para la próxima semana.</div></ArtCard>
      </div>
    </div>
  );
}
