"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, FileText, PackageCheck } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { usePurchaseOrders } from "@/lib/hooks/useDashboardData";

export function ComprasTab() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { orders, loading } = usePurchaseOrders();
  const openOrders = orders.filter((order) => !order.status.toLowerCase().includes("entreg")).length;
  const closedOrders = orders.length - openOrders;
  const inTransit = orders.filter((order) => order.status.toLowerCase().includes("trans")).length;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Órdenes abiertas", value: String(openOrders), sub: `${orders.length} registradas`, icon: <FileText className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Entregas en tránsito", value: String(inTransit), sub: "Seguimiento desde transacciones", icon: <PackageCheck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Órdenes cerradas", value: String(closedOrders), sub: "Estado final confirmado", icon: <BadgeCheck className="w-5 h-5" />, bg: "var(--pink)" },
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
        {selectedOrder && (
          <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--ivory)] px-4 py-3 text-sm text-[var(--teal-deep)]">
            Orden {selectedOrder} abierta. Usá este panel para revisar proveedor, monto y ETA.
          </div>
        )}
        {loading && <ArtCard className="p-4 mb-4 text-sm text-[var(--ink)]/60">Cargando órdenes reales…</ArtCard>}
        <div className="space-y-3">
          {orders.map((order, index) => (
            <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
              <ArtCard className="p-4 flex flex-wrap items-center gap-4">
                <div>
                  <div className="font-display text-xl" style={{ fontWeight: 600 }}>{order.id}</div>
                  <div className="text-xs text-[var(--ink)]/60">{order.supplier}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-display text-lg text-[var(--terracotta)]" style={{ fontWeight: 700 }}>S/ {order.total.toLocaleString()}</div>
                  <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">ETA {order.eta}</div>
                </div>
                <span className="px-3 py-1 rounded-full border-2 border-[var(--ink)]/15 bg-[var(--paper)] text-[10px] font-mono uppercase">{order.status}</span>
                <button onClick={() => setSelectedOrder(order.id)} className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center gap-2">
                  Ver orden <ArrowUpRight className="w-4 h-4" />
                </button>
              </ArtCard>
            </motion.div>
          ))}
          {!loading && orders.length === 0 && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Todavía no hay órdenes registradas.</ArtCard>}
        </div>
      </div>
    </div>
  );
}
