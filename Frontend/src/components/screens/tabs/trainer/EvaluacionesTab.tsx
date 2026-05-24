"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function EvaluacionesTab() {
  return (
    <div>
      <SectionLabel n="N°04">Evaluaciones recientes</SectionLabel>
      <div className="space-y-3">
        {["Juana Quispe · 92% · Clasificación", "Mario Condori · 74% · Esquila", "Elena Mamani · 58% · Negociación"].map((entry) => (
          <ArtCard key={entry} className="p-4 text-sm">{entry}</ArtCard>
        ))}
      </div>
    </div>
  );
}
