"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Layers } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-900 pt-28 text-cream md:pt-36">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] animate-blob rounded-full blur-[120px]" style={{ background: project.accent + "40" }} />
      <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] animate-blob rounded-full bg-gold/20 blur-[120px] [animation-delay:-7s]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div style={{ opacity }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/#projets" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-200 transition hover:text-gold">
              <ArrowLeft className="h-4 w-4" /> Retour aux projets
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-navy"
            style={{ background: project.accent }}
          >
            {project.category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-tight md:text-5xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 max-w-2xl text-xl text-navy-100"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center gap-5 text-sm text-navy-200"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" /> {project.year}
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers className="h-4 w-4 text-gold" /> {project.stack.slice(0, 3).join(" · ")}
            </span>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 overflow-hidden rounded-t-3xl border border-b-0 border-white/10 shadow-card"
        >
          <motion.img style={{ y, scale }} src={project.cover} alt={project.title} className="aspect-[16/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-40" />
        </motion.div>
      </div>
    </section>
  );
}
