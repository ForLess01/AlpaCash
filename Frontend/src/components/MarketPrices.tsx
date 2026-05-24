import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Row = {
  category: string;
  avg: string;
  range: string;
  trend: "up" | "down" | "flat";
  tx: number;
  data: { m: string; v: number }[];
};

const rows: Row[] = [
  { category: "Súper Baby", avg: "S/ 41.00", range: "S/ 36 – 46", trend: "up", tx: 42, data: g(38, 41, 46) },
  { category: "Baby", avg: "S/ 32.50", range: "S/ 28 – 36", trend: "up", tx: 128, data: g(29, 32, 36) },
  { category: "Fleece", avg: "S/ 24.00", range: "S/ 21 – 27", trend: "flat", tx: 96, data: g(23, 24, 26) },
  { category: "Medium Fleece", avg: "S/ 18.50", range: "S/ 16 – 21", trend: "down", tx: 71, data: g(20, 19, 17) },
  { category: "Huarizo", avg: "S/ 14.00", range: "S/ 12 – 16", trend: "flat", tx: 33, data: g(13, 14, 14) },
  { category: "Gruesa", avg: "S/ 9.50", range: "S/ 8 – 11", trend: "down", tx: 19, data: g(11, 10, 9) },
];

function g(a: number, b: number, c: number) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const pts = [a, a + (b - a) * 0.3, b - 0.5, b, b + (c - b) * 0.5, c];
  return months.map((m, i) => ({ m, v: pts[i] }));
}

const TrendIcon = ({ t }: { t: Row["trend"] }) => {
  if (t === "up") return <TrendingUp className="w-4 h-4 text-emerald-600" />;
  if (t === "down") return <TrendingDown className="w-4 h-4 text-[var(--terracotta)]" />;
  return <Minus className="w-4 h-4 text-[var(--muted-foreground)]" />;
};

export function MarketPrices() {
  return (
    <section id="precios" className="py-24 bg-[var(--ivory-2)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">Precios de mercado</div>
            <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Negocia con datos, no con suposiciones.
            </h2>
            <p className="mt-4 text-[var(--teal-deep)]/70 leading-relaxed max-w-2xl">
              Precio promedio, rango y tendencia por categoría, calculados con transacciones verificadas dentro de AlpaCash.
            </p>
          </div>
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[var(--border)] p-4 flex items-start gap-3">
            <Info className="w-4 h-4 mt-0.5 text-[var(--teal-500)] shrink-0" />
            <p className="text-xs text-[var(--teal-deep)]/80 leading-relaxed">
              Precio referencial basado en transacciones verificadas. <strong>No representa precio garantizado</strong>. Actualizado semanalmente.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[var(--border)] overflow-hidden">
          {/* desktop table */}
          <table className="hidden md:table w-full text-sm">
            <thead className="bg-[var(--ivory)] text-[var(--muted-foreground)]">
              <tr className="text-left">
                <th className="px-6 py-4 font-normal">Categoría</th>
                <th className="px-6 py-4 font-normal">Promedio</th>
                <th className="px-6 py-4 font-normal">Rango</th>
                <th className="px-6 py-4 font-normal">Tendencia</th>
                <th className="px-6 py-4 font-normal">Histórico 6m</th>
                <th className="px-6 py-4 font-normal text-right">Transacciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((r) => (
                <tr key={r.category} className="hover:bg-[var(--ivory)]/60 transition-colors">
                  <td className="px-6 py-4 text-[var(--teal-deep)]" style={{ fontWeight: 500 }}>{r.category}</td>
                  <td className="px-6 py-4 text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>{r.avg} <span className="text-[var(--muted-foreground)]" style={{ fontWeight: 400 }}>/ lb</span></td>
                  <td className="px-6 py-4 text-[var(--teal-deep)]/80">{r.range}</td>
                  <td className="px-6 py-4"><TrendIcon t={r.trend} /></td>
                  <td className="px-6 py-4 w-40">
                    <div className="h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={r.data}>
                          <XAxis dataKey="m" hide />
                          <Tooltip
                            cursor={{ stroke: "var(--border)" }}
                            contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                            formatter={(v: number) => [`S/ ${v.toFixed(1)}`, "Precio"]}
                          />
                          <Line type="monotone" dataKey="v" stroke="var(--teal-deep)" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-[var(--muted-foreground)]">{r.tx}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* mobile cards */}
          <div className="md:hidden divide-y divide-[var(--border)]">
            {rows.map((r) => (
              <div key={r.category} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>{r.category}</div>
                  <TrendIcon t={r.trend} />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-2xl text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>{r.avg}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">/ lb</div>
                </div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)]">Rango {r.range} · {r.tx} transacciones</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
