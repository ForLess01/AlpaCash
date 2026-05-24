"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function ScoringTab() {
  return (
    <div>
      <SectionLabel n="N°01">Scoring por trazabilidad</SectionLabel>
      <div className="space-y-3">
        {["Juana Quispe · 842 · Excelente", "Mario Condori · 731 · Bueno", "Coop. Maranganí · 690 · Estable"].map((entry) => (
          <ArtCard key={entry} className="p-4 text-sm">{entry}</ArtCard>
        ))}
      </div>
    </div>
  );
}
