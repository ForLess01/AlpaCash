"use client";

import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, FileText, PackageCheck } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";

const orders = [
  { id: "PO-2104", supplier: "Asoc. Tinta", total: "S/ 3,900", status: "En tránsito", eta: "28 may" },
  { id: "PO-2101", supplier: "Cabaña Sur", total: "S/ 5,240", status: "Confirmado", eta: "24 may" },
  { id: "PO-2096", supplier: "Coop. Maranganí", total: "S/ 6,448", status: "Entregado", eta: "19 may" },
];

export function ComprasTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Órdenes abiertas", value: "12", sub: "4 hoy", icon: <FileText className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Entregas esta semana", value: "8", sub: "95% a tiempo", icon: <PackageCheck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Órdenes cerradas", value: "47", sub: "QA aprobada", icon: <BadgeCheck className="w-5 h-5" />, bg: "var(--pink)" },
        ].map((card, index) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <ArtCard className="p-5">
              <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: card.bg }}>
                {card.icon}
              </div>
              <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{card.value}</div>
              <div className="text-xs text-[var(--ink)]/60">{card.label}</div>
              <div className="mt-1 font-mono text-[10px] uppercase text-[var(--ink)]/50">{card.sub}</div>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      <div>
        <SectionLabel n="N°01">Órdenes recientes</SectionLabel>
        <div className="space-y-3">
          {orders.map((order, index) => (
            <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
              <ArtCard className="p-4 flex flex-wrap items-center gap-4">
                <div>
                  <div className="font-display text-xl" style={{ fontWeight: 600 }}>{order.id}</div>
                  <div className="text-xs text-[var(--ink)]/60">{order.supplier}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-display text-lg text-[var(--terracotta)]" style={{ fontWeight: 700 }}>{order.total}</div>
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">ETA {order.eta}</div>
                </div>
                <span className="px-3 py-1 rounded-full border-2 border-[var(--ink)]/15 bg-[var(--paper)] text-[10px] font-mono uppercase">{order.status}</span>
                <button className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center gap-2">
                  Ver orden <ArrowUpRight className="w-4 h-4" />
                </button>
              </ArtCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
