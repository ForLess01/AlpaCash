"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Filter, Edit2, Archive, ExternalLink } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { FiberBall, LotTag, ChartSparkle, ReceiptPaper } from "../../../icons/AlpaIcons";

type Lot = {
  id: string;
  cat: string;
  color: string;
  lb: number;
  price: number;
  st: "Activo" | "En oferta" | "Vendido" | "Borrador";
  origin: string;
  esquila: string;
};

const LOTS: Lot[] = [
  { id: "AC-2048", cat: "Baby", color: "Blanco", lb: 120, price: 32.5, st: "En oferta", origin: "Tinta, Puno", esquila: "May 2026" },
  { id: "AC-2049", cat: "Fleece", color: "LF", lb: 240, price: 24.1, st: "Activo", origin: "Tinta, Puno", esquila: "May 2026" },
  { id: "AC-2051", cat: "Súper Baby", color: "Beige", lb: 80, price: 41.0, st: "Vendido", origin: "Cabaña Sur", esquila: "Abr 2026" },
  { id: "AC-2052", cat: "Médium", color: "Café", lb: 160, price: 18.5, st: "Activo", origin: "Tinta, Puno", esquila: "May 2026" },
  { id: "AC-2053", cat: "Baby", color: "Gris", lb: 95, price: 31.0, st: "Borrador", origin: "Asoc. Llalli", esquila: "Jun 2026" },
  { id: "AC-2054", cat: "Gruesa", color: "Negro", lb: 320, price: 14.0, st: "Vendido", origin: "Tinta, Puno", esquila: "Mar 2026" },
  { id: "AC-2055", cat: "Súper Baby", color: "Blanco", lb: 60, price: 43.0, st: "Activo", origin: "Cabaña Sur", esquila: "Jun 2026" },
  { id: "AC-2056", cat: "Fleece", color: "Mosaico", lb: 200, price: 22.0, st: "En oferta", origin: "Tinta, Puno", esquila: "May 2026" },
];

type Filter = "Todos" | "Activo" | "En oferta" | "Vendido" | "Borrador";

const ST_COLORS: Record<string, string> = {
  "Activo": "bg-[var(--mint)] border-[var(--ink)]",
  "En oferta": "bg-[var(--gold)] border-[var(--ink)]",
  "Vendido": "bg-[var(--teal-300)] border-[var(--ink)]",
  "Borrador": "bg-[var(--paper)] border-[var(--ink)]/30",
};

export function LotesTab({ onNewLot, onOpenLot }: { onNewLot?: () => void; onOpenLot?: () => void }) {
  const [filter, setFilter] = useState<Filter>("Todos");

  const filtered = filter === "Todos" ? LOTS : LOTS.filter((l) => l.st === filter);
  const stats = [
    { l: "Total lotes", v: LOTS.length.toString(), icon: <LotTag size={18} />, bg: "var(--gold-soft)" },
    { l: "En mercado", v: LOTS.filter((l) => l.st === "En oferta" || l.st === "Activo").length.toString(), icon: <FiberBall size={18} />, bg: "var(--mint)" },
    { l: "Vendidos este mes", v: LOTS.filter((l) => l.st === "Vendido").length.toString(), icon: <ChartSparkle size={18} />, bg: "var(--pink)" },
    { l: "Ingreso total", v: "S/ 12,840", icon: <ReceiptPaper size={18} />, bg: "var(--gold)" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <ArtCard className="p-4">
              <div className="w-9 h-9 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-2" style={{ background: s.bg }}>
                {s.icon}
              </div>
              <div className="font-display text-2xl" style={{ fontWeight: 700 }}>{s.v}</div>
              <div className="text-xs text-[var(--ink)]/60">{s.l}</div>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <SectionLabel n="N°01">Mis lotes</SectionLabel>
        <div className="flex items-center gap-2 flex-wrap">
          {(["Todos", "Activo", "En oferta", "Vendido", "Borrador"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full border-2 text-xs transition-all ${
                filter === f ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]" : "border-[var(--ink)]/20 bg-[var(--paper)]"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={onNewLot}
            className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center gap-2 text-sm hover:bg-[var(--terracotta)] transition-colors"
            style={{ fontWeight: 500 }}
          >
            <Plus className="w-4 h-4" /> Registrar lote
          </button>
        </div>
      </div>

      {/* Lots grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ArtCard className="p-4 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--ivory)] border-2 border-[var(--ink)] flex items-center justify-center">
                  <FiberBall size={24} className="text-[var(--terracotta)]" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border-2 ${ST_COLORS[l.st]}`}>
                  {l.st}
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">{l.cat} · {l.color}</div>
              <div className="font-display text-xl mt-0.5" style={{ fontWeight: 700 }}>{l.id}</div>
              <div className="text-xs text-[var(--ink)]/60 mt-1">{l.origin} · {l.esquila}</div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="font-mono text-sm">{l.lb} lb</div>
                  <div className="text-[var(--terracotta)] font-display text-lg" style={{ fontWeight: 700 }}>S/ {l.price}/lb</div>
                </div>
                <div className="font-display text-sm text-[var(--ink)]/50">S/ {(l.lb * l.price).toFixed(0)}</div>
              </div>
              <div className="mt-3 pt-3 border-t-2 border-dashed border-[var(--ink)]/10 flex items-center gap-2">
                <button
                  onClick={onOpenLot}
                  className="flex-1 py-1.5 rounded-full border-2 border-[var(--ink)]/20 text-xs flex items-center justify-center gap-1 hover:bg-[var(--paper)] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Ver
                </button>
                <button className="flex-1 py-1.5 rounded-full border-2 border-[var(--ink)]/20 text-xs flex items-center justify-center gap-1 hover:bg-[var(--paper)] transition-colors">
                  <Edit2 className="w-3 h-3" /> Editar
                </button>
                <button className="p-1.5 rounded-full border-2 border-[var(--ink)]/20 hover:bg-[var(--paper)] transition-colors">
                  <Archive className="w-3 h-3" />
                </button>
              </div>
            </ArtCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
