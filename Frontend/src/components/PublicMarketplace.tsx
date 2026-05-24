import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Lock, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type Lot = {
  code: string;
  image: string;
  category: string;
  quality: "Validada" | "En revisión" | "Certificable";
  color: string;
  qty: string;
  region: string;
  price: string;
  status: "Disponible" | "Reservado" | "En validación";
};

const lots: Lot[] = [
  {
    code: "AC-2048",
    image: "https://images.unsplash.com/photo-1776951647310-5ff90544136a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    category: "Baby",
    quality: "Validada",
    color: "Blanco",
    qty: "120 lb",
    region: "Puno",
    price: "S/ 32.50 / lb",
    status: "Disponible",
  },
  {
    code: "AC-2061",
    image: "https://images.unsplash.com/photo-1770122985572-ca890ef5ecf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    category: "Súper Baby",
    quality: "Certificable",
    color: "Beige",
    qty: "85 lb",
    region: "Cusco",
    price: "S/ 41.00 / lb",
    status: "Disponible",
  },
  {
    code: "AC-2073",
    image: "https://images.unsplash.com/photo-1598871956222-26b66d6559fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    category: "Fleece",
    quality: "Validada",
    color: "Marrón claro",
    qty: "210 lb",
    region: "Arequipa",
    price: "S/ 24.00 / lb",
    status: "Reservado",
  },
  {
    code: "AC-2089",
    image: "https://images.unsplash.com/photo-1670764732222-e787bccd934f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    category: "Medium Fleece",
    quality: "En revisión",
    color: "Mixto",
    qty: "160 lb",
    region: "Puno",
    price: "S/ 18.50 / lb",
    status: "En validación",
  },
];

const qualityStyles: Record<Lot["quality"], string> = {
  Validada: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "En revisión": "bg-amber-50 text-amber-700 border-amber-100",
  Certificable: "bg-sky-50 text-sky-700 border-sky-100",
};

const statusDot: Record<Lot["status"], string> = {
  Disponible: "bg-emerald-500",
  Reservado: "bg-amber-500",
  "En validación": "bg-sky-500",
};

export function PublicMarketplace({ onExplore }: { onExplore?: () => void }) {
  return (
    <section id="marketplace" className="py-24 bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">Marketplace visual</div>
            <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Lotes con identidad, no productos sin historia.
            </h2>
            <p className="mt-4 text-[var(--teal-deep)]/70 leading-relaxed">
              Vista pública limitada. Los detalles completos (productor, contacto, ubicación exacta) se liberan solo a
              compradores verificados, bajo solicitud formal y consentimiento del productor.
            </p>
          </div>
          <Button onClick={onExplore} variant="ghost" className="text-[var(--teal-deep)] hover:bg-white rounded-full">
            Explorar todos los lotes <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lots.map((l) => (
            <article key={l.code} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ivory-2)]">
                <ImageWithFallback src={l.image} alt={`Lote ${l.code}`} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-xs text-[var(--teal-deep)]" style={{ fontWeight: 500 }}>
                  {l.category}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[var(--teal-deep)]/85 text-[10px] text-[var(--ivory)] flex items-center gap-1 backdrop-blur">
                  <Lock className="w-3 h-3" /> Datos protegidos
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>Lote {l.code}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${qualityStyles[l.quality]}`}>{l.quality}</span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="text-[var(--muted-foreground)]">Color</dt>
                  <dd className="text-right text-[var(--teal-deep)]">{l.color}</dd>
                  <dt className="text-[var(--muted-foreground)]">Cantidad</dt>
                  <dd className="text-right text-[var(--teal-deep)]">{l.qty}</dd>
                  <dt className="text-[var(--muted-foreground)]">Origen</dt>
                  <dd className="text-right text-[var(--teal-deep)] flex items-center justify-end gap-1"><MapPin className="w-3 h-3 text-[var(--terracotta)]" />{l.region}</dd>
                </dl>

                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-[var(--muted-foreground)]">Precio ref. mercado</div>
                    <div className="text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>{l.price}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--teal-deep)]/80">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[l.status]}`} /> {l.status}
                  </div>
                </div>

                <button className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[var(--ivory-2)] hover:bg-[var(--gold-soft)]/40 text-[var(--teal-deep)] text-sm transition-colors">
                  <BadgeCheck className="w-4 h-4" /> Ver información general
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--muted-foreground)] text-center">
          Detalles completos disponibles para empresas verificadas. Solicita acceso desde tu cuenta de comprador.
        </p>
      </div>
    </section>
  );
}
