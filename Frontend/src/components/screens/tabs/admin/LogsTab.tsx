"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useNotifications } from "@/lib/hooks/useDashboardData";

export function LogsTab() {
  const logs = useNotifications();

  return (
    <div>
      <SectionLabel n="N°03">Bitácora completa</SectionLabel>
      <div className="space-y-3">
        {logs.length === 0 ? (
          <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Sin eventos recientes en bitácora.</ArtCard>
        ) : (
          logs.map((entry) => (
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
