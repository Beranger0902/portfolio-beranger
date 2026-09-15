"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export default function Contact() {
  const cards = [
    { Icon: Phone, label: "Téléphone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
    { Icon: MapPin, label: "Localisation", value: profile.location },
    { Icon: Linkedin, label: "LinkedIn", value: "beranger-agbodainon", href: profile.linkedin },
    { Icon: Github, label: "GitHub", value: "Beranger0902", href: profile.github },
  ];

  return (
    <section id="contact" className="dot-pattern relative overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-gradient p-8 text-cream shadow-card md:p-14">
            <div className="grid-pattern absolute inset-0 opacity-50" />
            <div className="absolute -right-32 -top-32 h-96 w-96 animate-blob rounded-full bg-gold/25 blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 animate-blob rounded-full bg-sky-500/20 blur-[100px] [animation-delay:-8s]" />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Contact</p>
                <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                  Construisons quelque chose <span className="text-gold-gradient">d&apos;utile.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-navy-100">
                  Vous avez un projet web, une plateforme SaaS ou une idée de produit numérique ? Écrivez-moi sur
                  WhatsApp ou par e-mail — je réponds généralement sous 24 h.
                </p>

                <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
                  {cards.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-widest text-navy-200">{label}</p>
                          <p className="truncate text-sm font-semibold text-cream">{value}</p>
                        </div>
                      </>
                    );
                    const cls =
                      "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold/50";
                    return (
                      <StaggerItem key={label}>
                        {href ? (
                          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
                            {inner}
                          </a>
                        ) : (
                          <div className={cls}>{inner}</div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>

              {/* Canaux principaux */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-4"
              >
                <motion.a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="shine-card group flex items-center gap-5 rounded-3xl bg-[#25d366] p-6 text-navy-950 shadow-[0_20px_50px_-20px_rgba(37,211,102,0.6)]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/25">
                    <MessageCircle className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">WhatsApp</p>
                    <p className="font-display text-lg font-extrabold sm:text-xl">Écrire sur WhatsApp</p>
                    <p className="text-sm font-semibold opacity-80">{profile.phone}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent("Contact depuis votre portfolio")}`}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="shine-card group flex items-center gap-5 rounded-3xl bg-gold-gradient p-6 text-navy shadow-glow"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy/15">
                    <Mail className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">E-mail</p>
                    <p className="font-display text-lg font-extrabold sm:text-xl">Envoyer un e-mail</p>
                    <p className="truncate text-sm font-semibold opacity-80">{profile.email}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </motion.a>

                <p className="text-center text-xs text-navy-300">Disponible du lundi au samedi · Cotonou (UTC+1)</p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
