"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Star, Lock, BookOpen } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { SeedLeaf, StampSeal, ScissorsShear, ScaleBalance, ChartSparkle, ClipboardCheckArt } from "../../../icons/AlpaIcons";

type ModuleStatus = "completado" | "en curso" | "bloqueado";
type Module = { id: string; title: string; duration: string; progress: number; status: ModuleStatus; icon: React.JSX.Element; color: string };

const MODULES: Module[] = [
  { id: "M01", title: "Clasificación de fibra", duration: "45 min", progress: 100, status: "completado", icon: <SeedLeaf size={20} />, color: "var(--mint)" },
  { id: "M02", title: "Esquila respetuosa", duration: "60 min", progress: 100, status: "completado", icon: <ScissorsShear size={20} />, color: "var(--gold)" },
  { id: "M03", title: "Negociación digna", duration: "30 min", progress: 65, status: "en curso", icon: <ScaleBalance size={20} />, color: "var(--terracotta)" },
  { id: "M04", title: "Registros digitales", duration: "25 min", progress: 0, status: "bloqueado", icon: <ClipboardCheckArt size={20} />, color: "var(--gold-soft)" },
  { id: "M05", title: "Calidad premium", duration: "50 min", progress: 0, status: "bloqueado", icon: <StampSeal size={20} />, color: "var(--pink)" },
  { id: "M06", title: "Quechua digital", duration: "40 min", progress: 0, status: "bloqueado", icon: <BookOpen className="w-5 h-5" />, color: "var(--teal-300)" },
  { id: "M07", title: "Packaging básico", duration: "20 min", progress: 0, status: "bloqueado", icon: <ChartSparkle size={20} />, color: "var(--plum)" },
  { id: "M08", title: "Gestión de cobros", duration: "35 min", progress: 0, status: "bloqueado", icon: <ScaleBalance size={20} />, color: "var(--alpaca-brown)" },
];

const EPISODES = [
  { n: 1, title: "Negociar sin vender de menos", duration: "14:22", playing: false },
  { n: 2, title: "La fibra como patrimonio familiar", duration: "18:05", playing: false },
  { n: 3, title: "Colectivos de esquila y poder", duration: "22:40", playing: false },
];

const CERTS = [
  { title: "Clasificador de fibra certificado", date: "Mar 2026", issuer: "AlpaCash · CITE Alpaca" },
  { title: "Esquila responsable", date: "Ene 2026", issuer: "AlpaCash · ANA" },
];

export function CapacitacionTab() {
  const [playingEp, setPlayingEp] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const completed = MODULES.filter((m) => m.status === "completado").length;
  const total = MODULES.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div>
      {/* Overall progress */}
      <ArtCard className="p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60">Progreso general</div>
            <div className="font-display text-3xl mt-1" style={{ fontWeight: 700 }}>{completed} <span className="text-[var(--ink)]/40 text-2xl">/ {total} módulos</span></div>
          </div>
          <div className="font-display text-4xl text-[var(--terracotta)]" style={{ fontWeight: 800 }}>{pct}%</div>
        </div>
        <div className="h-3 bg-[var(--ink)]/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-[var(--terracotta)]"
          />
        </div>
      </ArtCard>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Modules grid */}
        <div className="lg:col-span-2">
          <SectionLabel n="N°01">Módulos de capacitación</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-3">
            {MODULES.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ArtCard className={`p-4 ${m.status === "bloqueado" ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center" style={{ background: m.color }}>
                      {m.status === "bloqueado" ? <Lock className="w-4 h-4 text-[var(--ink)]/50" /> : m.icon}
                    </div>
                    {m.status === "completado" && <Star className="w-4 h-4 text-[var(--gold)] fill-[var(--gold)]" />}
                  </div>
                  <div className="font-display text-sm mt-2" style={{ fontWeight: 600 }}>{m.title}</div>
                  <div className="text-[10px] font-mono text-[var(--ink)]/50 mt-0.5">{m.duration}</div>
                  {m.status !== "bloqueado" && (
                    <div className="mt-2 h-1.5 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: m.status === "completado" ? "var(--mint)" : "var(--terracotta)" }}
                      />
                    </div>
                  )}
                  {m.status === "en curso" && (
                    <button onClick={() => setActiveModule(m.title)} className="mt-2 w-full py-1.5 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-xs flex items-center justify-center gap-1" style={{ fontWeight: 500 }}>
                      <Play className="w-3 h-3" /> Continuar
                    </button>
                  )}
                </ArtCard>
              </motion.div>
            ))}
          </div>
          {activeModule && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--ivory)] px-4 py-3 text-sm text-[var(--teal-deep)]">
              Retomando módulo: {activeModule}.
            </div>
          )}
        </div>

        {/* Podcast */}
        <div>
          <SectionLabel n="N°02">Podcast Ayllu</SectionLabel>
          <ArtCard className="p-5 bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)] mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Audio del altiplano</div>
            <div className="font-display text-2xl mt-1" style={{ fontWeight: 700 }}>Ayllu Radio</div>
            <div className="text-xs text-[var(--ivory)]/70 mt-1">Conversaciones sobre fibra, comunidad y dignidad económica</div>
          </ArtCard>
          <div className="space-y-2">
            {EPISODES.map((ep) => (
              <ArtCard key={ep.n} className="p-4 flex items-center gap-3">
                <button
                  onClick={() => setPlayingEp(playingEp === ep.n ? null : ep.n)}
                  className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center flex-shrink-0 hover:bg-[var(--terracotta)] transition-colors"
                >
                  {playingEp === ep.n ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-display leading-tight" style={{ fontWeight: 600 }}>{ep.title}</div>
                  <div className="text-[10px] font-mono text-[var(--ink)]/50 mt-0.5">EP {ep.n} · {ep.duration}</div>
                  {playingEp === ep.n && (
                    <motion.div className="mt-1.5 h-1 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: parseFloat(ep.duration) * 60, ease: "linear", repeat: Infinity }}
                        className="h-full bg-[var(--gold)] rounded-full"
                      />
                    </motion.div>
                  )}
                </div>
              </ArtCard>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div>
        <SectionLabel n="N°03">Mis certificados</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTS.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <ArtCard className="p-5 bg-[var(--gold)]/20">
                <div className="flex items-start gap-3">
                  <StampSeal size={32} className="text-[var(--terracotta)] flex-shrink-0" />
                  <div>
                    <div className="font-display text-base" style={{ fontWeight: 700 }}>{c.title}</div>
                    <div className="text-xs text-[var(--ink)]/60 mt-1">{c.issuer}</div>
                    <div className="font-mono text-[10px] text-[var(--ink)]/50 mt-0.5">{c.date}</div>
                  </div>
                </div>
              </ArtCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
