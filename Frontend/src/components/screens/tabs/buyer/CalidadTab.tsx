"use client";

import { Beaker, BadgeCheck, Microscope } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";

const reports = [
  { lot: "AC-2048", micron: "22.3 µm", yield: "88%", cert: "Sello aliado" },
  { lot: "AC-2050", micron: "20.8 µm", yield: "91%", cert: "Premium" },
  { lot: "AC-2064", micron: "23.1 µm", yield: "84%", cert: "Origen verificado" },
];

export function CalidadTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Lotes auditados", value: "34", icon: <Microscope className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Rendimiento promedio", value: "87%", icon: <Beaker className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Certificados válidos", value: "29", icon: <BadgeCheck className="w-5 h-5" />, bg: "var(--pink)" },
        ].map((metric) => (
          <ArtCard key={metric.label} className="p-5">
            <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: metric.bg }}>
              {metric.icon}
            </div>
            <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{metric.value}</div>
            <div className="text-xs text-[var(--ink)]/60">{metric.label}</div>
          </ArtCard>
        ))}
      </div>

      <div>
        <SectionLabel n="N°01">Reportes curados</SectionLabel>
        <div className="grid lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <ArtCard key={report.lot} className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">{report.lot}</div>
              <div className="font-display text-2xl mt-1" style={{ fontWeight: 700 }}>{report.micron}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-[var(--ink)]/10 bg-[var(--ivory)] p-3">
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Yield</div>
                  <div>{report.yield}</div>
                </div>
                <div className="rounded-xl border border-[var(--ink)]/10 bg-[var(--ivory)] p-3">
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Cert.</div>
                  <div>{report.cert}</div>
                </div>
              </div>
            </ArtCard>
          ))}
        </div>
      </div>
    </div>
  );
}
