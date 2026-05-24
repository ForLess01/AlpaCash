"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function ComunidadTab() {
  return (
    <div>
      <SectionLabel n="N°05">Comunidad activa</SectionLabel>
      <ArtCard className="p-5 bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]">
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>Foros, audios y microcontenidos</div>
        <p className="text-sm text-[var(--ivory)]/70 mt-2">Canales en español, quechua y aimara con recursos descargables y acompañamiento continuo.</p>
      </ArtCard>
    </div>
  );
}
