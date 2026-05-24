import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, ShieldCheck, BadgeCheck, Lock } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  children,
  onBack,
  image,
  eyebrow,
  quote,
}: {
  children: ReactNode;
  onBack?: () => void;
  image?: string;
  eyebrow?: string;
  quote?: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--ivory)]">
      {/* form side */}
      <div className="flex flex-col px-6 sm:px-12 py-8">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-[var(--teal-deep)]/80 hover:text-[var(--teal-deep)]">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <a href="#" className="flex items-center gap-2">
            <img src="/ALPACASH.svg" alt="AlpaCash Logo" className="h-8 w-auto" />
            <span className="text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>AlpaCash</span>
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <div className="text-xs text-[var(--muted-foreground)] text-center">
          © {new Date().getFullYear()} AlpaCash · Tus datos están protegidos.
        </div>
      </div>

      {/* visual side */}
      <div className="hidden lg:block relative">
        <ImageWithFallback
          src={image || "https://images.unsplash.com/photo-1552474705-dd8183e00901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"}
          alt="Altiplano alpaquero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--teal-deep)] via-[var(--teal-deep)]/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-[var(--ivory)]">
          {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-[var(--gold-soft)]">{eyebrow}</div>}
          <p className="mt-2 text-2xl leading-snug max-w-md" style={{ fontWeight: 500 }}>
            {quote || "Tu fibra tiene historia. Hazla verificable."}
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-[var(--ivory)]/80">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Datos protegidos</div>
            <div className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4" /> Verificación real</div>
            <div className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> Acceso progresivo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
