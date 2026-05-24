import { useState } from "react";
import { motion } from "motion/react";
import { Play, BookOpen, Users, Award } from "lucide-react";
import { DashShell, ArtCard, SectionLabel, SideNav } from "./DashShell";
import { ScissorsShear, MountainPath, ChartSparkle, ClipboardCheckArt, ScaleBalance, StampSeal, SeedLeaf } from "../icons/AlpaIcons";
import { TalleresTab } from "./tabs/trainer/TalleresTab";
import { EsquilaTab } from "./tabs/trainer/EsquilaTab";
import { VisitasTab } from "./tabs/trainer/VisitasTab";
import { EvaluacionesTab } from "./tabs/trainer/EvaluacionesTab";
import { ComunidadTab } from "./tabs/trainer/ComunidadTab";

export function TrainerDashboard({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState("inicio");
  const nav = [
    { key: "inicio", label: "Panel", icon: <ChartSparkle size={18} /> },
    { key: "talleres", label: "Talleres", icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { key: "esquila", label: "Calendario esquila", icon: <ScissorsShear size={18} /> },
    { key: "visitas", label: "Visitas en campo", icon: <MountainPath size={18} /> },
    { key: "evaluaciones", label: "Evaluaciones", icon: <ClipboardCheckArt size={18} /> },
    { key: "comunidad", label: "Comunidad", icon: <Users className="w-[18px] h-[18px]" /> },
  ];

  const sessions = [
    { t: "Clasificación de fibra · básico", date: "26 may · 09:00", group: "Asoc. Tinta", n: 18, color: "var(--gold)" },
    { t: "Esquila respetuosa", date: "28 may · 14:00", group: "Cabaña Sur", n: 12, color: "var(--terracotta)" },
    { t: "Negociación digna", date: "01 jun · 10:00", group: "Coop. Maranganí", n: 24, color: "var(--teal-500)" },
  ];

  const learners = [
    { n: "Juana Quispe", g: "Asoc. Tinta", p: 92 },
    { n: "Mario Condori", g: "Cabaña Sur", p: 74 },
    { n: "Elena Mamani", g: "Coop. Maranganí", p: 58 },
    { n: "Rosa Huillca", g: "Asoc. Llalli", p: 41 },
  ];

  return (
    <DashShell
      role="Facilitador / Capacitador"
      title="Llevamos la academia al altiplano."
      subtitle="Talleres en campo, contenidos audio-visuales en quechua y aimara, y seguimiento por aprendiz."
      accent="var(--gold)"
      onBack={onBack}
      sidebar={<SideNav items={nav} active={tab} onPick={setTab} />}
    >
      <div className="lg:hidden -mx-5 sm:-mx-8 px-5 sm:px-8 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {nav.map((it) => (
            <button key={it.key} onClick={() => setTab(it.key)} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm ${tab === it.key ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]" : "bg-[var(--paper)] border-[var(--ink)]/10"}`}>
              {it.icon}<span>{it.label}</span>
            </button>
          ))}
        </div>
      </div>
      {tab !== "inicio" ? (
        <>
          {tab === "talleres" && <TalleresTab />}
          {tab === "esquila" && <EsquilaTab />}
          {tab === "visitas" && <VisitasTab />}
          {tab === "evaluaciones" && <EvaluacionesTab />}
          {tab === "comunidad" && <ComunidadTab />}
        </>
      ) : (
        <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l: "Talleres activos", v: "8", s: "3 esta semana", bg: "var(--gold)" },
          { l: "Aprendices", v: "164", s: "+22 este mes", bg: "var(--mint)" },
          { l: "Horas en campo", v: "212h", s: "5 comunidades", bg: "var(--pink)" },
          { l: "Certificaciones", v: "47", s: "Pasamos meta", bg: "var(--gold-soft)" },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <ArtCard className="p-5">
              <div className="w-10 h-10 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center mb-3" style={{ background: k.bg }}>
                <SeedLeaf size={20} />
              </div>
              <div className="font-display text-3xl" style={{ fontWeight: 600 }}>{k.v}</div>
              <div className="text-xs text-[var(--ink)]/60">{k.l}</div>
              <div className="font-mono text-[10px] uppercase text-[var(--ink)]/50 mt-1">{k.s}</div>
            </ArtCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <ArtCard className="lg:col-span-2 p-5">
          <SectionLabel n="N°01">Próximas sesiones</SectionLabel>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <ArtCard className="p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl border-2 border-[var(--ink)] flex items-center justify-center" style={{ background: s.color }}>
                    <ScissorsShear size={26} className="text-[var(--ivory)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg" style={{ fontWeight: 600 }}>{s.t}</div>
                    <div className="text-xs text-[var(--ink)]/60">{s.date} · {s.group} · {s.n} inscritos</div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                </ArtCard>
              </motion.div>
            ))}
          </div>
        </ArtCard>

        <ArtCard className="p-5 bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Audio del altiplano</div>
          <div className="font-display text-3xl mt-2" style={{ fontWeight: 600 }}>Podcast Ayllu</div>
          <div className="text-sm text-[var(--ivory)]/70 mt-1">&ldquo;Negociar sin vender de menos&rdquo; · 14 min</div>
          <div className="mt-4 h-1 bg-[var(--ivory)]/15 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--gold)]" style={{ width: "42%" }} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-[var(--gold)] text-[var(--ink)] flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </button>
            <div className="font-mono text-xs">06:12 / 14:00</div>
          </div>
        </ArtCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <SectionLabel n="N°02">Progreso de aprendices</SectionLabel>
          <div className="space-y-3">
            {learners.map((l, i) => (
              <ArtCard key={i} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-display" style={{ fontWeight: 600 }}>{l.n}</div>
                    <div className="text-xs text-[var(--ink)]/60">{l.g}</div>
                  </div>
                  <div className="font-display text-xl" style={{ fontWeight: 700 }}>{l.p}%</div>
                </div>
                <div className="h-2 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${l.p}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full"
                    style={{ background: l.p > 80 ? "var(--mint)" : l.p > 60 ? "var(--gold)" : "var(--terracotta)" }}
                  />
                </div>
              </ArtCard>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel n="N°03">Recursos disponibles</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {[
              { t: "Manual fibra", c: "var(--pink)", i: <BookOpen className="w-6 h-6" /> },
              { t: "Guía esquila", c: "var(--mint)", i: <ScissorsShear size={26} /> },
              { t: "Balanza correcta", c: "var(--gold)", i: <ScaleBalance size={26} /> },
              { t: "Sello aliado", c: "var(--gold-soft)", i: <StampSeal size={26} /> },
              { t: "Negociación", c: "var(--pink)", i: <Award className="w-6 h-6" /> },
              { t: "Quechua I", c: "var(--mint)", i: <SeedLeaf size={26} /> },
            ].map((r, i) => (
              <ArtCard key={i} className="p-4 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center" style={{ background: r.c }}>
                  {r.i}
                </div>
                <div className="font-display text-sm mt-3" style={{ fontWeight: 600 }}>{r.t}</div>
                <div className="font-mono text-[10px] uppercase text-[var(--ink)]/50 mt-0.5">PDF · ES/QU</div>
              </ArtCard>
            ))}
          </div>
        </div>
      </div>
        </>
      )}
    </DashShell>
  );
}
