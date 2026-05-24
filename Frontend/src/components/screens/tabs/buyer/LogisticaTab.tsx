"use client";

import { motion } from "motion/react";
import { MapPinned, Truck, Warehouse } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";

const shipments = [
  { route: "Tinta → Cusco → Lima", lot: "AC-2048", progress: 82, state: "Centro de consolidación" },
  { route: "Maranganí → Sicuani", lot: "AC-2052", progress: 55, state: "Pesaje de salida" },
  { route: "Puno → Juliaca", lot: "AC-2065", progress: 31, state: "Recojo programado" },
];

export function LogisticaTab() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: "Rutas activas", value: "9", icon: <MapPinned className="w-5 h-5" />, bg: "var(--gold)" },
          { label: "Vehículos en campo", value: "14", icon: <Truck className="w-5 h-5" />, bg: "var(--mint)" },
          { label: "Hubs operativos", value: "3", icon: <Warehouse className="w-5 h-5" />, bg: "var(--pink)" },
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
        <div className="space-y-3">
          {shipments.map((shipment, index) => (
            <ArtCard key={shipment.lot} className="p-4" rotate={index % 2 === 0 ? -0.2 : 0.2}>
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
        </div>
      </div>
    </div>
  );
}
