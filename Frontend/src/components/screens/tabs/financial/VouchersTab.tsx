"use client";

import { ArtCard, SectionLabel } from "../../DashShell";

export function VouchersTab() {
  return (
    <div>
      <SectionLabel n="N°03">Vouchers activos</SectionLabel>
      <div className="space-y-3">
        {["Voucher esquila · S/ 1,200", "Pre-pago lote · S/ 3,800", "Comprobante venta · 12 hoy"].map((entry) => (
          <ArtCard key={entry} className="p-4 text-sm">{entry}</ArtCard>
        ))}
      </div>
    </div>
  );
}
