"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useNotifications } from "@/lib/hooks/useDashboardData";

export function AuditoriaTab() {
  const entries = useNotifications();
  return (
    <div>
      <SectionLabel n="N°05">Auditoría financiera</SectionLabel>
      <div className="space-y-3">
        {entries.length === 0 ? (
          <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Sin eventos recientes de auditoría.</ArtCard>
        ) : (
          entries.map((entry) => (
            <ArtCard key={entry.id} className="p-4 text-sm">
              <div className="font-medium">{entry.title}</div>
              <div className="text-[var(--ink)]/70">{entry.body}</div>
            </ArtCard>
          ))
        )}
      </div>
    </div>
  );
}
