"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function TalleresTab() {
  return (
    <div>
      <SectionLabel n="N°01">Talleres calendarizados</SectionLabel>
      <div className="space-y-3">
        {["Clasificación de fibra · 26 may · Asoc. Tinta", "Esquila respetuosa · 28 may · Cabaña Sur", "Negociación digna · 01 jun · Maranganí"].map((item) => (
          <ArtCard key={item} className="p-4 text-sm">{item}</ArtCard>
        ))}
      </div>
    </div>
  );
}
