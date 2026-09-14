"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const experiences = [
  {
    Icon: Briefcase,
    type: "Expérience",
    title: "Développeur full-stack",
    org: "Drwintech · Cotonou",
    date: "Mars — Novembre 2026",
    text: "Plateforme de présences par géolocalisation, site web corporate et plateforme de gestion d'événements. Architecture, modélisation de données et documentation technique.",
    tags: ["Next.js", "Laravel", "Prisma", "Drizzle"],
  },
  {
    Icon: Trophy,
    type: "Hackathon",
    title: "Développeur mobile — Speed Go",
    org: "FRIARE Hackathon 2025",
    date: "Avril 2025",
    text: "API REST, design UI/UX et prototype de l'application mobile Speed Go, présentée au jury en 48 h.",
    tags: ["Node.js", "API REST", "UI/UX"],
  },
];

const education = [
  {
    Icon: GraduationCap,
    type: "Formation",
    title: "Licence professionnelle — Systèmes informatiques et logiciels",
    org: "Institut Supérieur de Génie Civil et de Gestion",
    date: "Oct. 2023 — Juin 2026",
    text: "Génie logiciel, bases de données, réseaux, développement web et mobile.",
    tags: [],
  },
  {
    Icon: GraduationCap,
    type: "Certification",
    title: "HTML, CSS et JavaScript",
    org: "Cursa",
    date: "Juil. — Août 2024",
    text: "",
    tags: [],
  },
  {
    Icon: GraduationCap,
    type: "Formation",
    title: "Maîtrise des logiciels bureautiques",
    org: "PROMEDIA Services",
    date: "Déc. 2021 — Janv. 2022",
    text: "",
    tags: [],
  },
  {
    Icon: GraduationCap,
    type: "Diplôme",
    title: "Baccalauréat série D",
    org: "CEG Le Plateau de Womey",
    date: "Sept. 2019 — Juil. 2020",
    text: "",
    tags: [],
  },
];

function Column({ title, items }: { title: string; items: typeof experiences }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      <Reveal>
        <h3 className="font-display text-xl font-bold text-gold">{title}</h3>
      </Reveal>
      <div ref={ref} className="relative mt-8 pl-10">
        <div className="absolute bottom-0 left-[15px] top-0 w-[2px] bg-white/10" />
        <motion.div style={{ height }} className="absolute left-[15px] top-0 w-[2px] bg-gold-gradient shadow-glow-sm" />
        <div className="space-y-8">
          {items.map(({ Icon, type, title, org, date, text, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <span className="absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-navy-900 text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                <Icon className="h-4 w-4" />
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/60" />
              </span>
              <div className="rounded-2xl border border-white/10 bg-navy-700/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">{type}</span>
                  <span className="font-mono text-xs text-navy-200">{date}</span>
                </div>
                <p className="mt-3 font-display text-lg font-bold text-cream">{title}</p>
                <p className="text-sm text-navy-200">{org}</p>
                {text && <p className="mt-3 text-sm leading-6 text-navy-100">{text}</p>}
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-cream/80">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="parcours" className="noise relative overflow-hidden bg-navy-gradient px-6 py-28 text-cream">
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] animate-blob rounded-full bg-gold/15 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Parcours</p>
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            Formation & <span className="text-gold-gradient">expériences</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <Column title="Expériences" items={experiences} />
          <Column title="Formation" items={education} />
        </div>
      </div>
    </section>
  );
}
