"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock, AlertCircle, Download } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { ReceiptPaper, Vault, ChartSparkle } from "../../../icons/AlpaIcons";

type TxStatus = "pagado" | "pendiente" | "en proceso";
type Tx = { id: string; date: string; lot: string; buyer: string; amount: number; lb: number; status: TxStatus };
type Period = "30d" | "90d" | "año";

const TXNS: Tx[] = [
  { id: "PAG-108", date: "22 May 2026", lot: "AC-2051", buyer: "Kuna SA", amount: 3280, lb: 80, status: "pagado" },
  { id: "PAG-107", date: "18 May 2026", lot: "AC-2048", buyer: "Textiles Andina", amount: 3900, lb: 120, status: "en proceso" },
  { id: "PAG-106", date: "10 May 2026", lot: "AC-2044", buyer: "Pacomarca", amount: 3150, lb: 90, status: "pagado" },
  { id: "PAG-105", date: "28 Abr 2026", lot: "AC-2042", buyer: "Michell y Cía", amount: 4320, lb: 160, status: "pagado" },
  { id: "PAG-104", date: "15 Abr 2026", lot: "AC-2040", buyer: "Inca Tops", amount: 2580, lb: 60, status: "pendiente" },
  { id: "PAG-103", date: "3 Abr 2026", lot: "AC-2038", buyer: "Grupo Inka", amount: 5400, lb: 240, status: "pagado" },
  { id: "PAG-102", date: "20 Mar 2026", lot: "AC-2034", buyer: "Kuna SA", amount: 2100, lb: 100, status: "pagado" },
  { id: "PAG-101", date: "8 Mar 2026", lot: "AC-2030", buyer: "Pacomarca", amount: 3680, lb: 80, status: "pagado" },
  { id: "PAG-100", date: "14 Feb 2026", lot: "AC-2026", buyer: "Textiles Andina", amount: 1920, lb: 120, status: "pagado" },
  { id: "PAG-099", date: "2 Ene 2026", lot: "AC-2020", buyer: "Michell y Cía", amount: 4480, lb: 280, status: "pagado" },
];

const STATUS_ICON: Record<TxStatus, React.JSX.Element> = {
  pagado: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  pendiente: <AlertCircle className="w-4 h-4 text-amber-500" />,
  "en proceso": <Clock className="w-4 h-4 text-[var(--teal-500)]" />,
};
const STATUS_COLOR: Record<TxStatus, string> = {
  pagado: "text-emerald-700 bg-emerald-50",
  pendiente: "text-amber-700 bg-amber-50",
  "en proceso": "text-[var(--teal-500)] bg-[var(--mint)]/30",
};

export function PagosTab() {
  const [period, setPeriod] = useState<Period>("30d");

  const totalPaid = TXNS.filter((t) => t.status === "pagado").reduce((s, t) => s + t.amount, 0);
  const pending = TXNS.filter((t) => t.status === "pendiente").reduce((s, t) => s + t.amount, 0);
  const thisMonth = TXNS.filter((t) => t.date.includes("May") && t.status === "pagado").reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { l: "Total pagado", v: `S/ ${totalPaid.toLocaleString()}`, icon: <Vault size={20} />, bg: "var(--mint)" },
          { l: "Pendiente cobro", v: `S/ ${pending.toLocaleString()}`, icon: <ReceiptPaper size={20} />, bg: "var(--gold)" },
          { l: "Este mes", v: `S/ ${thisMonth.toLocaleString()}`, icon: <ChartSparkle size={20} />, bg: "var(--pink)" },
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

      {/* Table */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <SectionLabel n="N°01">Transacciones</SectionLabel>
        <div className="flex items-center gap-1">
          {(["30d", "90d", "año"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-full border-2 text-xs transition-all ${period === p ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]" : "border-[var(--ink)]/20 bg-[var(--paper)]"}`}>
              {p === "30d" ? "30 días" : p === "90d" ? "90 días" : "Este año"}
            </button>
          ))}
        </div>
      </div>

      <ArtCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--ink)]/10 bg-[var(--ivory)]">
                {["Fecha", "Lote", "Comprador", "Libras", "Monto", "Estado", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TXNS.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-[var(--ink)]/5 hover:bg-[var(--ivory)] transition-colors"
                >
                  <td className="px-4 py-3 text-xs text-[var(--ink)]/60">{t.date}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ fontWeight: 600 }}>{t.lot}</td>
                  <td className="px-4 py-3 text-sm">{t.buyer}</td>
                  <td className="px-4 py-3 font-mono text-xs">{t.lb} lb</td>
                  <td className="px-4 py-3 font-display text-sm" style={{ fontWeight: 700 }}>S/ {t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-mono uppercase ${STATUS_COLOR[t.status]}`}>
                      {STATUS_ICON[t.status]} {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {t.status === "pagado" && (
                      <button className="w-8 h-8 rounded-full bg-[var(--paper)] border border-[var(--ink)]/10 flex items-center justify-center hover:bg-[var(--ivory)] transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[var(--ink)]/10 bg-[var(--ivory)]">
                <td colSpan={4} className="px-4 py-3 font-mono text-xs text-[var(--ink)]/60">Total ({TXNS.length} transacciones)</td>
                <td className="px-4 py-3 font-display" style={{ fontWeight: 700 }}>
                  S/ {TXNS.reduce((s, t) => s + t.amount, 0).toLocaleString()}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </ArtCard>
    </div>
  );
}
