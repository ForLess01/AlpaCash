"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function CreditosTab() {
  return (
    <div>
      <SectionLabel n="N°02">Cola de créditos</SectionLabel>
      <div className="grid md:grid-cols-2 gap-4">
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>14 solicitudes</div><div className="text-sm text-[var(--ink)]/70 mt-1">Con trazabilidad suficiente para análisis inmediato.</div></ArtCard>
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>S/ 118k evaluados</div><div className="text-sm text-[var(--ink)]/70 mt-1">Lotes ligados a historial comercial y calidad.</div></ArtCard>
      </div>
    </div>
  );
}
