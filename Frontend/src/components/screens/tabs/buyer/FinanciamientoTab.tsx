"use client";

import { Landmark, ShieldCheck, WalletCards } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { useCredits, useNotifications, useVouchers } from "@/lib/hooks/useDashboardData";

export function FinanciamientoTab() {
  const { credits, loading: creditsLoading } = useCredits();
  const { vouchers, loading: vouchersLoading } = useVouchers();
  const notifications = useNotifications();
  const activeLine = vouchers.reduce((sum, voucher) => sum + Number(voucher.amountLabel.replace(/[^\d.-]/g, "") || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Línea activa", value: `S/ ${activeLine.toLocaleString()}`, icon: <WalletCards className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Coberturas activas", value: String(vouchers.filter((voucher) => voucher.status.toLowerCase().includes("activ")).length), icon: <ShieldCheck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Alertas financieras", value: String(notifications.length), icon: <Landmark className="w-5 h-5" />, bg: "var(--pink)" },
        ].map((card) => (
          <ArtCard key={card.label} className="p-5">
            <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: card.bg }}>
              {card.icon}
            </div>
            <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{card.value}</div>
            <div className="text-xs text-[var(--ink)]/60">{card.label}</div>
          </ArtCard>
        ))}
      </div>

      <SectionLabel n="N°01">Cobertura comercial</SectionLabel>
      <ArtCard className="p-5 bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]">
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>Compra protegida por datos financieros activos</div>
        <p className="text-sm text-[var(--ivory)]/70 mt-2 max-w-2xl">
          Este panel ahora toma vouchers, evaluaciones y alertas reales para dejar de depender de copy fijo y mostrar el pulso financiero del comprador autenticado.
        </p>
      </ArtCard>

      {(creditsLoading || vouchersLoading) && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Cargando financiamiento real…</ArtCard>}
      {!creditsLoading && credits.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {credits.slice(0, 2).map((credit) => (
            <ArtCard key={credit.id} className="p-4">
              <div className="font-display text-lg" style={{ fontWeight: 600 }}>{credit.applicant}</div>
              <div className="text-sm text-[var(--ink)]/70 mt-1">{credit.status}</div>
              <div className="font-mono text-sm mt-2">S/ {credit.amount.toLocaleString()} · Score {credit.score || "N/D"}</div>
            </ArtCard>
          ))}
        </div>
      )}
    </div>
  );
}
