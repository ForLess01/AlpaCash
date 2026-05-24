"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function AuditoriaTab() {
  return (
    <div>
      <SectionLabel n="N°05">Auditoría financiera</SectionLabel>
      <div className="space-y-3">
        {["08:20 · Voucher conciliado contra orden de compra", "09:45 · Póliza climática renovada", "11:12 · Score reentrenado con nuevos datos"].map((entry) => (
          <ArtCard key={entry} className="p-4 text-sm">{entry}</ArtCard>
        ))}
      </div>
    </div>
  );
}
