import { Globe } from "lucide-react";

export function Languages() {
  const langs = [
    { code: "ES", name: "Español", active: true },
    { code: "EN", name: "English", active: false },
    { code: "AYM", name: "Aymara", active: false, soon: true },
  ];
  return (
    <section className="py-20 bg-[var(--ivory)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--teal-deep)] to-[var(--teal-700)] text-[var(--ivory)] p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[var(--gold)]/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--gold-soft)]">
                <Globe className="w-3.5 h-3.5" /> Idiomas
              </div>
              <h2 className="mt-3 text-3xl tracking-tight" style={{ fontWeight: 600, lineHeight: 1.15 }}>
                Diseñado para productores, compradores y aliados.
              </h2>
              <p className="mt-3 text-[var(--ivory)]/75">
                Español e inglés desde el MVP. Aymara preparado para expansión territorial, con respeto a la
                validación lingüística comunitaria.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {langs.map((l) => (
                <div key={l.code} className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--ivory)] text-[var(--teal-deep)] flex items-center justify-center" style={{ fontWeight: 600 }}>
                      {l.code}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{l.name}</div>
                      <div className="text-xs text-[var(--ivory)]/60">{l.active ? "Disponible" : l.soon ? "Próximamente" : "Disponible"}</div>
                    </div>
                  </div>
                  {l.soon ? (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--gold)]/20 text-[var(--gold-soft)] border border-[var(--gold)]/30">SOON</span>
                  ) : (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">ACTIVO</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
