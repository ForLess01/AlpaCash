"use client";

import { motion } from "motion/react";
import { MapPinned, Truck, Warehouse } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { useLogistics } from "@/lib/hooks/useDashboardData";

export function LogisticaTab() {
  const { shipments, loading } = useLogistics();
  const activeRoutes = shipments.length;
  const delivered = shipments.filter((shipment) => shipment.progress >= 100).length;
  const fieldVehicles = shipments.filter((shipment) => shipment.progress > 0 && shipment.progress < 100).length;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: "Rutas activas", value: String(activeRoutes), icon: <MapPinned className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "En movimiento", value: String(fieldVehicles), icon: <Truck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Entregas cerradas", value: String(delivered), icon: <Warehouse className="w-5 h-5" />, bg: "var(--pink)" },
        ].map((metric, index) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <ArtCard className="p-5">
              <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: metric.bg }}>
                {metric.icon}
              </div>
              <div className="font-display text-3xl" style={{ fontWeight: 700 }}>{metric.value}</div>
              <div className="text-xs text-[var(--ink)]/60">{metric.label}</div>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      <div>
        <SectionLabel n="N°01">Seguimiento por lote</SectionLabel>
        {loading && <ArtCard className="p-4 mb-4 text-sm text-[var(--ink)]/60">Cargando seguimiento logístico real…</ArtCard>}
        <div className="space-y-3">
          {shipments.map((shipment, index) => (
            <ArtCard key={shipment.id} className="p-4" rotate={index % 2 === 0 ? -0.2 : 0.2}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-lg" style={{ fontWeight: 600 }}>{shipment.route}</div>
                  <div className="text-xs text-[var(--ink)]/60">Lote {shipment.lot} · {shipment.state}</div>
                </div>
                <span className="font-display text-xl" style={{ fontWeight: 700 }}>{shipment.progress}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--ink)]/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${shipment.progress}%` }} transition={{ duration: 0.8, delay: index * 0.1 }} className="h-full bg-[var(--teal-500)]" />
              </div>
            </ArtCard>
          ))}
          {!loading && shipments.length === 0 && <ArtCard className="p-4 text-sm text-[var(--ink)]/60">Todavía no hay rutas registradas.</ArtCard>}
        </div>
      </div>
    </div>
  );
}
