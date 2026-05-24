"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useCredits } from "@/lib/hooks/useDashboardData";

export function CreditosTab() {
  const { credits, loading } = useCredits();
  const totalAmount = credits.reduce((sum, credit) => sum + credit.amount, 0);

  return (
    <div>
      <SectionLabel n="N°02">Cola de créditos</SectionLabel>
      {loading && <ArtCard className="p-4 mb-4 text-sm text-[var(--ink)]/60">Cargando evaluaciones crediticias reales…</ArtCard>}
      <div className="grid md:grid-cols-2 gap-4">
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>{credits.length} solicitudes</div><div className="text-sm text-[var(--ink)]/70 mt-1">Con trazabilidad suficiente para análisis inmediato.</div></ArtCard>
        <ArtCard className="p-5"><div className="font-display text-xl" style={{ fontWeight: 600 }}>S/ {totalAmount.toLocaleString()}</div><div className="text-sm text-[var(--ink)]/70 mt-1">Monto agregado en evaluación.</div></ArtCard>
      </div>
      <div className="mt-4 space-y-3">
        {credits.map((credit) => (
          <ArtCard key={credit.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-lg" style={{ fontWeight: 600 }}>{credit.applicant}</div>
              <div className="text-xs text-[var(--ink)]/60">Score {credit.score || "N/D"} · {credit.status}</div>
            </div>
            <div className="font-mono text-sm">S/ {credit.amount.toLocaleString()}</div>
          </ArtCard>
        ))}
      </div>
    </div>
  );
}
