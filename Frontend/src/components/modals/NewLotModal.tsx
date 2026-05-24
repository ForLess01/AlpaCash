"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { ScaleBalance, FiberBall, StampSeal, LotTag } from "../icons/AlpaIcons";
import { createClient } from "@/lib/supabase/client";
import {
  isLettersOnly,
  normalizeSpaces,
  sanitizeAlphanumeric,
  sanitizeDecimal,
  sanitizeLetters,
} from "@/lib/forms/validation";

type Categoria = { id: string; nombre: string; nivel_calidad: number | null };

const steps = [
  { n: "01", t: "Foto", d: "Capturamos el lote para tu pasaporte.", icon: <Camera className="w-6 h-6" /> },
  { n: "02", t: "Peso", d: "Conectá tu balanza o ingresá libras.", icon: <ScaleBalance size={26} /> },
  { n: "03", t: "Detalle", d: "Categoría, color, origen, esquila, precio.", icon: <LotTag size={26} /> },
  { n: "04", t: "Pasaporte", d: "Generamos tu ficha técnica y publicamos.", icon: <StampSeal size={26} /> },
];

export function NewLotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productorId, setProductorId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [peso, setPeso] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [color, setColor] = useState("Blanco");
  const [ubicacion, setUbicacion] = useState("");
  const [fechaEsquila, setFechaEsquila] = useState("");
  const [precio, setPrecio] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function loadContext() {
      setLoadError(null);
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setLoadError("Iniciá sesión para registrar un lote.");
        return;
      }

      const [{ data: prodRow, error: prodErr }, { data: cats, error: catsErr }] = await Promise.all([
        supabase.from("productores").select("id").eq("profile_id", user.id).single(),
        supabase.from("categorias_fibra").select("id, nombre, nivel_calidad").order("nivel_calidad", { ascending: true }),
      ]);

      if (cancelled) return;

      if (prodErr || !prodRow) {
        setLoadError("Tu perfil aún no está asociado a un productor. Completá tus datos primero.");
        return;
      }
      setProductorId(prodRow.id as string);

      if (catsErr) {
        setLoadError(`No pude cargar categorías: ${catsErr.message}`);
        return;
      }
      setCategorias((cats ?? []) as Categoria[]);
      if (cats && cats.length > 0 && !categoriaId) {
        setCategoriaId(cats[0].id as string);
      }
    }

    loadContext();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function resetWizard() {
    setStep(0);
    setPeso("");
    setColor("Blanco");
    setUbicacion("");
    setFechaEsquila("");
    setPrecio("");
    setSubmitError(null);
    setCreatedCode(null);
  }

  function handleClose() {
    resetWizard();
    onClose();
  }

  function validateStep(current: number): string | null {
    if (current === 1) {
      const n = Number(peso);
      if (!peso || isNaN(n) || n <= 0) return "Ingresá un peso válido en libras.";
    }
    if (current === 2) {
      if (!categoriaId) return "Elegí una categoría.";
      const p = Number(precio);
      if (!precio || isNaN(p) || p <= 0) return "Ingresá un precio por libra válido.";
      if (color && !isLettersOnly(color)) return "El color solo puede contener letras.";
      if (ubicacion && !/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s,.'-]+$/.test(normalizeSpaces(ubicacion))) {
        return "La ubicación solo puede contener letras y separadores simples.";
      }
    }
    return null;
  }

  async function handlePublish() {
    setSubmitError(null);
    if (!productorId) {
      setSubmitError("Falta tu perfil de productor.");
      return;
    }
    const pesoLb = Number(peso);
    const precioLb = Number(precio);
    if (!pesoLb || !precioLb || !categoriaId) {
      setSubmitError("Hay datos incompletos en los pasos anteriores.");
      return;
    }

    setSubmitting(true);
    try {
      const codigo = `AC-${Date.now().toString(36).toUpperCase()}`;
      const supabase = createClient();
      const { error } = await supabase.from("lotes_fibra").insert({
        productor_id: productorId,
        categoria_id: categoriaId,
        codigo_lote: codigo,
        peso_libras: pesoLb,
        peso_disponible: pesoLb,
        color: normalizeSpaces(color) || null,
        precio_por_libra: precioLb,
        ubicacion_general: normalizeSpaces(ubicacion) || null,
        fecha_esquila: fechaEsquila || null,
        estado: "disponible",
      });
      if (error) {
        setSubmitError(error.message);
        return;
      }
      setCreatedCode(codigo);
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    const err = validateStep(step);
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError(null);
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    handlePublish();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-[var(--ink)]/70 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="fixed inset-x-4 top-12 sm:inset-x-0 sm:top-0 sm:bottom-0 sm:m-auto sm:max-w-2xl sm:max-h-[88vh] z-50 bg-[var(--paper)] rounded-3xl border-2 border-[var(--ink)] brutalist-shadow overflow-hidden flex flex-col"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[var(--terracotta)]/70 rotate-[2deg] rounded-sm" />
            <button onClick={handleClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center z-10">
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 pt-12 overflow-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/60">Registrar lote · 4 pasos</div>
              <h2 className="font-display text-3xl mt-1" style={{ fontWeight: 700 }}>
                Nuevo lote <em className="font-editorial text-[var(--terracotta)]" style={{ fontWeight: 400 }}>desde tu cabaña</em>
              </h2>

              {loadError && (
                <div className="mt-4 p-3 rounded-xl bg-[var(--pink)]/40 border border-[var(--terracotta)]/30 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[var(--terracotta-deep)] mt-0.5 shrink-0" />
                  <span>{loadError}</span>
                </div>
              )}

              {/* Stepper */}
              <div className="flex items-center gap-2 mt-6">
                {steps.map((_, i) => (
                  <div key={i} className="flex-1 flex items-center gap-2">
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
                      <div className="text-xs text-[var(--ink)]/60">La foto del lote es opcional en esta versión. Podés continuar y publicar con los datos comerciales.</div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="mt-4 p-5 rounded-xl bg-[var(--ivory)] border-2 border-[var(--ink)]/10">
                      <label htmlFor="peso" className="font-mono text-[10px] uppercase text-[var(--ink)]/60">Peso bruto (lb)</label>
                      <input
                        id="peso"
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        min="0"
                        value={peso}
                        onChange={(e) => setPeso(sanitizeDecimal(e.target.value, 1))}
                        placeholder="120.0"
                        className="w-full bg-transparent outline-none font-display text-4xl mt-1"
                        style={{ fontWeight: 700 }}
                      />
                      <div className="text-xs text-[var(--ink)]/50 mt-1">libras (lb) · mínimo 0.1</div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label htmlFor="cat" className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Categoría</label>
                        <select
                          id="cat"
                          value={categoriaId}
                          onChange={(e) => setCategoriaId(e.target.value)}
                          className="mt-1 w-full p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/15 outline-none"
                          style={{ fontWeight: 600 }}
                        >
                          {categorias.length === 0 && <option value="">Cargando…</option>}
                          {categorias.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="color" className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Color</label>
                          <input
                            id="color"
                            value={color}
                            onChange={(e) => setColor(sanitizeLetters(e.target.value))}
                            placeholder="Blanco / Beige / Marrón"
                            className="mt-1 w-full p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/15 outline-none"
                            style={{ fontWeight: 600 }}
                          />
                        </div>
                        <div>
                          <label htmlFor="precio" className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Precio / lb (S/)</label>
                          <input
                            id="precio"
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            min="0"
                            value={precio}
                            onChange={(e) => setPrecio(sanitizeDecimal(e.target.value))}
                            placeholder="32.50"
                            className="mt-1 w-full p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/15 outline-none"
                            style={{ fontWeight: 600 }}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="ubic" className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Origen (referencia general)</label>
                        <input
                          id="ubic"
                          value={ubicacion}
                          onChange={(e) => setUbicacion(sanitizeAlphanumeric(e.target.value))}
                          placeholder="Tinta, Cusco"
                          className="mt-1 w-full p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/15 outline-none"
                          style={{ fontWeight: 600 }}
                        />
                      </div>

                      <div>
                        <label htmlFor="esquila" className="text-[10px] font-mono uppercase text-[var(--ink)]/50">Fecha de esquila</label>
                        <input
                          id="esquila"
                          type="date"
                          value={fechaEsquila}
                          onChange={(e) => setFechaEsquila(e.target.value)}
                          className="mt-1 w-full p-3 rounded-xl bg-[var(--ivory)] border border-[var(--ink)]/15 outline-none"
                          style={{ fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-4 p-5 rounded-2xl bg-[var(--gold)]/30 border-2 border-[var(--ink)]">
                      <div className="flex items-center gap-3">
                        <FiberBall size={36} className="text-[var(--terracotta)]" />
                        <div>
                          <div className="font-mono text-[10px] uppercase text-[var(--ink)]/60">
                            {createdCode ? "Pasaporte generado" : "Listo para publicar"}
                          </div>
                          <div className="font-display text-2xl" style={{ fontWeight: 700 }}>
                            {createdCode ?? `${peso} lb · S/ ${precio || "0"}/lb`}
                          </div>
                        </div>
                        {createdCode && <Check className="w-6 h-6 text-emerald-700 ml-auto" />}
                      </div>
                      {!createdCode && (
                        <div className="mt-3 text-xs text-[var(--ink)]/70 space-y-1">
                          <div>Categoría: <span style={{ fontWeight: 600 }}>{categorias.find((c) => c.id === categoriaId)?.nombre ?? "—"}</span></div>
                          <div>Color: <span style={{ fontWeight: 600 }}>{color || "—"}</span></div>
                          <div>Origen: <span style={{ fontWeight: 600 }}>{ubicacion || "—"}</span></div>
                          <div>Esquila: <span style={{ fontWeight: 600 }}>{fechaEsquila || "—"}</span></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="mt-4 p-3 rounded-xl bg-[var(--pink)]/40 border border-[var(--terracotta)]/30 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[var(--terracotta-deep)] mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className="px-5 py-3 rounded-full border-2 border-[var(--ink)] text-sm disabled:opacity-40"
                  disabled={step === 0 || !!createdCode}
                >
                  Atrás
                </button>
                {createdCode ? (
                  <button
                    onClick={handleClose}
                    className="px-5 py-3 rounded-full bg-[var(--terracotta)] text-white flex items-center gap-2 text-sm"
                    style={{ fontWeight: 500 }}
                  >
                    Cerrar <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={submitting || !!loadError}
                    className="px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center gap-2 text-sm hover:bg-[var(--terracotta)] transition-colors disabled:opacity-50"
                    style={{ fontWeight: 500 }}
                  >
                    {step < 3 ? "Siguiente" : submitting ? "Publicando…" : "Publicar"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
