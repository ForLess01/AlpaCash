import Link from "next/link";
import { ArrowLeft, Camera, CheckCircle2, FileText, Scale } from "lucide-react";

const steps = [
  {
    title: "Identificá tu lote",
    description: "Definí categoría, color, campaña y comunidad para que el lote nazca con contexto comercial real.",
    icon: <FileText className="w-5 h-5" />,
    accent: "var(--gold)",
  },
  {
    title: "Pesá y fotografiá",
    description: "Subí fotos claras, registrá el peso calibrado y dejá evidencia lista para compradores y aliados.",
    icon: <Camera className="w-5 h-5" />,
    accent: "var(--mint)",
  },
  {
    title: "Publicá con confianza",
    description: "Tu historial, trazabilidad y validaciones elevan el valor del lote desde el primer contacto.",
    icon: <CheckCircle2 className="w-5 h-5" />,
    accent: "var(--pink)",
  },
];

export default function PrimerLotePage() {
  return (
    <main className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] px-5 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--ink)]/15 bg-[var(--paper)] text-sm mb-8 hover:bg-[var(--ivory-2)] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/55 mb-3">Primer registro · Productor</div>
            <h1 className="font-display leading-[0.95] text-[var(--ink)]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 500 }}>
              Registrar tu primer lote
              <br />
              <em className="font-editorial text-[var(--terracotta)]" style={{ fontWeight: 400 }}>sin perder</em> contexto.
            </h1>
            <p className="mt-5 max-w-2xl font-editorial italic text-xl text-[var(--ink)]/78 leading-snug">
              “Esto ya no es una demo. Es el flujo real para que un productor entre, documente su fibra y salga al mercado con una historia verificable.”
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div key={step.title} className="rounded-3xl border-2 border-[var(--ink)] bg-[var(--paper)] p-5 brutalist-shadow-sm">
                  <div className="w-11 h-11 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center" style={{ background: step.accent }}>
                    {step.icon}
                  </div>
                  <div className="font-display text-2xl mt-4" style={{ fontWeight: 600 }}>{step.title}</div>
                  <p className="text-sm text-[var(--ink)]/70 mt-2 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--paper)] p-6 brutalist-shadow-sm lg:sticky lg:top-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/55">Ruta sugerida</div>
            <div className="font-display text-3xl mt-3" style={{ fontWeight: 600 }}>Entrá como productor</div>
            <p className="text-sm text-[var(--ink)]/72 mt-3 leading-relaxed">
              Si ya tenés cuenta, iniciá sesión. Si todavía no, registrate y después vas a poder crear tu lote desde el dashboard del productor con el flujo completo.
            </p>

            <div className="mt-6 space-y-3">
              <Link href="/auth/register" className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm" style={{ fontWeight: 600 }}>
                Crear cuenta de productor
              </Link>
              <Link href="/auth/login" className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border-2 border-[var(--ink)] text-sm bg-[var(--ivory)]" style={{ fontWeight: 600 }}>
                Ya tengo cuenta
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-[var(--gold)]/35 border border-[var(--ink)]/10 p-4">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5" />
                <div>
                  <div className="font-display text-lg" style={{ fontWeight: 600 }}>Checklist mínimo</div>
                  <div className="text-xs text-[var(--ink)]/65 mt-1">Categoría, color, peso, fotos, origen y disponibilidad comercial.</div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
