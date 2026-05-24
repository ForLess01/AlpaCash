"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Filter, Edit2, Archive, ExternalLink } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { FiberBall, LotTag, ChartSparkle, ReceiptPaper } from "../../../icons/AlpaIcons";
import { useProducerLots } from "@/lib/hooks/useDashboardData";
import type { DisplayLot } from "@/components/modals/LotDetailModal";
import { createClient } from "@/lib/supabase/client";

type Filter = "Todos" | "Activo" | "En oferta" | "Vendido" | "Borrador";

const ST_COLORS: Record<string, string> = {
  "Activo": "bg-[var(--mint)] border-[var(--ink)]",
  "En oferta": "bg-[var(--gold)] border-[var(--ink)]",
  "Vendido": "bg-[var(--teal-300)] border-[var(--ink)]",
  "Borrador": "bg-[var(--paper)] border-[var(--ink)]/30",
};

export function LotesTab({ onNewLot, onOpenLot }: { onNewLot?: () => void; onOpenLot?: (lot?: DisplayLot) => void }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const { lots, loading, setLots } = useProducerLots();
  const [message, setMessage] = useState<string | null>(null);

  const filtered = filter === "Todos" ? lots : lots.filter((l) => l.st === filter);
  const stats = [
    { l: "Total lotes", v: lots.length.toString(), icon: <LotTag size={18} />, bg: "var(--gold-soft)" },
    { l: "En mercado", v: lots.filter((l) => l.st === "En oferta" || l.st === "Activo").length.toString(), icon: <FiberBall size={18} />, bg: "var(--mint)" },
    { l: "Vendidos este mes", v: lots.filter((l) => l.st === "Vendido").length.toString(), icon: <ChartSparkle size={18} />, bg: "var(--pink)" },
    { l: "Ingreso total", v: "S/ 12,840", icon: <ReceiptPaper size={18} />, bg: "var(--gold)" },
  ];

  const handleEdit = (lotId: string) => {
    const target = lots.find((lot) => lot.id === lotId);
    if (!target?.recordId) return;
    const supabase = createClient();
    void supabase
      .from("lotes_fibra")
      .update({ estado: "disponible" })
      .eq("id", target.recordId);
    setLots((prev) => prev.map((lot) => lot.id === lotId ? { ...lot, st: "Activo" } : lot));
    setMessage(`Lote ${lotId} actualizado. Si estaba en borrador, ya quedó activo.`);
  };

  const handleArchive = (lotId: string) => {
    const target = lots.find((lot) => lot.id === lotId);
    if (target?.recordId) {
      const supabase = createClient();
      void supabase
        .from("lotes_fibra")
        .update({ estado: "archivado" })
        .eq("id", target.recordId);
    }
    setLots((prev) => prev.filter((lot) => lot.id !== lotId));
    setMessage(`Lote ${lotId} archivado y removido del panel activo.`);
  };

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

      {loading && (
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--ivory)] px-4 py-3 text-sm text-[var(--teal-deep)]">
          Cargando lotes reales desde Supabase…
        </div>
      )}

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

      {message && (
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--ivory)] px-4 py-3 text-sm text-[var(--teal-deep)]">
          {message}
        </div>
      )}

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
                  onClick={() => onOpenLot?.({ id: l.id, cat: l.cat, color: l.color, origin: l.origin, lb: l.lb, price: l.price, prod: "Mi lote", grade: l.st })}
                  className="flex-1 py-1.5 rounded-full border-2 border-[var(--ink)]/20 text-xs flex items-center justify-center gap-1 hover:bg-[var(--paper)] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Ver
                </button>
                <button onClick={() => handleEdit(l.id)} className="flex-1 py-1.5 rounded-full border-2 border-[var(--ink)]/20 text-xs flex items-center justify-center gap-1 hover:bg-[var(--paper)] transition-colors">
                  <Edit2 className="w-3 h-3" /> Editar
                </button>
                <button onClick={() => handleArchive(l.id)} className="p-1.5 rounded-full border-2 border-[var(--ink)]/20 hover:bg-[var(--paper)] transition-colors">
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
