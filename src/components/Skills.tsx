"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe2, Server, ShieldCheck, Terminal } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const skills = [
  {
    Icon: Server,
    title: "Back-end",
    description: "Laravel, Node.js / Express, PHP 8+, API REST",
    items: [
      ["Laravel", 92],
      ["Node.js / Express", 88],
      ["PHP 8+", 90],
      ["API REST", 94],
    ],
  },
  {
    Icon: Globe2,
    title: "Front-end",
    description: "Next.js, Tailwind CSS, Bootstrap, Vue.js, responsive design",
    items: [
      ["Next.js / React", 90],
      ["Tailwind CSS", 92],
      ["Vue.js", 78],
      ["Responsive design", 90],
    ],
  },
  {
    Icon: Database,
    title: "Bases de données",
    description: "MySQL, PostgreSQL, SQLite, SQL Server, Oracle",
    items: [
      ["PostgreSQL", 88],
      ["MySQL", 90],
      ["SQL Server / Oracle", 70],
      ["Modélisation", 90],
    ],
  },
  {
    Icon: Code2,
    title: "ORM & TypeScript",
    description: "Drizzle, Prisma, TypeScript strict",
    items: [
      ["Prisma", 88],
      ["Drizzle ORM", 85],
      ["TypeScript", 86],
      ["Eloquent", 90],
    ],
  },
  {
    Icon: Terminal,
    title: "Infrastructure",
    description: "Docker, Redis, Git/GitHub, Postman, Vercel",
    items: [
      ["Docker", 80],
      ["Redis", 75],
      ["Git / GitHub", 92],
      ["CI / Déploiement", 78],
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Sécurité",
    description: "JWT, Sanctum, bcrypt, CSRF, bonnes pratiques OWASP",
    items: [
      ["JWT / Sanctum", 88],
      ["Hashing & sessions", 90],
      ["CSRF / XSS", 85],
      ["Validation des entrées", 92],
    ],
  },
] as const;

export default function Skills() {
  return (
    <section id="competences" className="relative overflow-hidden bg-white px-6 py-28">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Expertise</p>
              <h2 className="font-display text-3xl font-extrabold text-navy md:text-4xl">
                Compétences <span className="text-gold-gradient">techniques</span>
              </h2>
            </div>
            <p className="max-w-md text-slate-600">
              Une stack complète, du back-end à l&apos;interface, pour livrer des produits cohérents de bout en bout.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ Icon, title, description, items }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="gradient-border group relative h-full rounded-3xl border border-slate-200 bg-cream p-7 shadow-sm transition-shadow hover:shadow-card"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold shadow-lg transition-all duration-500 group-hover:rotate-[15deg] group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map(([name, pct], i) => (
                    <div key={name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-semibold text-navy">{name}</span>
                        <span className="font-mono text-xs text-slate-500">{pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-navy/10">
                        <motion.div
                          className="h-full rounded-full bg-gold-gradient"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
