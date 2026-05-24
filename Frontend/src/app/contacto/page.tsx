import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone, Users } from "lucide-react";

const channels = [
  {
    title: "Soporte comercial",
    value: "equipo@alpacash.pe",
    detail: "Para onboarding, marketplace, órdenes y acompañamiento a productores o compradores.",
    icon: <Mail className="w-5 h-5" />,
    accent: "var(--gold)",
  },
  {
    title: "WhatsApp de campo",
    value: "+51 900 000 000",
    detail: "Ideal para comunidades, facilitadores y seguimiento operativo en territorio.",
    icon: <MessageCircle className="w-5 h-5" />,
    accent: "var(--mint)",
  },
  {
    title: "Mesa institucional",
    value: "+51 1 555 0000",
    detail: "Canal para aliados financieros, certificadores y coordinación interinstitucional.",
    icon: <Phone className="w-5 h-5" />,
    accent: "var(--pink)",
  },
];

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] px-5 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--ink)]/15 bg-[var(--paper)] text-sm mb-8 hover:bg-[var(--ivory-2)] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/55 mb-3">Contacto · Equipo AlpaCash</div>
            <h1 className="font-display leading-[0.95] text-[var(--ink)]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 500 }}>
              Hablemos con
              <br />
              <em className="font-editorial text-[var(--teal-500)]" style={{ fontWeight: 400 }}>el equipo</em> real.
            </h1>
            <p className="mt-5 max-w-2xl font-editorial italic text-xl text-[var(--ink)]/78 leading-snug">
              “Esta pantalla existe para que nadie se quede trabado entre la intención y la operación. Si querés entrar, vender, comprar o coordinar, acá están los canales.”
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {channels.map((channel) => (
                <div key={channel.title} className="rounded-3xl border-2 border-[var(--ink)] bg-[var(--paper)] p-5 brutalist-shadow-sm">
                  <div className="w-11 h-11 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center" style={{ background: channel.accent }}>
                    {channel.icon}
                  </div>
                  <div className="font-display text-2xl mt-4" style={{ fontWeight: 600 }}>{channel.title}</div>
                  <div className="mt-2 text-sm" style={{ fontWeight: 600 }}>{channel.value}</div>
                  <p className="text-sm text-[var(--ink)]/70 mt-2 leading-relaxed">{channel.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)] p-6 brutalist-shadow-sm lg:sticky lg:top-10">
            <div className="flex items-center gap-3 text-[var(--gold)]">
              <Users className="w-5 h-5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Equipo coordinador</span>
            </div>
            <div className="font-display text-3xl mt-4" style={{ fontWeight: 600 }}>Respondemos según tu rol</div>
            <p className="text-sm text-[var(--ivory)]/72 mt-3 leading-relaxed">
              Productores, compradores, facilitadores, aliados financieros y operadores reciben acompañamiento distinto. El canal existe para aterrizarte rápido al flujo correcto.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[var(--ivory)]/82">
              <div className="rounded-2xl bg-white/8 border border-white/10 p-4">Onboarding comercial y soporte de cuenta</div>
              <div className="rounded-2xl bg-white/8 border border-white/10 p-4">Acompañamiento en territorio y validaciones</div>
              <div className="rounded-2xl bg-white/8 border border-white/10 p-4">Coordinación con aliados, finanzas y certificación</div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
