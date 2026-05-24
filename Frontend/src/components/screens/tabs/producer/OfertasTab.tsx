"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, X, MessageSquare, Clock } from "lucide-react";
import { ArtCard, SectionLabel } from "../../DashShell";
import { HandHold, FactorySimple } from "../../../icons/AlpaIcons";

type OfferStatus = "pendiente" | "aceptada" | "rechazada" | "contraoferta" | "contra-enviada";

type Offer = {
  id: string;
  buyer: string;
  lot: string;
  offerPrice: number;
  askPrice: number;
  lb: number;
  time: string;
  status: OfferStatus;
  counterPrice?: number;
};

const INITIAL_OFFERS: Offer[] = [
  { id: "OF-001", buyer: "Textiles Andina SAC", lot: "AC-2049", offerPrice: 24.5, askPrice: 24.1, lb: 240, time: "hace 12 min", status: "pendiente" },
  { id: "OF-002", buyer: "Pacomarca Export", lot: "AC-2048", offerPrice: 33.0, askPrice: 32.5, lb: 120, time: "hace 1 h", status: "pendiente" },
  { id: "OF-003", buyer: "Grupo Inka Textil", lot: "AC-2056", offerPrice: 20.0, askPrice: 22.0, lb: 200, time: "hace 3 h", status: "pendiente" },
];

const HISTORY: Offer[] = [
  { id: "OF-099", buyer: "Kuna SA", lot: "AC-2044", offerPrice: 35.0, askPrice: 34.0, lb: 90, time: "hace 2 días", status: "aceptada" },
  { id: "OF-098", buyer: "Michell y Cía", lot: "AC-2040", offerPrice: 18.0, askPrice: 24.0, lb: 180, time: "hace 4 días", status: "rechazada" },
  { id: "OF-097", buyer: "Inca Tops", lot: "AC-2038", offerPrice: 41.0, askPrice: 43.0, lb: 60, time: "hace 5 días", status: "contra-enviada" },
];

const STATUS_LABELS: Record<OfferStatus, string> = {
  pendiente: "Pendiente",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  contraoferta: "En contraoferta",
  "contra-enviada": "Contra enviada",
};
const STATUS_COLORS: Record<OfferStatus, string> = {
  pendiente: "bg-[var(--gold)] border-[var(--ink)]",
  aceptada: "bg-[var(--mint)] border-[var(--ink)]",
  rechazada: "bg-[var(--pink)] border-[var(--ink)]",
  contraoferta: "bg-[var(--gold-soft)] border-[var(--ink)]",
  "contra-enviada": "bg-[var(--teal-300)] border-[var(--ink)]",
};

export function OfertasTab() {
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [counterInputs, setCounterInputs] = useState<Record<string, string>>({});

  const accept = (id: string) => setOffers((prev) => prev.map((o) => o.id === id ? { ...o, status: "aceptada" } : o));
  const reject = (id: string) => setOffers((prev) => prev.map((o) => o.id === id ? { ...o, status: "rechazada" } : o));
  const startCounter = (id: string, ask: number) => {
    setCounterInputs((prev) => ({ ...prev, [id]: ask.toString() }));
    setOffers((prev) => prev.map((o) => o.id === id ? { ...o, status: "contraoferta" } : o));
  };
  const sendCounter = (id: string) => {
    const val = parseFloat(counterInputs[id] || "0");
    setOffers((prev) => prev.map((o) => o.id === id ? { ...o, status: "contra-enviada", counterPrice: val } : o));
  };

  const pending = offers.filter((o) => o.status === "pendiente" || o.status === "contraoferta");
  const resolved = [...offers.filter((o) => o.status !== "pendiente" && o.status !== "contraoferta"), ...HISTORY];

  return (
    <div>
      {/* Pending offers */}
      <div className="mb-8">
        <SectionLabel n="N°01">Ofertas pendientes · {pending.length}</SectionLabel>
        {pending.length === 0 && (
          <ArtCard className="p-8 text-center text-[var(--ink)]/50">
            <HandHold size={32} className="mx-auto mb-2 text-[var(--ink)]/30" />
            <div className="text-sm">Sin ofertas pendientes</div>
          </ArtCard>
        )}
        <div className="space-y-3">
          {pending.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <ArtCard className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--gold)]/40 border-2 border-[var(--ink)] flex items-center justify-center">
                      <FactorySimple size={22} />
                    </div>
                    <div>
                      <div className="font-display text-lg" style={{ fontWeight: 600 }}>{o.buyer}</div>
                      <div className="text-xs text-[var(--ink)]/60">Lote <span className="font-mono">{o.lot}</span> · {o.lb} lb · {o.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-[var(--terracotta)]" style={{ fontWeight: 700 }}>S/ {o.offerPrice}</div>
                    <div className="text-[10px] font-mono text-[var(--ink)]/50">oferta · pedido S/ {o.askPrice}</div>
                    {o.offerPrice > o.askPrice && (
                      <div className="text-[10px] text-emerald-700 font-mono">+{((o.offerPrice - o.askPrice) / o.askPrice * 100).toFixed(1)}% sobre precio</div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {o.status === "contraoferta" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/10"
                    >
                      <div className="font-mono text-[10px] uppercase text-[var(--ink)]/60 mb-2">Tu contraoferta (S/ por libra)</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.5"
                          value={counterInputs[o.id] || ""}
                          onChange={(e) => setCounterInputs((p) => ({ ...p, [o.id]: e.target.value }))}
                          className="w-28 px-3 py-2 rounded-xl border-2 border-[var(--ink)] bg-[var(--paper)] font-display text-xl outline-none"
                          style={{ fontWeight: 700 }}
                        />
                        <button
                          onClick={() => sendCounter(o.id)}
                          className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center gap-2"
                          style={{ fontWeight: 500 }}
                        >
                          Enviar <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <button onClick={() => setOffers((prev) => prev.map((of) => of.id === o.id ? { ...of, status: "pendiente" } : of))} className="px-4 py-2 rounded-full border-2 border-[var(--ink)] text-sm">
                          Cancelar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {o.status === "pendiente" && (
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => accept(o.id)} className="flex-1 px-4 py-2.5 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm flex items-center justify-center gap-2" style={{ fontWeight: 500 }}>
                      <Check className="w-4 h-4" /> Aceptar
                    </button>
                    <button onClick={() => startCounter(o.id, o.askPrice)} className="flex-1 px-4 py-2.5 rounded-full border-2 border-[var(--ink)] text-sm flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Contraoferta
                    </button>
                    <button onClick={() => reject(o.id)} className="px-4 py-2.5 rounded-full border-2 border-[var(--terracotta)]/60 text-[var(--terracotta)] text-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </ArtCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <SectionLabel n="N°02">Historial de negociaciones</SectionLabel>
        <div className="space-y-2">
          {resolved.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
              <ArtCard className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--ivory)] border-2 border-[var(--ink)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--ink)]/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm" style={{ fontWeight: 600 }}>{o.buyer}</div>
                  <div className="text-xs text-[var(--ink)]/60 truncate">{o.lot} · {o.lb} lb · S/ {o.offerPrice}/lb · {o.time}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border-2 flex-shrink-0 ${STATUS_COLORS[o.status]}`}>
                  {STATUS_LABELS[o.status]}
                </span>
              </ArtCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
