"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function VaultTab() {
  return (
    <div>
      <SectionLabel n="N°04">Bóveda de datos</SectionLabel>
      <ArtCard className="p-5 bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]">
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>3 regiones, 12 backups, 0 incidentes</div>
        <p className="text-sm text-[var(--ivory)]/70 mt-2">Retención escalonada, llaves rotadas y snapshots diarios listos para auditoría externa.</p>
      </ArtCard>
    </div>
  );
}
