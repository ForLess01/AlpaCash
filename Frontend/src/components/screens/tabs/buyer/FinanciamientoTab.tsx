"use client";

import { Landmark, ShieldCheck, WalletCards } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";

export function FinanciamientoTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Línea activa", value: "S/ 58k", icon: <WalletCards className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Seguro de carga", value: "Activo", icon: <ShieldCheck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Banco aliado", value: "2", icon: <Landmark className="w-5 h-5" />, bg: "var(--pink)" },
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
        <div className="font-display text-2xl" style={{ fontWeight: 600 }}>Compra protegida por escrow y seguro climático</div>
        <p className="text-sm text-[var(--ivory)]/70 mt-2 max-w-2xl">
          Cada orden grande queda ligada a hitos de calidad, despacho y recepción para liberar pagos sin fricción y sin perder la estética del flujo editorial del producto.
        </p>
      </ArtCard>
    </div>
  );
}
