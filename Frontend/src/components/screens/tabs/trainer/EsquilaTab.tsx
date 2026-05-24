"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function EsquilaTab() {
  return (
    <div>
      <SectionLabel n="N°02">Ruta de esquila</SectionLabel>
      <ArtCard className="p-5">
        <div className="font-display text-xl" style={{ fontWeight: 600 }}>5 brigadas activas</div>
        <p className="text-sm text-[var(--ink)]/70 mt-2">Cobertura semanal para Tinta, Llalli, Maranganí, Sicuani y Challhuahuacho.</p>
      </ArtCard>
    </div>
  );
}
