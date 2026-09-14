"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Eye, Github, Layers, Linkedin, Sparkles } from "lucide-react";
import Particles from "./Particles";
import TypedWords from "./TypedWords";
import { useCv } from "./CvProvider";
import { profile } from "@/data/profile";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { openCv } = useCv();

  return (
    <section id="accueil" className="noise relative overflow-hidden bg-navy-gradient text-cream">
      {/* Fond animé */}
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute -left-40 top-20 h-[520px] w-[520px] animate-blob rounded-full bg-gold/20 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] animate-blob rounded-full bg-sky-500/20 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute left-1/2 top-1/3 h-[380px] w-[380px] animate-blob rounded-full bg-navy-400/30 blur-[110px] [animation-delay:-12s]" />
      <Particles />

      {/* Anneau rotatif décoratif */}
      <div className="pointer-events-none absolute -right-40 -top-40 hidden h-[560px] w-[560px] animate-spin-slow rounded-full border border-dashed border-gold/20 lg:block" />
      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[320px] w-[320px] animate-spin-slow rounded-full border border-gold/10 [animation-direction:reverse] lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-28 pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-44">
        <div className="min-w-0">
          <motion.div {...fade(0.1)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gold backdrop-blur sm:text-xs sm:tracking-[0.25em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible pour de nouveaux projets
          </motion.div>

          <motion.h1 {...fade(0.2)} className="font-display text-2xl font-extrabold leading-[1.12] tracking-tight sm:text-3xl md:text-4xl xl:text-[2.75rem]">
            Je conçois des
            <br />
            plateformes{" "}
            <span className="text-gold-gradient">
              <TypedWords words={["utiles.", "solides.", "évolutives.", "modernes."]} />
            </span>
          </motion.h1>

          <motion.p {...fade(0.35)} className="mt-6 max-w-2xl text-base leading-7 text-navy-100 md:text-lg md:leading-8">
            Je suis <span className="font-bold text-cream">Beranger Agbodainon</span>, développeur full-stack
            passionné par la conception de produits web modernes et de solutions SaaS adaptées aux réalités
            africaines. Next.js, Laravel, PostgreSQL — du schéma de données à l&apos;interface.
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projets"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shine-card group inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-bold text-navy shadow-glow"
            >
              Découvrir mes projets
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
            <motion.button
              onClick={openCv}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 font-bold text-cream backdrop-blur transition hover:border-gold hover:text-gold"
            >
              <Eye className="h-5 w-5" /> Voir mon CV
            </motion.button>
            <div className="flex items-center gap-2 pl-2">
              {[
                { href: "https://github.com/Beranger0902", Icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/beranger-agbodainon-2a11b231a", Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-gold hover:text-gold"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.65)} className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              ["3+", "années de code"],
              ["7", "projets réalisés"],
              ["15+", "technologies maîtrisées"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-xl font-extrabold text-gold">{n}</p>
                <p className="text-sm text-navy-200">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carte profil flottante */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <div className="animate-float">
            <div className="gradient-border relative rounded-3xl border border-gold/30 bg-navy-700/70 p-7 shadow-card backdrop-blur-xl">
              <div className="mb-7 flex items-center gap-4">
                <div className="relative">
                  <img src={profile.avatar} alt="Beranger Agbodainon" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-gold/60" onError={(e) => { const img = e.currentTarget; if (!img.src.endsWith("/profile.svg")) img.src = "/profile.svg"; }} />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-navy-700">
                    <span className="h-2 w-2 rounded-full bg-navy-900" />
                  </span>
                </div>
                <div>
                  <p className="font-display text-base font-bold">Beranger Agbodainon</p>
                  <p className="text-sm text-navy-200">Full-stack & Architecture SaaS</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { Icon: Layers, label: "Architecture", value: "Modulaire, multi-tenant, documentée", pct: 92 },
                  { Icon: Code2, label: "Back-end", value: "Laravel, Node.js, API REST", pct: 90 },
                  { Icon: Sparkles, label: "Front-end", value: "Next.js, Tailwind, Vue.js", pct: 88 },
                  { Icon: Database, label: "Données", value: "PostgreSQL, MySQL, Prisma, Drizzle", pct: 85 },
                ].map(({ Icon, label, value, pct }, i) => (
                  <div key={label}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-widest text-gold">{label}</p>
                        <p className="text-sm text-cream">{value}</p>
                      </div>
                    </div>
                    <div className="ml-12 mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gold-gradient"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1.2, delay: 0.9 + i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges flottants */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="absolute -top-9 left-4 animate-float-slow rounded-2xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-card backdrop-blur"
          >
            <p className="font-mono text-xs text-emerald-400">$ npm run build</p>
            <p className="font-mono text-xs text-navy-200">✓ Compiled successfully</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="absolute -bottom-6 right-2 animate-float rounded-2xl bg-gold-gradient px-4 py-3 text-navy shadow-glow [animation-delay:-3s] lg:-right-2"
          >
            <p className="text-xs font-bold uppercase tracking-wider">Basé à</p>
            <p className="font-display text-sm font-extrabold">Cotonou, Bénin 🇧🇯</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.a
        href="#apropos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-navy-200 md:flex"
      >
        <span>Scroll</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-navy-200/40 p-1.5">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
