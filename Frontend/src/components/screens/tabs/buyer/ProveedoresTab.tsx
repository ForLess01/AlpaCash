"use client";

import { Factory, MessageSquareMore, Star } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";

const suppliers = [
  { name: "Asoc. Tinta", region: "Puno", rating: "4.9", openLots: 8 },
  { name: "Cabaña Sur", region: "Cusco", rating: "4.8", openLots: 5 },
  { name: "Coop. Maranganí", region: "Cusco", rating: "4.7", openLots: 4 },
];

export function ProveedoresTab() {
  return (
    <div className="space-y-6">
      <SectionLabel n="N°01">Productores aliados</SectionLabel>
      <div className="space-y-3">
        {suppliers.map((supplier) => (
          <ArtCard key={supplier.name} className="p-4 flex flex-wrap items-center gap-4">
            <div className="w-12 h-12 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center bg-[var(--gold)]/50">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-xl" style={{ fontWeight: 600 }}>{supplier.name}</div>
              <div className="text-xs text-[var(--ink)]/60">{supplier.region} · {supplier.openLots} lotes abiertos</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-[var(--gold)]" /> {supplier.rating}</div>
            <button className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center gap-2">
              Contactar <MessageSquareMore className="w-4 h-4" />
            </button>
          </ArtCard>
        ))}
      </div>
    </div>
  );
}
