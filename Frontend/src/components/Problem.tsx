import { Layers3, ShieldQuestion, LineChart } from "lucide-react";

const items = [
  {
    icon: Layers3,
    title: "Fibra sin identidad",
    body: "Cuando el lote se mezcla o no se registra, el productor pierde trazabilidad y poder de negociación.",
  },
  {
    icon: ShieldQuestion,
    title: "Compras con incertidumbre",
    body: "Las empresas necesitan elegir fibra confiable, clasificada y respaldada por información verificable.",
  },
  {
    icon: LineChart,
    title: "Historial invisible",
    body: "Sin registros comerciales, el productor tiene menos herramientas para sustentar financiamiento o convenios.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="py-24 bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">Problema real</div>
          <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
            La fibra se pierde donde la confianza falta.
          </h2>
          <p className="mt-4 text-[var(--teal-deep)]/70 leading-relaxed">
            Hoy, miles de kilos de fibra de alpaca cambian de manos sin registro, sin clasificación verificable y sin
            historial. Tres realidades que limitan a productores y compradores por igual.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="group bg-white rounded-2xl border border-[var(--border)] p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--ivory-2)] flex items-center justify-center text-[var(--terracotta)] group-hover:bg-[var(--terracotta)] group-hover:text-white transition-colors">
                <it.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>{it.title}</h3>
              <p className="mt-2 text-sm text-[var(--teal-deep)]/70 leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
