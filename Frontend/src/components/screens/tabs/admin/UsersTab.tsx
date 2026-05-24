"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useAdminUsers } from "@/lib/hooks/useDashboardData";

export function UsersTab() {
  const { users, loading } = useAdminUsers();

  return (
    <div>
      <SectionLabel n="N°01">Usuarios de la red</SectionLabel>
      {loading && <ArtCard className="p-4 mb-3 text-sm text-[var(--ink)]/60">Cargando usuarios reales…</ArtCard>}
      <div className="space-y-3">
        {users.map((user) => (
          <ArtCard key={user.id} className="p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-lg" style={{ fontWeight: 600 }}>{user.name}</div>
              <div className="text-xs text-[var(--ink)]/60">{user.role}</div>
            </div>
            <span className="px-3 py-1 rounded-full border-2 border-[var(--ink)]/15 bg-[var(--paper)] text-[10px] font-mono uppercase">{user.status}</span>
          </ArtCard>
        ))}
      </div>
    </div>
  );
}
