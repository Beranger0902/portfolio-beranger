"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects, type ProjectKind } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { Reveal } from "./Reveal";

const filters: { key: "all" | ProjectKind; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "pro", label: "Professionnels" },
  { key: "demo", label: "Démos interactives" },
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectKind>("all");
  const visible = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <section id="projets" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Réalisations</p>
              <h2 className="font-display text-2xl font-extrabold text-navy md:text-3xl">
                Projets & <span className="text-gold-gradient">démos interactives</span>
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                Chaque projet possède sa page dédiée avec étude de cas, captures et, pour les démos, une
                application interactive à tester directement dans le navigateur.
              </p>
            </div>
            <div className="flex gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === f.key ? "text-navy" : "text-slate-500 hover:text-navy"
                  }`}
                >
                  {filter === f.key && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gold-gradient"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 && filter === "all" ? "md:col-span-2" : ""}
              >
                <ProjectCard project={project} featured={i === 0 && filter === "all"} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
