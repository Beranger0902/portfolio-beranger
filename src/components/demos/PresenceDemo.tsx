"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LocateFixed, MapPin, XCircle } from "lucide-react";
import { useState } from "react";
import DemoFrame from "./DemoFrame";

type Log = { id: number; name: string; time: string; site: string; status: "ok" | "late" | "refused"; dist: number };

const RADIUS = 150;
const initial: Log[] = [
  { id: 1, name: "Aïcha Dossou", time: "07:58", site: "Siège", status: "ok", dist: 22 },
  { id: 2, name: "Koffi Mensah", time: "08:14", site: "Agence Calavi", status: "late", dist: 61 },
  { id: 3, name: "Nadège Kpodo", time: "07:45", site: "Siège", status: "ok", dist: 8 },
];

export default function PresenceDemo() {
  const [pos, setPos] = useState({ x: 50, y: 50 }); // % de la carte
  const [logs, setLogs] = useState<Log[]>(initial);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<"ok" | "refused" | null>(null);

  // le siège est au centre ; 1 % ≈ 6 m
  const dist = Math.round(Math.hypot(pos.x - 50, pos.y - 50) * 6);
  const inside = dist <= RADIUS;

  const check = () => {
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const now = new Date();
      const late = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 0);
      const status: Log["status"] = inside ? (late ? "late" : "ok") : "refused";
      setLogs((l) => [
        { id: Date.now(), name: "Vous (démo)", time: now.toTimeString().slice(0, 5), site: "Siège", status, dist },
        ...l,
      ]);
      setResult(inside ? "ok" : "refused");
      setChecking(false);
    }, 1400);
  };

  const counts = {
    ok: logs.filter((l) => l.status === "ok").length,
    late: logs.filter((l) => l.status === "late").length,
    refused: logs.filter((l) => l.status === "refused").length,
  };

  return (
    <DemoFrame url="presences.drwintech.com/pointage">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* Carte */}
        <div>
          <p className="mb-2 text-xs text-navy-200">
            Déplacez votre position sur la carte, puis pointez. Le pointage est accepté uniquement dans le périmètre de {RADIUS} m.
          </p>
          <div
            className="relative aspect-[4/3] cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-navy-900"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              setResult(null);
            }}
          >
            {/* rues */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#fff2 1px, transparent 1px), linear-gradient(90deg, #fff2 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute left-0 right-0 top-[38%] h-3 bg-white/10" />
            <div className="absolute bottom-0 top-0 left-[62%] w-3 bg-white/10" />
            {/* périmètre */}
            <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-teal-400/70 bg-teal-400/10" style={{ aspectRatio: "1" }} />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/40"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-teal-300">
              <MapPin className="h-8 w-8 drop-shadow" fill="currentColor" />
            </div>
            <span className="absolute left-1/2 top-[54%] -translate-x-1/2 rounded-full bg-navy-950/80 px-2 py-0.5 text-[10px] font-bold text-teal-300">Siège Cotonou</span>
            {/* utilisateur */}
            <motion.div
              className="absolute"
              animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-gold/40" />
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gold shadow-glow" />
            </motion.div>
            <AnimatePresence>
              {checking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 rounded-full bg-navy-800 px-5 py-3 text-sm font-semibold">
                    <LocateFixed className="h-5 w-5 animate-spin text-gold" /> Vérification GPS…
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              Distance du site : <span className={`font-mono font-bold ${inside ? "text-emerald-400" : "text-red-400"}`}>{dist} m</span>{" "}
              <span className="text-navy-200">({inside ? "dans le périmètre" : "hors périmètre"})</span>
            </p>
            <button
              onClick={check}
              disabled={checking}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-navy shadow-glow-sm disabled:opacity-50"
            >
              <LocateFixed className="h-4 w-4" /> Pointer maintenant
            </button>
          </div>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-3 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  result === "ok" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-red-400/40 bg-red-400/10 text-red-300"
                }`}
              >
                {result === "ok" ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {result === "ok" ? "Pointage enregistré avec succès." : `Pointage refusé : vous êtes à ${dist} m du site (max ${RADIUS} m).`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tableau de bord RH */}
        <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4">
          <p className="text-sm font-bold">Tableau de bord RH · aujourd&apos;hui</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["Présents", counts.ok, "#34d399"],
              ["Retards", counts.late, "#febc2e"],
              ["Refusés", counts.refused, "#ff5f57"],
            ].map(([l, v, c]) => (
              <div key={l as string} className="rounded-xl bg-white/5 p-3 text-center">
                <p className="font-display text-2xl font-extrabold" style={{ color: c as string }}>
                  {v}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-navy-200">{l}</p>
              </div>
            ))}
          </div>
          <ul className="mt-4 max-h-72 space-y-2 overflow-auto pr-1">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.li
                  key={l.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-800 p-3"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: l.status === "ok" ? "#34d399" : l.status === "late" ? "#febc2e" : "#ff5f57" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.name}</p>
                    <p className="text-xs text-navy-200">
                      {l.time} · {l.site} · {l.dist} m
                    </p>
                  </div>
                  <span className="text-xs font-bold" style={{ color: l.status === "ok" ? "#34d399" : l.status === "late" ? "#febc2e" : "#ff5f57" }}>
                    {l.status === "ok" ? "À l'heure" : l.status === "late" ? "Retard" : "Refusé"}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </DemoFrame>
  );
}
