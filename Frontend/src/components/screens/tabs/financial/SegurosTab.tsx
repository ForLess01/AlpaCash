"use client";

import { ArtCard, SectionLabel } from "../../DashShell";
import { useCredits, useNotifications, useVouchers } from "@/lib/hooks/useDashboardData";

export function SegurosTab() {
  const { credits, loading: creditsLoading } = useCredits();
  const { vouchers, loading: vouchersLoading } = useVouchers();
  const notifications = useNotifications();

  const activeCoverage = vouchers.filter((voucher) => voucher.status.toLowerCase().includes("activo")).length;
  const inReview = credits.filter((credit) => credit.status.toLowerCase().includes("evalu")).length;

  return (
    <div className="space-y-6">
      <SectionLabel n="N°04">Seguros climáticos</SectionLabel>
      <div className="grid md:grid-cols-3 gap-4">
        <ArtCard className="p-5">
          <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{activeCoverage}</div>
          <div className="text-xs text-[var(--ink)]/60">Coberturas activas desde vouchers/transacciones</div>
        </ArtCard>
        <ArtCard className="p-5">
          <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{inReview}</div>
          <div className="text-xs text-[var(--ink)]/60">Casos con evaluación financiera en curso</div>
        </ArtCard>
        <ArtCard className="p-5">
          <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{notifications.length}</div>
          <div className="text-xs text-[var(--ink)]/60">Alertas operativas recientes ligadas al perfil</div>
        </ArtCard>
      </div>

      <ArtCard className="p-5 bg-[var(--mint)]/35">
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>Cobertura paramétrica operando sobre datos reales</div>
        <p className="text-sm text-[var(--ink)]/70 mt-2">Tomamos el estado de vouchers, evaluaciones y alertas para que este panel deje de depender de copy fijo y muestre actividad verificable.</p>
      </ArtCard>

      {(creditsLoading || vouchersLoading) && (
        <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Cargando actividad real de seguros…</ArtCard>
      )}
    </div>
  );
}
