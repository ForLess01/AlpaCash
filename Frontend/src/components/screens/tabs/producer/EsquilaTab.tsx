"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { ScissorsShear, AlpacaHead, ChartSparkle } from "../../../icons/AlpaIcons";

type Esquila = { id: string; date: string; cabana: string; animals: number; estimatedLb: number; done: boolean };

const UPCOMING: Esquila[] = [
  { id: "ESQ-01", date: "5 Jun 2026", cabana: "Cabaña Norte · Tinta", animals: 42, estimatedLb: 280, done: false },
  { id: "ESQ-02", date: "18 Jun 2026", cabana: "Cabaña Sur · Cusco", animals: 28, estimatedLb: 180, done: false },
  { id: "ESQ-03", date: "2 Jul 2026", cabana: "Asociación Llalli", animals: 60, estimatedLb: 420, done: false },
];

const CABANAS = [
  { name: "Cabaña Norte", animals: 42, lastEsquila: "Nov 2025", next: "5 Jun 2026", color: "var(--gold)" },
  { name: "Cabaña Sur", animals: 28, lastEsquila: "Oct 2025", next: "18 Jun 2026", color: "var(--terracotta)" },
  { name: "Asoc. Llalli", animals: 60, lastEsquila: "Dic 2025", next: "2 Jul 2026", color: "var(--teal-500)" },
];

const MINI_CAL_DAYS = Array.from({ length: 35 }, (_, i) => i + 1).slice(0, 30);
const MARKED_DAYS = [5, 18];

export function EsquilaTab() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cabana: "", date: "", animals: "" });

  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { l: "Animales totales", v: "130", icon: <AlpacaHead size={20} />, bg: "var(--gold)" },
          { l: "Esquilas este año", v: "4", icon: <ScissorsShear size={20} />, bg: "var(--mint)" },
          { l: "Fibra estimada (próx.)", v: "880 lb", icon: <ChartSparkle size={20} />, bg: "var(--pink)" },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <ArtCard className="p-4">
              <div className="w-9 h-9 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-2" style={{ background: k.bg }}>
                {k.icon}
              </div>
              <div className="font-display text-2xl" style={{ fontWeight: 700 }}>{k.v}</div>
              <div className="text-xs text-[var(--ink)]/60">{k.l}</div>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Upcoming */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel n="N°01">Próximas esquilas</SectionLabel>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center gap-2 hover:bg-[var(--terracotta)] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Plus className="w-4 h-4" /> Programar
            </button>
          </div>
          <div className="space-y-3">
            {UPCOMING.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <ArtCard className="p-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center bg-[var(--ivory)]">
                    <ScissorsShear size={30} className="text-[var(--terracotta)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg" style={{ fontWeight: 600 }}>{e.cabana}</div>
                    <div className="text-xs text-[var(--ink)]/60">{e.date} · {e.animals} animales</div>
                    <div className="font-mono text-xs text-[var(--teal-500)] mt-0.5">~{e.estimatedLb} lb estimadas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">ID</div>
                    <div className="font-mono text-sm" style={{ fontWeight: 600 }}>{e.id}</div>
                  </div>
                </ArtCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini calendar */}
        <div>
          <SectionLabel n="N°02">Junio 2026</SectionLabel>
          <ArtCard className="p-4">
            <div className="grid grid-cols-7 gap-1 text-center">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                <div key={d} className="text-[9px] font-mono uppercase text-[var(--ink)]/40 pb-1">{d}</div>
              ))}
              {/* Padding for first week (June 1 = Monday in this mock) */}
              {MINI_CAL_DAYS.map((d) => (
                <div
                  key={d}
                  className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                    MARKED_DAYS.includes(d)
                      ? "bg-[var(--terracotta)] text-[var(--ivory)] font-mono border-2 border-[var(--ink)]"
                      : "text-[var(--ink)]/70"
                  }`}
                  style={{ fontWeight: MARKED_DAYS.includes(d) ? 700 : undefined }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-[10px]">
                <div className="w-3 h-3 rounded-sm bg-[var(--terracotta)]" />
                <span className="text-[var(--ink)]/60">Días de esquila programados</span>
              </div>
            </div>
          </ArtCard>
        </div>
      </div>

      {/* Cabanas */}
      <div>
        <SectionLabel n="N°03">Mis cabañas</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-4">
          {CABANAS.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <ArtCard className="p-5">
                <div className="w-14 h-14 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: c.color }}>
                  <AlpacaHead size={28} className="text-[var(--ivory)]" />
                </div>
                <div className="font-display text-xl" style={{ fontWeight: 600 }}>{c.name}</div>
                <div className="text-xs text-[var(--ink)]/60 mt-1">{c.animals} animales registrados</div>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink)]/50">Última esquila</span>
                    <span className="font-mono">{c.lastEsquila}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink)]/50">Próxima</span>
                    <span className="font-mono text-[var(--terracotta)]">{c.next}</span>
                  </div>
                </div>
              </ArtCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New esquila form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="fixed inset-0 bg-[var(--ink)]/50 backdrop-blur-sm z-40" />
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] z-50 bg-[var(--paper)] rounded-3xl border-2 border-[var(--ink)] brutalist-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-display text-2xl" style={{ fontWeight: 700 }}>Programar esquila</div>
                <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/60">Cabaña</label>
                  <select
                    value={form.cabana}
                    onChange={(e) => setForm((p) => ({ ...p, cabana: e.target.value }))}
                    className="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--ivory)] outline-none text-sm"
                  >
                    <option value="">Seleccionar cabaña</option>
                    {CABANAS.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/60">Fecha</label>
                  <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--ivory)] outline-none text-sm" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/60">N° de animales</label>
                  <input type="number" value={form.animals} onChange={(e) => setForm((p) => ({ ...p, animals: e.target.value }))} placeholder="42" className="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--ivory)] outline-none text-sm" />
                </div>
              </div>
              <button onClick={() => setShowForm(false)} className="mt-5 w-full px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm" style={{ fontWeight: 500 }}>
                Guardar programación
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
