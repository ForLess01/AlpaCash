import { Users, Weight, PackageCheck, Building2, FileBarChart } from "lucide-react";

const metrics = [
  { icon: Users, value: "+", label: "productores registrados" },
  { icon: Weight, value: "—", label: "kg/lb de fibra trazada" },
  { icon: PackageCheck, value: "—", label: "lotes validados" },
  { icon: Building2, value: "—", label: "compradores verificados" },
  { icon: FileBarChart, value: "—", label: "reportes generados" },
];

export function Impact() {
  return (
    <section id="impacto" className="py-24 bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">Impacto</div>
            <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Métricas que crecen con cada lote.
            </h2>
          </div>
          <div className="text-sm text-[var(--muted-foreground)] max-w-xs">
            Indicadores referenciales que se actualizan con la actividad real de la plataforma.
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--gold)] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--ivory-2)] flex items-center justify-center text-[var(--teal-deep)]">
                <m.icon className="w-5 h-5" />
              </div>
              <div className="mt-5 text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>
                {m.value}
              </div>
              <div className="mt-1 text-sm text-[var(--muted-foreground)] leading-snug">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
