"use client";

import { Beaker, BadgeCheck, Microscope } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { useQualityReports } from "@/lib/hooks/useDashboardData";

export function CalidadTab() {
  const { reports, loading } = useQualityReports();
  const certified = reports.filter((report) => report.certifiedLabel.toLowerCase().includes("disp") || report.certifiedLabel.toLowerCase().includes("activ")).length;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Lotes auditables", value: String(reports.length), icon: <Microscope className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Certificados disponibles", value: String(certified), icon: <BadgeCheck className="w-5 h-5" />, bg: "var(--pink)" },
          { label: "Categorías activas", value: String(new Set(reports.map((report) => report.category)).size), icon: <Beaker className="w-5 h-5" />, bg: "var(--mint)" },
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
        {loading && <ArtCard className="p-4 mb-4 text-sm text-[var(--ink)]/60">Cargando reportes reales de calidad…</ArtCard>}
        <div className="grid lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <ArtCard key={report.id} className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">{report.id}</div>
              <div className="font-display text-2xl mt-1" style={{ fontWeight: 700 }}>{report.category}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-[var(--ink)]/10 bg-[var(--ivory)] p-3">
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Volumen</div>
                  <div>{report.yieldLabel}</div>
                </div>
                <div className="rounded-xl border border-[var(--ink)]/10 bg-[var(--ivory)] p-3">
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Nivel</div>
                  <div>{report.grade}</div>
                </div>
                <div className="rounded-xl border border-[var(--ink)]/10 bg-[var(--ivory)] p-3 col-span-2">
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Color · Estado</div>
                  <div>{report.color} · {report.certifiedLabel}</div>
                </div>
              </div>
            </ArtCard>
          ))}
          {!loading && reports.length === 0 && <ArtCard className="p-5 text-sm text-[var(--ink)]/60">Todavía no hay lotes auditables para mostrar.</ArtCard>}
        </div>
      </div>
    </div>
  );
}
