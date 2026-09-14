"use client";

import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import DemoFrame from "./DemoFrame";

const scores = [
  { label: "Performance", desktop: 98, mobile: 94 },
  { label: "Accessibilité", desktop: 100, mobile: 100 },
  { label: "Bonnes pratiques", desktop: 100, mobile: 96 },
  { label: "SEO", desktop: 100, mobile: 100 },
];
const pages = [
  { path: "/", name: "Accueil", ms: 180, type: "SSG" },
  { path: "/services", name: "Services", ms: 210, type: "SSG" },
  { path: "/realisations", name: "Réalisations", ms: 260, type: "ISR" },
  { path: "/blog", name: "Blog", ms: 320, type: "ISR" },
  { path: "/contact", name: "Contact", ms: 190, type: "SSR" },
  { path: "/admin", name: "Administration", ms: 410, type: "SSR" },
];

function Gauge({ value, label, delay }: { value: number; label: string; delay: number }) {
  const r = 34, c = 2 * Math.PI * r;
  const color = value >= 90 ? "#34d399" : value >= 50 ? "#febc2e" : "#ff5f57";
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-navy-900/60 p-4">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="7" />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.4 }}
          className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold"
          style={{ color }}
        >
          {value}
        </motion.span>
      </div>
      <p className="mt-2 text-xs font-semibold text-navy-100">{label}</p>
    </div>
  );
}

export default function DrwintechDemo() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <DemoFrame url="drwintech.com · rapport Lighthouse">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-gold" />
          <span className="font-semibold">https://drwintech.com</span>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">EN LIGNE</span>
        </div>
        <div className="flex gap-1 rounded-full bg-navy-900 p-1">
          {(
            [
              ["desktop", Monitor, "Bureau"],
              ["mobile", Smartphone, "Mobile"],
            ] as const
          ).map(([k, Icon, l]) => (
            <button
              key={k}
              onClick={() => setDevice(k)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${device === k ? "bg-gold text-navy" : "text-navy-200"}`}
            >
              <Icon className="h-3.5 w-3.5" /> {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" key={device}>
        {scores.map((s, i) => (
          <Gauge key={s.label} value={s[device]} label={s.label} delay={i * 0.12} />
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-navy-900/60 p-4">
        <p className="text-sm font-bold">Pages & temps de réponse serveur</p>
        <ul className="mt-3 space-y-2">
          {pages.map((p, i) => (
            <li key={p.path} className="flex items-center gap-3 text-sm">
              <span className="w-28 shrink-0 font-mono text-xs text-navy-200">{p.path}</span>
              <span className="w-28 shrink-0 font-semibold">{p.name}</span>
              <span className="w-10 shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-center font-mono text-[10px] text-gold">{p.type}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: p.ms < 250 ? "#34d399" : p.ms < 350 ? "#cf7046" : "#fb923c" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.ms / 500) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-xs text-navy-100">{p.ms} ms</span>
            </li>
          ))}
        </ul>
      </div>
    </DemoFrame>
  );
}
