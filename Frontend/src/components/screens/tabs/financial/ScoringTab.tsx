"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useCredits } from "@/lib/hooks/useDashboardData";

export function ScoringTab() {
  const { credits, loading } = useCredits();
  const ranked = [...credits].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <div>
      <SectionLabel n="N°01">Scoring por trazabilidad</SectionLabel>
      <div className="space-y-3">
        {loading && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Cargando scoring real…</ArtCard>}
        {ranked.map((entry) => (
          <ArtCard key={entry.id} className="p-4 flex items-center justify-between gap-4 text-sm">
            <div>
              <div className="font-display text-lg" style={{ fontWeight: 600 }}>{entry.applicant}</div>
              <div className="text-[var(--ink)]/60">{entry.status}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-xl" style={{ fontWeight: 700 }}>{entry.score || "N/D"}</div>
              <div className="text-[var(--ink)]/60">Score</div>
            </div>
          </ArtCard>
        ))}
        {!loading && ranked.length === 0 && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Todavía no hay evaluaciones crediticias para rankear.</ArtCard>}
      </div>
    </div>
  );
}
