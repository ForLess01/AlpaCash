import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera, ArrowRight, Check } from "lucide-react";
import { ScaleBalance, FiberBall, StampSeal, LotTag } from "../icons/AlpaIcons";

const steps = [
  { n: "01", t: "Foto", d: "Capturamos el lote y la IA pre-clasifica.", icon: <Camera className="w-6 h-6" /> },
  { n: "02", t: "Peso", d: "Conecta tu balanza o ingresa libras.", icon: <ScaleBalance size={26} /> },
  { n: "03", t: "Detalle", d: "Categoría, color, origen, esquila.", icon: <LotTag size={26} /> },
  { n: "04", t: "Pasaporte", d: "Generamos tu ficha técnica privada.", icon: <StampSeal size={26} /> },
];

export function NewLotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[var(--ink)]/70 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="fixed inset-x-4 top-12 sm:inset-x-0 sm:top-0 sm:bottom-0 sm:m-auto sm:max-w-2xl sm:max-h-[88vh] z-50 bg-[var(--paper)] rounded-3xl border-2 border-[var(--ink)] brutalist-shadow overflow-hidden flex flex-col"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[var(--terracotta)]/70 rotate-[2deg] rounded-sm" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center z-10">
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 pt-12 overflow-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/60">Registrar lote · 4 pasos</div>
              <h2 className="font-display text-3xl mt-1" style={{ fontWeight: 700 }}>
                Nuevo lote <em className="font-editorial text-[var(--terracotta)]" style={{ fontWeight: 400 }}>desde tu cabaña</em>
              </h2>

              {/* Stepper */}
              <div className="flex items-center gap-2 mt-6">
                {steps.map((s, i) => (
                  <div key={s.n} className="flex-1 flex items-center gap-2">
                    <div className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[var(--terracotta)]" : "bg-[var(--ink)]/10"}`} />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid sm:grid-cols-[120px_1fr] gap-5 items-start">
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl border-2 border-[var(--ink)] bg-[var(--gold)] flex items-center justify-center brutalist-shadow-sm">
                    {steps[step].icon}
                  </div>
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[var(--ink)] text-[var(--ivory)] font-mono text-[10px]">{steps[step].n}</span>
                </div>
                <div>
                  <div className="font-display text-2xl" style={{ fontWeight: 600 }}>{steps[step].t}</div>
                  <p className="text-sm text-[var(--ink)]/70 mt-1">{steps[step].d}</p>

                  {step === 0 && (
                    <div className="mt-4 aspect-video rounded-xl border-2 border-dashed border-[var(--ink)]/30 flex flex-col items-center justify-center gap-2 bg-[var(--ivory)]">
                      <Camera className="w-8 h-8 text-[var(--ink)]/40" />
                      <div className="text-xs text-[var(--ink)]/60">Toma foto o sube imagen</div>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="mt-4 p-5 rounded-xl bg-[var(--ivory)] border-2 border-[var(--ink)]/10">
                      <div className="font-mono text-[10px] uppercase text-[var(--ink)]/60">Peso bruto</div>
                      <input defaultValue="120.0" className="w-full bg-transparent outline-none font-display text-4xl mt-1" style={{ fontWeight: 700 }} />
                      <div className="text-xs text-[var(--ink)]/50 mt-1">libras (lb)</div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        ["Categoría", "Baby"],
                        ["Color", "Blanco"],
                        ["Origen", "Tinta, Puno"],
                        ["Esquila", "Mayo 2026"],
                      ].map(([k, v]) => (
                        <div key={k} className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/10">
                          <div className="text-[10px] font-mono uppercase text-[var(--ink)]/50">{k}</div>
                          <div style={{ fontWeight: 600 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {step === 3 && (
                    <div className="mt-4 p-5 rounded-2xl bg-[var(--gold)]/30 border-2 border-[var(--ink)]">
                      <div className="flex items-center gap-3">
                        <FiberBall size={36} className="text-[var(--terracotta)]" />
                        <div>
                          <div className="font-mono text-[10px] uppercase text-[var(--ink)]/60">Pasaporte generado</div>
                          <div className="font-display text-2xl" style={{ fontWeight: 700 }}>AC-2053</div>
                        </div>
                        <Check className="w-6 h-6 text-emerald-700 ml-auto" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button onClick={() => setStep(Math.max(0, step - 1))} className="px-5 py-3 rounded-full border-2 border-[var(--ink)] text-sm" disabled={step === 0}>
                  Atrás
                </button>
                <button
                  onClick={() => (step < 3 ? setStep(step + 1) : onClose())}
                  className="px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center gap-2 text-sm hover:bg-[var(--terracotta)] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {step < 3 ? "Siguiente" : "Publicar"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
