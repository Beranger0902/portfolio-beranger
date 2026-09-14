"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, ChevronLeft, Clock, Stethoscope, User } from "lucide-react";
import { useState } from "react";
import DemoFrame from "./DemoFrame";

const doctors = [
  { id: 1, name: "Dr Adjovi", spec: "Médecine générale", color: "#38bdf8", busy: ["09:00", "10:30", "15:00"] },
  { id: 2, name: "Dr Sènou", spec: "Pédiatrie", color: "#c9a227", busy: ["08:30", "11:00", "14:00", "16:30"] },
  { id: 3, name: "Dr Hounkpè", spec: "Cardiologie", color: "#34d399", busy: ["08:00", "09:30", "14:30"] },
];
const days = ["Lun 14", "Mar 15", "Mer 16", "Jeu 17", "Ven 18"];
const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

export default function MediLinkDemo() {
  const [step, setStep] = useState(0);
  const [doctor, setDoctor] = useState<(typeof doctors)[number] | null>(null);
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");

  const reset = () => {
    setStep(0);
    setDoctor(null);
    setSlot(null);
    setName("");
  };

  const steps = ["Praticien", "Créneau", "Confirmation"];

  return (
    <DemoFrame url="medilink.africa/rendez-vous">
      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                i < step ? "bg-emerald-400 text-navy" : i === step ? "bg-gold text-navy" : "bg-white/10 text-navy-200"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`text-xs font-semibold ${i === step ? "text-cream" : "text-navy-200"}`}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="grid gap-3 sm:grid-cols-3">
            {doctors.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setDoctor(d);
                  setStep(1);
                }}
                className="group rounded-2xl border border-white/10 bg-navy-900/60 p-5 text-left transition hover:-translate-y-1 hover:border-gold"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: d.color + "33" }}>
                  <Stethoscope className="h-6 w-6" style={{ color: d.color }} />
                </span>
                <p className="mt-4 font-display text-lg font-bold">{d.name}</p>
                <p className="text-sm text-navy-200">{d.spec}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-400">● {slots.length - d.busy.length} créneaux disponibles</p>
              </button>
            ))}
          </motion.div>
        )}

        {step === 1 && doctor && (
          <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="mb-4 flex items-center justify-between">
              <button onClick={() => setStep(0)} className="inline-flex items-center gap-1 text-sm text-navy-200 hover:text-gold">
                <ChevronLeft className="h-4 w-4" /> Changer de praticien
              </button>
              <p className="text-sm font-bold" style={{ color: doctor.color }}>
                {doctor.name} · {doctor.spec}
              </p>
            </div>
            <div className="mb-4 flex gap-2 overflow-auto">
              {days.map((d, i) => (
                <button
                  key={d}
                  onClick={() => {
                    setDay(i);
                    setSlot(null);
                  }}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${day === i ? "bg-gold text-navy" : "bg-white/5 text-navy-100 hover:bg-white/10"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {slots.map((s) => {
                const off = doctor.busy.includes(s) || (day % 2 === 0 && s === "10:00");
                return (
                  <button
                    key={s}
                    disabled={off}
                    onClick={() => setSlot(s)}
                    className={`rounded-lg py-2 text-sm font-semibold transition ${
                      off
                        ? "cursor-not-allowed bg-white/[0.03] text-navy-400 line-through"
                        : slot === s
                          ? "bg-gold text-navy shadow-glow-sm"
                          : "bg-white/5 text-cream hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full rounded-full border border-white/10 bg-navy-900 py-2.5 pl-10 pr-4 text-sm placeholder:text-navy-300 focus:border-gold focus:outline-none"
                />
              </div>
              <button
                disabled={!slot || !name}
                onClick={() => setStep(2)}
                className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-navy disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirmer {slot ?? ""}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && doctor && (
          <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-md text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400 text-navy shadow-[0_0_40px_rgba(52,211,153,0.5)]"
            >
              <Check className="h-10 w-10" />
            </motion.span>
            <h4 className="mt-5 font-display text-2xl font-extrabold">Rendez-vous confirmé !</h4>
            <p className="mt-1 text-sm text-navy-200">Un SMS de rappel sera envoyé à {name} la veille.</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-navy-900/60 p-5 text-left">
              {[
                [Stethoscope, `${doctor.name} — ${doctor.spec}`],
                [Calendar, `${days[day]} septembre 2026`],
                [Clock, `${slot} · Centre de santé Sainte-Rita`],
              ].map(([Icon, txt], i) => {
                const I = Icon as typeof Stethoscope;
                return (
                  <p key={i} className="flex items-center gap-3 py-1.5 text-sm">
                    <I className="h-4 w-4 text-gold" /> {txt as string}
                  </p>
                );
              })}
            </div>
            <button onClick={reset} className="mt-5 text-sm font-semibold text-gold hover:underline">
              Prendre un autre rendez-vous
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </DemoFrame>
  );
}
