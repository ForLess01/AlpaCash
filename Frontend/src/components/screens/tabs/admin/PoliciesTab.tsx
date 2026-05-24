"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function PoliciesTab() {
  return (
    <div>
      <SectionLabel n="N°02">Políticas activas</SectionLabel>
      <ArtCard className="p-5 space-y-3">
        <div>
          <div className="font-display text-xl" style={{ fontWeight: 600 }}>Confianza por nivel v3.2</div>
          <p className="text-sm text-[var(--ink)]/70 mt-1">Regula visibilidad de datos sensibles por consentimiento, rol y estado contractual.</p>
        </div>
        <div>
          <div className="font-display text-xl" style={{ fontWeight: 600 }}>Escrow comercial v2.1</div>
          <p className="text-sm text-[var(--ink)]/70 mt-1">Bloquea la liberación de pagos hasta cumplir QA, despacho y recepción.</p>
        </div>
      </ArtCard>
    </div>
  );
}
