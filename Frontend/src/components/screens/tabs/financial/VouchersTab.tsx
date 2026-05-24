"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useVouchers } from "@/lib/hooks/useDashboardData";

export function VouchersTab() {
  const { vouchers, loading } = useVouchers();
  return (
    <div>
      <SectionLabel n="N°03">Vouchers activos</SectionLabel>
      <div className="space-y-3">
        {loading && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Cargando vouchers reales…</ArtCard>}
        {vouchers.map((entry) => (
          <ArtCard key={entry.id} className="p-4 text-sm">
            <div className="font-medium">{entry.title}</div>
            <div className="text-[var(--ink)]/70">{entry.amountLabel} · {entry.status}</div>
          </ArtCard>
        ))}
      </div>
    </div>
  );
}
