import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar({ onLogin, onRegister, onMarketplace }: { onLogin?: () => void; onRegister?: () => void; onMarketplace?: () => void } = {}) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { label: lang === "ES" ? "Marketplace" : "Marketplace", onClick: onMarketplace },
    { label: lang === "ES" ? "Precios" : "Prices", href: "#precios" },
    { label: lang === "ES" ? "Demo por rol" : "Role demo", href: "#demo" },
    { label: lang === "ES" ? "Confianza" : "Trust", href: "#confianza" },
    { label: lang === "ES" ? "Cómo funciona" : "How it works", href: "#como" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--ivory)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/ALPACASH.svg" alt="AlpaCash Logo" className="h-9 w-auto" />
          <span className="text-[var(--teal-deep)] tracking-tight" style={{ fontWeight: 600 }}>AlpaCash</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
            l.onClick ? (
              <button key={l.label} onClick={l.onClick} className="text-sm text-[var(--teal-deep)]/80 hover:text-[var(--teal-deep)] transition-colors">
                {l.label}
              </button>
            ) : (
              <a key={l.label} href={l.href} className="text-sm text-[var(--teal-deep)]/80 hover:text-[var(--teal-deep)] transition-colors">
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-[var(--teal-deep)]/80 hover:text-[var(--teal-deep)] px-2 py-1 rounded-md"
            >
              <Globe className="w-4 h-4" />
              {lang}
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[var(--border)] p-1 text-sm">
                <button onClick={() => { setLang("ES"); setLangOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--ivory-2)]">Español</button>
                <button onClick={() => { setLang("EN"); setLangOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--ivory-2)]">English</button>
                <button disabled className="w-full text-left px-3 py-2 rounded-lg text-[var(--muted-foreground)] flex items-center justify-between">
                  Aymara <span className="text-[10px] bg-[var(--ivory-2)] px-1.5 py-0.5 rounded">soon</span>
                </button>
              </div>
            )}
          </div>
          <Button onClick={onLogin} variant="ghost" className="text-[var(--teal-deep)] hover:bg-[var(--ivory-2)]">
            {lang === "ES" ? "Ingresar" : "Sign in"}
          </Button>
          <Button onClick={onRegister} className="bg-[var(--teal-deep)] hover:bg-[var(--teal-700)] text-[var(--ivory)] rounded-full px-5">
            {lang === "ES" ? "Empezar" : "Get started"}
          </Button>
        </div>

        <button className="lg:hidden text-[var(--teal-deep)]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--ivory)] px-5 py-4 flex flex-col gap-3">
          {links.map((l) =>
            l.onClick ? (
              <button key={l.label} onClick={() => { setOpen(false); l.onClick?.(); }} className="py-2 text-left text-[var(--teal-deep)]">{l.label}</button>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-2 text-[var(--teal-deep)]">{l.label}</a>
            )
          )}
          <Button onClick={() => { setOpen(false); onLogin?.(); }} variant="ghost" className="text-[var(--teal-deep)] rounded-full mt-2">
            {lang === "ES" ? "Ingresar" : "Sign in"}
          </Button>
          <Button onClick={() => { setOpen(false); onRegister?.(); }} className="bg-[var(--teal-deep)] text-[var(--ivory)] rounded-full">
            {lang === "ES" ? "Empezar" : "Get started"}
          </Button>
        </div>
      )}
    </header>
  );
}
