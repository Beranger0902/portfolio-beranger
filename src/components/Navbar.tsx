"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [home]);

  const hrefFor = (href: string) => (home ? href : `/${href}`);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-navy/5 bg-cream/95 py-2 pl-3 pr-2 text-navy backdrop-blur-xl transition-shadow duration-500 sm:pl-5 ${
            scrolled ? "shadow-[0_12px_40px_-12px_rgba(11,31,58,0.35)]" : "shadow-[0_8px_30px_-14px_rgba(11,31,58,0.25)]"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5 font-display text-[15px] font-extrabold tracking-wide">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-[13px] text-navy shadow-glow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
              BA
            </span>
            <span className="hidden sm:inline">
              Beranger<span className="text-gold-dark">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-[14px] font-semibold md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={hrefFor(l.href)}
                className={`link-underline transition hover:text-gold-dark ${active === l.id ? "active text-gold-dark" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={openCv} className="hidden text-[14px] font-semibold transition hover:text-gold-dark sm:inline">
              Voir mon CV
            </button>
            <motion.a
              href={hrefFor("#contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-gold-gradient px-4 py-2.5 text-[13px] font-bold text-navy shadow-glow-sm sm:px-5 sm:text-[14px]"
            >
              Me contacter
            </motion.a>
            <button
              onClick={() => setMenu((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy md:hidden"
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
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="fixed inset-x-4 top-[76px] z-40 rounded-3xl border border-navy/5 bg-cream p-4 text-navy shadow-card md:hidden"
          >
            <div className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={hrefFor(l.href)}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-xl px-4 py-3 font-semibold transition hover:bg-navy/5 hover:text-gold-dark"
                >
                  {l.label}
                </motion.a>
              ))}
              <button
                onClick={() => {
                  setMenu(false);
                  openCv();
                }}
                className="mt-1 rounded-xl px-4 py-3 text-left font-semibold text-gold-dark"
              >
                Voir mon CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
