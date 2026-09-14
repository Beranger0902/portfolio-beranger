"use client";

import { AnimatePresence, motion } from "framer-motion";
import { QrCode, ScanLine, Ticket, Users } from "lucide-react";
import { useMemo, useState } from "react";
import DemoFrame from "./DemoFrame";

type Attendee = { id: string; name: string; type: "Standard" | "VIP"; checked: boolean };

const initial: Attendee[] = [
  { id: "TSC-01248", name: "Amina Kossou", type: "VIP", checked: true },
  { id: "TSC-01249", name: "Jean Tossou", type: "Standard", checked: true },
  { id: "TSC-01250", name: "Fifamè Dako", type: "Standard", checked: false },
  { id: "TSC-01251", name: "Rodrigue Hounsou", type: "VIP", checked: false },
];
const prices = { Standard: 5000, VIP: 15000 };

// Motif pseudo-QR déterministe à partir d'une chaîne
function qrCells(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < 49; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h >> 16) % 2 === 0);
  }
  return cells;
}

export default function EventsDemo() {
  const [list, setList] = useState<Attendee[]>(initial);
  const [name, setName] = useState("");
  const [type, setType] = useState<"Standard" | "VIP">("Standard");
  const [ticket, setTicket] = useState<Attendee | null>(initial[0]);
  const [counter, setCounter] = useState(1252);

  const stats = useMemo(() => {
    const revenue = list.reduce((s, a) => s + prices[a.type], 0);
    const checked = list.filter((a) => a.checked).length;
    return { revenue, checked, rate: list.length ? Math.round((checked / list.length) * 100) : 0 };
  }, [list]);

  const register = () => {
    if (!name.trim()) return;
    const a: Attendee = { id: `TSC-0${counter}`, name: name.trim(), type, checked: false };
    setList((l) => [a, ...l]);
    setTicket(a);
    setName("");
    setCounter((c) => c + 1);
  };

  const scan = (id: string) => setList((l) => l.map((a) => (a.id === id ? { ...a, checked: true } : a)));

  return (
    <DemoFrame url="events.drwintech.com/tech-summit-2026">
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Inscrits", list.length, Users, "#f472b6"],
          ["Billets vendus", list.length, Ticket, "#cf7046"],
          ["Revenus", `${stats.revenue.toLocaleString("fr-FR")} F`, Ticket, "#34d399"],
          ["Présence", `${stats.rate} %`, ScanLine, "#38bdf8"],
        ].map(([l, v, Icon, c]) => {
          const I = Icon as typeof Users;
          return (
            <div key={l as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <I className="h-5 w-5" style={{ color: c as string }} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-200">{l as string}</p>
                <p className="font-display text-lg font-extrabold">{v as string}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4">
          <p className="text-sm font-bold">Inscription · Tech Summit Cotonou</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && register()}
              placeholder="Nom du participant"
              className="flex-1 rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm placeholder:text-navy-300 focus:border-gold focus:outline-none"
            />
            <div className="flex gap-1 rounded-lg bg-navy-800 p-1">
              {(["Standard", "VIP"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition ${type === t ? "bg-gold text-navy" : "text-navy-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button onClick={register} className="rounded-lg bg-gold-gradient px-4 py-2 text-sm font-bold text-navy">
              Générer le billet
            </button>
          </div>

          <ul className="mt-4 max-h-64 space-y-2 overflow-auto pr-1">
            <AnimatePresence initial={false}>
              {list.map((a) => (
                <motion.li
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setTicket(a)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    ticket?.id === a.id ? "border-gold/60 bg-gold/5" : "border-white/10 bg-navy-800 hover:border-white/30"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${a.checked ? "bg-emerald-400" : "bg-navy-300"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{a.name}</p>
                    <p className="font-mono text-xs text-navy-200">#{a.id}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${a.type === "VIP" ? "bg-gold/20 text-gold" : "bg-white/10 text-navy-100"}`}>{a.type}</span>
                  {!a.checked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scan(a.id);
                      }}
                      className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-emerald-400 hover:text-navy"
                    >
                      <ScanLine className="h-3 w-3" /> Scanner
                    </button>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Billet */}
        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {ticket && (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-gold-gradient p-5 text-navy shadow-glow"
              >
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-navy-800" />
                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-navy-800" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Tech Summit Cotonou</p>
                    <p className="mt-1 font-display text-xl font-extrabold">{ticket.name}</p>
                    <p className="text-xs font-semibold">18 sept. 2026 · 09:00 · Palais des Congrès</p>
                  </div>
                  <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-gold">{ticket.type}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-navy/40 pt-4">
                  <div>
                    <p className="font-mono text-sm font-bold">#{ticket.id}</p>
                    <p className={`mt-1 text-xs font-bold ${ticket.checked ? "text-emerald-800" : ""}`}>
                      {ticket.checked ? "✓ Entrée validée" : "En attente de scan"}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold">
                      <QrCode className="h-3 w-3" /> QR sécurisé
                    </p>
                  </div>
                  <div className="grid grid-cols-7 gap-[2px] rounded-lg bg-navy p-2">
                    {qrCells(ticket.id).map((on, i) => (
                      <span key={i} className={`h-2 w-2 ${on ? "bg-cream" : "bg-navy"}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoFrame>
  );
}
