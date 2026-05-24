"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function LogsTab() {
  return (
    <div>
      <SectionLabel n="N°03">Bitácora completa</SectionLabel>
      <div className="space-y-3">
        {["11:42 · Consentimiento otorgado al lote AC-2048", "10:18 · Firma digital de certificador aplicada", "09:02 · Backup de bóveda verificado"].map((entry) => (
          <ArtCard key={entry} className="p-4 text-sm">{entry}</ArtCard>
        ))}
      </div>
    </div>
  );
}
