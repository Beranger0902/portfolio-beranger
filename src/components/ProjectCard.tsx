"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Play } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, rgba(201,162,39,0.18), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
    rotateY.set(((px / rect.width) - 0.5) * 10);
    rotateX.set((0.5 - py / rect.height) * 10);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const dark = project.kind === "demo";

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-shadow duration-500 hover:shadow-card ${
        dark ? "border-white/10 bg-navy-800 text-cream" : "border-slate-200 bg-white text-navy"
      }`}
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image de couverture */}
      <Link href={`/projets/${project.slug}`} className={`relative block overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="flex translate-y-4 items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-navy shadow-glow transition-transform duration-500 group-hover:translate-y-0">
            <Play className="h-4 w-4" /> Voir le projet
          </span>
        </div>
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy"
          style={{ background: project.accent }}
        >
          {project.kind === "pro" ? "Professionnel" : "Démo interactive"}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-navy-900/70 px-3 py-1 font-mono text-xs text-cream backdrop-blur">{project.year}</span>
      </Link>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(30px)" }}>
        <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-gold" : "text-gold-dark"}`}>{project.category}</p>
        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">
          <Link href={`/projets/${project.slug}`} className="transition-colors group-hover:text-gold">
            {project.title}
          </Link>
        </h3>
        <p className={`mt-1 text-sm font-semibold ${dark ? "text-navy-200" : "text-slate-500"}`}>{project.tagline}</p>
        <p className={`mt-4 flex-1 leading-7 ${dark ? "text-navy-100" : "text-slate-600"}`}>{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                dark ? "border border-white/15 text-cream/90" : "bg-cream text-navy"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className={`mt-6 flex items-center justify-between border-t pt-5 ${dark ? "border-white/10" : "border-slate-100"}`}>
          <Link
            href={`/projets/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gold transition hover:gap-3"
          >
            Étude de cas <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            {project.links.site && (
              <a
                href={project.links.site}
                target="_blank"
                rel="noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-gold hover:text-gold ${
                  dark ? "border-white/15" : "border-slate-200"
                }`}
                aria-label="Site en ligne"
                title="Site en ligne"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-gold hover:text-gold ${
                  dark ? "border-white/15" : "border-slate-200"
                }`}
                aria-label="Code source"
                title="Code source"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
