"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { Vault, ReceiptPaper, ShieldWeave, ChartSparkle, ScaleBalance, HandHold } from "../../../icons/AlpaIcons";

const SCORE = 742;
const MAX_SCORE = 1000;
const DASH = 163;
const scoreDash = (SCORE / MAX_SCORE) * DASH;

const VOUCHERS = [
  { t: "Voucher esquila", v: "S/ 1,200", status: "Activo", color: "var(--terracotta)" },
  { t: "Pre-pago lote AC-2048", v: "S/ 3,900", status: "En proceso", color: "var(--gold)" },
  { t: "Seguro climático", v: "Cobertura S/ 8,000", status: "Activo", color: "var(--teal-500)" },
];

const INDICATORS = [
  { l: "Ventas verificadas", v: "8 ventas", color: "var(--mint)" },
  { l: "Cumplimiento entregas", v: "100%", color: "var(--mint)" },
  { l: "Meses en plataforma", v: "14 meses", color: "var(--gold)" },
  { l: "Capacitaciones", v: "4 / 4", color: "var(--mint)" },
];

export function FinanciamientoTab() {
  const [shared, setShared] = useState(false);

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Score gauge */}
        <ArtCard className="p-6 flex flex-col items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60 mb-4">Tu scoring financiero</div>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" stroke="#0d1f1e15" strokeWidth="6" fill="none" />
              <motion.circle
                cx="32" cy="32" r="26"
                stroke="var(--teal-700)" strokeWidth="6" fill="none" strokeLinecap="round"
                strokeDasharray={`${scoreDash} ${DASH}`}
                initial={{ strokeDasharray: `0 ${DASH}` }}
                animate={{ strokeDasharray: `${scoreDash} ${DASH}` }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-3xl" style={{ fontWeight: 800 }}>{SCORE}</div>
              <div className="text-[10px] font-mono text-[var(--ink)]/50">/ {MAX_SCORE}</div>
            </div>
          </div>
          <div className="mt-3 px-4 py-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] font-mono text-xs uppercase tracking-wider">
            Sólido
          </div>
          <p className="text-xs text-center text-[var(--ink)]/60 mt-3 max-w-[180px]">
            Basado en ventas, cumplimiento y trayectoria en AlpaCash
          </p>
        </ArtCard>

        {/* Indicators */}
        <ArtCard className="p-5">
          <SectionLabel n="N°01">Indicadores financieros</SectionLabel>
          <div className="space-y-3">
            {INDICATORS.map((ind, i) => (
              <motion.div key={ind.l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/10">
                  <span className="text-sm text-[var(--ink)]/70">{ind.l}</span>
                  <span className="font-display text-base px-3 py-0.5 rounded-full border-2 border-[var(--ink)] text-sm" style={{ fontWeight: 700, background: ind.color }}>
                    {ind.v}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </ArtCard>

        {/* Share toggle + pre-financing */}
        <div className="space-y-4">
          <ArtCard className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-base" style={{ fontWeight: 600 }}>Compartir con aliados financieros</div>
                <div className="text-xs text-[var(--ink)]/60 mt-1">Permití que bancos y cooperativas vean tu historial verificado.</div>
              </div>
              <div
                onClick={() => setShared(!shared)}
                className={`relative w-12 h-6 rounded-full border-2 border-[var(--ink)] cursor-pointer transition-colors flex-shrink-0 ${shared ? "bg-[var(--teal-500)]" : "bg-[var(--paper)]"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-[var(--ivory)] border-2 border-[var(--ink)] transition-all ${shared ? "left-6" : "left-0.5"}`} />
              </div>
            </div>
            {shared && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-3 rounded-xl bg-[var(--teal-500)]/10 border border-[var(--teal-500)]/30 text-xs text-[var(--ink)]/70">
                <ShieldWeave size={14} className="inline mr-1 text-[var(--teal-500)]" />
                Compartís: volumen de ventas, tasa de cumplimiento y antigüedad. Nunca compartís precios individuales ni datos de contacto sin consentimiento adicional.
              </motion.div>
            )}
          </ArtCard>

          <ArtCard className="p-5 bg-[var(--gold)]/20">
            <HandHold size={28} className="text-[var(--terracotta)]" />
            <div className="font-display text-lg mt-2" style={{ fontWeight: 600 }}>Pre-financiamiento disponible</div>
            <div className="font-display text-2xl text-[var(--teal-700)] mt-1" style={{ fontWeight: 800 }}>S/ 4,200</div>
            <div className="text-xs text-[var(--ink)]/60 mt-1">Estimado basado en tu score y historial de ventas</div>
            <button className="mt-3 w-full py-2.5 rounded-full border-2 border-[var(--ink)] text-sm" style={{ fontWeight: 500 }}>
              Ver condiciones
            </button>
          </ArtCard>
        </div>
      </div>

      {/* Vouchers */}
      <SectionLabel n="N°02">Vouchers y garantías activas</SectionLabel>
      <div className="grid sm:grid-cols-3 gap-4">
        {VOUCHERS.map((v, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <ArtCard className="p-5">
              <div className="w-12 h-12 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: v.color }}>
                <ReceiptPaper size={22} className="text-[var(--ivory)]" />
              </div>
              <div className="font-display text-base" style={{ fontWeight: 600 }}>{v.t}</div>
              <div className="font-display text-xl text-[var(--teal-700)] mt-1" style={{ fontWeight: 700 }}>{v.v}</div>
              <span className={`mt-2 inline-block px-3 py-0.5 rounded-full text-[10px] font-mono uppercase border-2 border-[var(--ink)] ${v.status === "Activo" ? "bg-[var(--mint)]" : "bg-[var(--gold-soft)]"}`}>
                {v.status}
              </span>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      {/* Certified sales history */}
      <div className="mt-8">
        <SectionLabel n="N°03">Historial de ventas certificadas</SectionLabel>
        <ArtCard className="p-5">
          <div className="space-y-2">
            {[
              { date: "May 2026", lot: "AC-2051", amount: "S/ 3,280", certified: true },
              { date: "Abr 2026", lot: "AC-2042", amount: "S/ 4,320", certified: true },
              { date: "Mar 2026", lot: "AC-2034", amount: "S/ 2,100", certified: true },
              { date: "Feb 2026", lot: "AC-2026", amount: "S/ 1,920", certified: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/10">
                <ChartSparkle size={18} className="text-[var(--teal-500)]" />
                <span className="font-mono text-xs text-[var(--ink)]/50 w-16">{s.date}</span>
                <span className="font-mono text-sm flex-1">{s.lot}</span>
                <span className="font-display text-base" style={{ fontWeight: 700 }}>{s.amount}</span>
                {s.certified && <ScaleBalance size={16} className="text-emerald-600" />}
              </div>
            ))}
          </div>
        </ArtCard>
      </div>
    </div>
  );
}
