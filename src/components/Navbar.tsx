"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCv } from "./CvProvider";

const links = [
  { href: "#apropos", label: "À propos", id: "apropos" },
  { href: "#competences", label: "Compétences", id: "competences" },
  { href: "#projets", label: "Projets", id: "projets" },
  { href: "#parcours", label: "Parcours", id: "parcours" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const { openCv } = useCv();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [home]);

  const hrefFor = (href: string) => (home ? href : `/${href}`);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || !home
            ? "border-b border-white/10 bg-navy-900/85 py-2 shadow-lg backdrop-blur-xl"
            : "bg-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2 font-display text-xl font-extrabold tracking-wide text-cream">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-navy shadow-glow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
              BA
            </span>
            <span className="hidden sm:inline">
              Beranger<span className="text-gold">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-navy-100 md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={hrefFor(l.href)}
                className={`link-underline transition hover:text-gold ${active === l.id ? "active text-gold" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={openCv}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold px-4 py-2 text-xs font-bold text-gold transition-colors hover:text-navy sm:text-sm"
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-gold-gradient transition-transform duration-300 group-hover:translate-y-0" />
              <Eye className="h-4 w-4" /> Voir mon CV
            </motion.button>
            <button
              onClick={() => setMenu((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-cream md:hidden"
              aria-label="Menu"
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/10 bg-navy-900/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={hrefFor(l.href)}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-xl px-4 py-3 font-semibold text-cream transition hover:bg-white/5 hover:text-gold"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
