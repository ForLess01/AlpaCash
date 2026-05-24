"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { ReceiptPaper, ShieldWeave, ChartSparkle, ScaleBalance, HandHold } from "../../../icons/AlpaIcons";
import { useCredits, usePayments, useVouchers } from "@/lib/hooks/useDashboardData";

const MAX_SCORE = 1000;
const DASH = 163;

export function FinanciamientoTab() {
  const [shared, setShared] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { credits, loading: creditsLoading } = useCredits();
  const { vouchers, loading: vouchersLoading } = useVouchers();
  const { payments, loading: paymentsLoading } = usePayments();

  const score = useMemo(() => {
    if (credits.length === 0) return 0;
    const avg = credits.reduce((sum, item) => sum + item.score, 0) / credits.length;
    return Math.round(avg);
  }, [credits]);
  const scoreDash = (score / MAX_SCORE) * DASH;
  const verifiedSales = payments.filter((payment) => payment.status === "pagado").length;
  const totalFinancing = vouchers.reduce((sum, voucher) => sum + Number(voucher.amountLabel.replace(/[^\d.-]/g, "") || 0), 0);
  const activeCoverage = vouchers.filter((voucher) => voucher.status.toLowerCase().includes("activ")).length;
  const eligibleCredits = credits.filter((credit) => !credit.status.toLowerCase().includes("rech")).length;

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
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
              <div className="font-display text-3xl" style={{ fontWeight: 800 }}>{score || "N/D"}</div>
              <div className="text-[10px] font-mono text-[var(--ink)]/50">/ {MAX_SCORE}</div>
            </div>
          </div>
          <div className="mt-3 px-4 py-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] font-mono text-xs uppercase tracking-wider">
            {score >= 700 ? "Sólido" : score >= 500 ? "En desarrollo" : "Inicial"}
          </div>
          <p className="text-xs text-center text-[var(--ink)]/60 mt-3 max-w-[180px]">
            Basado en evaluaciones crediticias reales y actividad financiera disponible.
          </p>
        </ArtCard>

        <ArtCard className="p-5">
          <SectionLabel n="N°01">Indicadores financieros</SectionLabel>
          <div className="space-y-3">
            {[
              { l: "Ventas verificadas", v: `${verifiedSales} ventas`, color: "var(--mint)" },
              { l: "Coberturas activas", v: `${activeCoverage}`, color: "var(--mint)" },
              { l: "Solicitudes elegibles", v: `${eligibleCredits}`, color: "var(--gold)" },
              { l: "Actividad total", v: `S/ ${totalFinancing.toLocaleString()}`, color: "var(--mint)" },
            ].map((ind, i) => (
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

        <div className="space-y-4">
          <ArtCard className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-base" style={{ fontWeight: 600 }}>Compartir con aliados financieros</div>
                <div className="text-xs text-[var(--ink)]/60 mt-1">Preferencia visible en la UI mientras cerramos el consentimiento persistido.</div>
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
                Compartís volumen agregado y score. La persistencia formal del consentimiento necesita una columna dedicada en backend.
              </motion.div>
            )}
          </ArtCard>

          <ArtCard className="p-5 bg-[var(--gold)]/20">
            <HandHold size={28} className="text-[var(--terracotta)]" />
            <div className="font-display text-lg mt-2" style={{ fontWeight: 600 }}>Pre-financiamiento observable</div>
            <div className="font-display text-2xl text-[var(--teal-700)] mt-1" style={{ fontWeight: 800 }}>S/ {totalFinancing.toLocaleString()}</div>
            <div className="text-xs text-[var(--ink)]/60 mt-1">Estimado usando vouchers y actividad financiera disponible</div>
            <button onClick={() => setShowTerms((prev) => !prev)} className="mt-3 w-full py-2.5 rounded-full border-2 border-[var(--ink)] text-sm" style={{ fontWeight: 500 }}>
              Ver condiciones
            </button>
            {showTerms && (
              <div className="mt-3 rounded-xl border border-[var(--ink)]/10 bg-[var(--paper)] p-3 text-xs text-[var(--ink)]/70">
                Basado en scoring, transacciones pagadas y cobertura activa. Para reglas duras todavía conviene cerrar una policy de backend específica.
              </div>
            )}
          </ArtCard>
        </div>
      </div>

      <SectionLabel n="N°02">Vouchers y garantías activas</SectionLabel>
      {(creditsLoading || vouchersLoading || paymentsLoading) && <ArtCard className="p-4 mb-4 text-sm text-[var(--ink)]/60">Cargando actividad financiera real…</ArtCard>}
      <div className="grid sm:grid-cols-3 gap-4">
        {vouchers.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <ArtCard className="p-5">
              <div className="w-12 h-12 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: i % 2 === 0 ? 'var(--terracotta)' : 'var(--gold)' }}>
                <ReceiptPaper size={22} className="text-[var(--ivory)]" />
              </div>
              <div className="font-display text-base" style={{ fontWeight: 600 }}>{v.title}</div>
              <div className="font-display text-xl text-[var(--teal-700)] mt-1" style={{ fontWeight: 700 }}>{v.amountLabel}</div>
              <span className="mt-2 inline-block px-3 py-0.5 rounded-full text-[10px] font-mono uppercase border-2 border-[var(--ink)] bg-[var(--mint)]">
                {v.status}
              </span>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <SectionLabel n="N°03">Historial de ventas certificadas</SectionLabel>
        <ArtCard className="p-5">
          <div className="space-y-2">
            {payments.slice(0, 6).map((sale) => (
              <div key={sale.id} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/10">
                <ChartSparkle size={18} className="text-[var(--teal-500)]" />
                <span className="font-mono text-xs text-[var(--ink)]/50 w-24">{sale.date}</span>
                <span className="font-mono text-sm flex-1">{sale.lot}</span>
                <span className="font-display text-base" style={{ fontWeight: 700 }}>S/ {sale.amount.toLocaleString()}</span>
                <ScaleBalance size={16} className="text-emerald-600" />
              </div>
            ))}
          </div>
        </ArtCard>
      </div>
    </div>
  );
}
