"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function SegurosTab() {
  return (
    <div>
      <SectionLabel n="N°04">Seguros climáticos</SectionLabel>
      <ArtCard className="p-5 bg-[var(--mint)]/35">
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>Cobertura paramétrica activa</div>
        <p className="text-sm text-[var(--ink)]/70 mt-2">Se activa por eventos de helada, lluvia extrema y pérdida de acceso logístico en comunidades priorizadas.</p>
      </ArtCard>
    </div>
  );
}
