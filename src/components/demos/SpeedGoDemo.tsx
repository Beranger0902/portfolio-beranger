"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bike, MapPin, Navigation, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DemoFrame from "./DemoFrame";

const destinations = [
  { name: "Marché Dantokpa", km: 2.1 },
  { name: "Université d'Abomey-Calavi", km: 9.4 },
  { name: "Aéroport Cadjehoun", km: 5.3 },
  { name: "Stade de l'Amitié", km: 4.0 },
];
const PATH = "M40 470 C 80 400, 60 340, 120 300 S 200 230, 180 170 S 230 110, 260 80";

export default function SpeedGoDemo() {
  const [dest, setDest] = useState<(typeof destinations)[number] | null>(null);
  const [phase, setPhase] = useState<"idle" | "search" | "riding" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [rider, setRider] = useState({ x: 40, y: 470 });

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const pt = p.getPointAtLength(len * progress);
    setRider({ x: pt.x, y: pt.y });
  }, [progress, dest]);

  const price = dest ? Math.round((250 + dest.km * 190) / 50) * 50 : 0;
  const eta = dest ? Math.max(3, Math.round(dest.km * 2.2)) : 0;

  useEffect(() => {
    if (phase === "search") {
      const t = setTimeout(() => setPhase("riding"), 1800);
      return () => clearTimeout(t);
    }
    if (phase === "riding") {
      setProgress(0);
      const start = Date.now();
      const dur = 6000;
      const id = setInterval(() => {
        const p = Math.min(1, (Date.now() - start) / dur);
        setProgress(p);
        if (p >= 1) {
          clearInterval(id);
          setPhase("done");
        }
      }, 40);
      return () => clearInterval(id);
    }
  }, [phase]);

  const reset = () => {
    setPhase("idle");
    setDest(null);
    setProgress(0);
  };

  return (
    <DemoFrame url="Speed Go" phone>
      <div className="relative h-[560px]">
        {/* Carte */}
        <svg viewBox="0 0 300 500" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="sg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M30 0H0V30" fill="none" stroke="#ffffff" strokeOpacity="0.07" />
            </pattern>
          </defs>
          <rect width="300" height="500" fill="url(#sg-grid)" />
          <path d="M0 250 H300" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="10" />
          <path d="M150 0 V500" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="8" />
          <path d="M0 120 H300 M0 380 H300 M80 0 V500 M230 0 V500" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="4" />
          {dest && (
            <>
              <motion.path ref={pathRef} d={PATH} fill="none" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <path d={PATH} fill="none" stroke="#f7f3ea" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6" />
              <g transform={`translate(${rider.x}, ${rider.y})`}>
                <circle r="11" fill="#0b1f3a" stroke="#fb923c" strokeWidth="3" />
                <circle r="4" fill="#f7f3ea" />
              </g>
            </>
          )}
          <circle cx="40" cy="470" r="8" fill="#fb923c" />
          <circle cx="40" cy="470" r="16" fill="#fb923c" opacity="0.25">
            <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
          </circle>
          {dest && <circle cx="260" cy="80" r="8" fill="#c9a227" />}
        </svg>

        {/* Recherche */}
        <div className="absolute inset-x-4 top-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-navy-900/90 px-4 py-2.5 shadow-lg backdrop-blur">
            <Navigation className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-navy-100">{dest ? dest.name : "Où allez-vous ?"}</span>
          </div>
        </div>

        {/* Feuille du bas */}
        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-white/10 bg-navy-900/95 p-4 backdrop-blur">
          <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-navy-300" />
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-navy-200">Destinations populaires</p>
                <div className="space-y-1.5">
                  {destinations.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => setDest(d)}
                      className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-sm transition ${dest?.name === d.name ? "bg-orange-400/20" : "hover:bg-white/5"}`}
                    >
                      <MapPin className="h-4 w-4 text-navy-200" />
                      <span className="flex-1 font-semibold">{d.name}</span>
                      <span className="font-mono text-xs text-navy-200">{d.km} km</span>
                    </button>
                  ))}
                </div>
                {dest && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center justify-between rounded-xl bg-white/5 p-3">
                    <div>
                      <p className="text-sm font-bold">Zémidjan express</p>
                      <p className="text-xs text-navy-200">≈ {eta} min · {dest.km} km</p>
                    </div>
                    <p className="font-display text-xl font-extrabold text-gold">{price} F</p>
                  </motion.div>
                )}
                <button
                  disabled={!dest}
                  onClick={() => setPhase("search")}
                  className="mt-3 w-full rounded-full bg-gold-gradient py-3 text-sm font-bold text-navy disabled:opacity-40"
                >
                  Commander
                </button>
              </motion.div>
            )}
            {phase === "search" && (
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-400/20 border-t-orange-400" />
                <p className="mt-3 text-sm font-semibold">Recherche d&apos;un conducteur…</p>
                <p className="text-xs text-navy-200">3 zémidjans à proximité</p>
              </motion.div>
            )}
            {phase === "riding" && (
              <motion.div key="riding" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400/20 text-orange-400">
                    <Bike className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Rachid · Moto AB-1234</p>
                    <p className="flex items-center gap-1 text-xs text-navy-200">
                      <Star className="h-3 w-3 fill-gold text-gold" /> 4,9 · Arrivée dans {Math.max(1, Math.round(eta * (1 - progress)))} min
                    </p>
                  </div>
                  <p className="font-display text-lg font-extrabold text-gold">{price} F</p>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-orange-400 transition-[width]" style={{ width: `${progress * 100}%` }} />
                </div>
              </motion.div>
            )}
            {phase === "done" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <p className="font-display text-lg font-extrabold">Vous êtes arrivé ! 🎉</p>
                <p className="text-xs text-navy-200">Merci d&apos;avoir voyagé avec Speed Go.</p>
                <div className="my-3 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }}>
                      <Star className="h-6 w-6 fill-gold text-gold" />
                    </motion.span>
                  ))}
                </div>
                <button onClick={reset} className="w-full rounded-full bg-gold-gradient py-3 text-sm font-bold text-navy">
                  Nouvelle course
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoFrame>
  );
}
