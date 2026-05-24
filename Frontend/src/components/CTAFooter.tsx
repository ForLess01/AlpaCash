import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTAFooter() {
  return (
    <>
      <section className="py-24 bg-[var(--ivory-2)] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden aspect-[16/10]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1568805711729-f0cde40b5b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
              alt="Paisaje altoandino"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--teal-deep)]/70 via-[var(--teal-deep)]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-[var(--ivory)]">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--gold-soft)]">Del altiplano</div>
              <div className="text-2xl mt-1" style={{ fontWeight: 600 }}>Origen, comunidad, territorio.</div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl tracking-tight text-[var(--teal-deep)]" style={{ fontWeight: 600, lineHeight: 1.1 }}>
              Tu fibra tiene historia. Hazla verificable.
            </h2>
            <p className="mt-4 text-[var(--teal-deep)]/70 leading-relaxed">
              Cada venta registrada fortalece tu historial. Cada lote validado aumenta la confianza del comprador.
              Empieza con tu primer registro.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-[var(--teal-deep)] hover:bg-[var(--teal-700)] text-[var(--ivory)] rounded-full px-6 h-12">
                <Link href="/primer-lote">
                  Registrar mi primer lote <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-[var(--teal-deep)] rounded-full px-5 h-12 hover:bg-white">
                <Link href="/contacto">
                  Hablar con el equipo
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-[var(--muted-foreground)] leading-relaxed">
              Este reporte no aprueba créditos; resume evidencia comercial. AlpaCash es una red de confianza, no una
              entidad financiera.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--teal-deep)] text-[var(--ivory)]/80 py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/ALPACASH.svg" alt="AlpaCash Logo" className="h-9 w-9" />
              <span className="text-[var(--ivory)]" style={{ fontWeight: 600 }}>AlpaCash</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Red privada de confianza comercial para la fibra de alpaca peruana. Trazabilidad, historial y valor justo.
            </p>
          </div>
          <div>
            <div className="text-[var(--ivory)] mb-3" style={{ fontWeight: 500 }}>Plataforma</div>
            <ul className="space-y-2 text-sm">
              <li>Productores</li>
              <li>Compradores</li>
              <li>Aliados</li>
              <li>Precios referenciales</li>
            </ul>
          </div>
          <div>
            <div className="text-[var(--ivory)] mb-3" style={{ fontWeight: 500 }}>Sobre</div>
            <ul className="space-y-2 text-sm">
              <li>Historia</li>
              <li>Confianza y datos</li>
              <li>Contacto</li>
              <li>Términos</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[var(--ivory)]/50">
          <span>© {new Date().getFullYear()} AlpaCash · Perú</span>
          <span>Lotes validados, información protegida.</span>
        </div>
      </footer>
    </>
  );
}
