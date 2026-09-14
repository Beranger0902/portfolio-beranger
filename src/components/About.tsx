"use client";

import { motion } from "framer-motion";
import { Award, Code2, Heart, Rocket } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { profile } from "@/data/profile";
import Counter from "./Counter";

const values = [
  { Icon: Code2, title: "Clean code", text: "Un code lisible, typé et testé, pensé pour durer." },
  { Icon: Rocket, title: "Performance", text: "Des interfaces rapides et des API optimisées." },
  { Icon: Award, title: "Qualité", text: "Sécurité, documentation et maintenabilité d'abord." },
  { Icon: Heart, title: "Impact", text: "Des solutions utiles aux réalités du terrain." },
];

export default function About() {
  return (
    <section id="apropos" className="dot-pattern relative overflow-hidden px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Photo */}
        <Reveal direction="right">
          <div className="relative mx-auto max-w-md">
            <motion.div
              className="absolute -inset-4 rounded-[2.5rem] bg-gold-gradient opacity-30 blur-2xl"
              animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white shadow-card">
              <img
                src={profile.photo}
                alt="Beranger Agbodainon"
                className="aspect-square w-full object-cover object-[center_30%] transition-transform duration-700 hover:scale-105" onError={(e) => { const img = e.currentTarget; if (!img.src.endsWith("/profile.svg")) img.src = "/profile.svg"; }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-6 text-cream">
                <p className="font-display text-lg font-bold">Beranger Agbodainon</p>
                <p className="text-sm text-navy-100">Développeur full-stack · Cotonou</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -right-6 -top-6 rounded-2xl bg-navy-800 px-5 py-4 text-cream shadow-card"
            >
              <p className="font-display text-2xl font-extrabold text-gold">
                <Counter to={7} />
              </p>
              <p className="text-xs uppercase tracking-wider text-navy-200">mois d&apos;expérience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-gold-gradient px-5 py-4 text-navy shadow-glow"
            >
              <p className="font-display text-2xl font-extrabold">
                <Counter to={7} />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider">projets livrés</p>
            </motion.div>
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">À propos</p>
            <h2 className="font-display text-2xl font-extrabold leading-tight text-navy md:text-3xl">
              Transformer une idée en <span className="text-gold-gradient">produit fiable.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Mon objectif est de participer à la création de solutions numériques qui répondent à des
                besoins concrets : gestion, mobilité, événementiel, ressources humaines et services.
              </p>
              <p>
                J&apos;accorde une grande importance à la qualité du code, à la sécurité, à la documentation et à
                la maintenabilité des applications. Chaque projet est une occasion de construire quelque chose
                de solide, que l&apos;on peut faire évoluer sans tout réécrire.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map(({ Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-300 group-hover:rotate-6 group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-navy">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Architecture SaaS", "API REST", "Clean code", "Responsive design", "Sécurité", "Documentation"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gold/50 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:bg-gold hover:text-navy"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
