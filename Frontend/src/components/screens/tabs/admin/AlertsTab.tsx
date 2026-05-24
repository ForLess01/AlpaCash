"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useNotifications } from "@/lib/hooks/useDashboardData";

export function AlertsTab() {
  const alerts = useNotifications();

  return (
    <div>
      <SectionLabel n="N°05">Alertas operativas</SectionLabel>
      <div className="grid md:grid-cols-2 gap-4">
        {alerts.length === 0 ? (
          <ArtCard className="p-5 bg-[var(--mint)]/30">
            <div className="font-display text-xl" style={{ fontWeight: 600 }}>Infraestructura estable</div>
            <div className="text-sm text-[var(--ink)]/70 mt-1">Sin alertas operativas nuevas.</div>
          </ArtCard>
        ) : (
          alerts.slice(0, 2).map((alert, index) => (
            <ArtCard key={alert.id} className={`p-5 ${index === 0 ? "bg-[var(--gold)]/30" : "bg-[var(--mint)]/30"}`}>
              <div className="font-display text-xl" style={{ fontWeight: 600 }}>{alert.title}</div>
              <div className="text-sm text-[var(--ink)]/70 mt-1">{alert.body}</div>
            </ArtCard>
          ))
        )}
      </div>
    </div>
  );
}
