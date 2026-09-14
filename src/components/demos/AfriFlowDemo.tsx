"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bike, Package, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";
import DemoFrame from "./DemoFrame";

type Status = "pending" | "transit" | "delivered";
type Parcel = { id: string; client: string; zone: string; courier: string | null; status: Status };

const couriers = ["Rachid", "Aïcha", "Koffi"];
const zones = ["Cotonou Centre", "Calavi", "Godomey", "Akpakpa", "Fidjrossè"];
const clients = ["Boutique Mawu", "Resto Chez Nadège", "Pharmacie Étoile", "Librairie Sika", "Fashion Bénin"];

const initial: Parcel[] = [
  { id: "AF-1029", client: "Boutique Mawu", zone: "Calavi", courier: null, status: "pending" },
  { id: "AF-1030", client: "Resto Chez Nadège", zone: "Cotonou Centre", courier: "Rachid", status: "transit" },
  { id: "AF-1031", client: "Pharmacie Étoile", zone: "Akpakpa", courier: "Aïcha", status: "transit" },
  { id: "AF-1032", client: "Librairie Sika", zone: "Godomey", courier: "Koffi", status: "delivered" },
];

const cols: { key: Status; label: string; color: string }[] = [
  { key: "pending", label: "En attente", color: "#8fa4bd" },
  { key: "transit", label: "En route", color: "#c9a227" },
  { key: "delivered", label: "Livré", color: "#34d399" },
];

export default function AfriFlowDemo() {
  const [parcels, setParcels] = useState<Parcel[]>(initial);
  const [counter, setCounter] = useState(1033);

  const add = () => {
    setParcels((p) => [
      ...p,
      {
        id: `AF-${counter}`,
        client: clients[counter % clients.length],
        zone: zones[counter % zones.length],
        courier: null,
        status: "pending",
      },
    ]);
    setCounter((c) => c + 1);
  };

  const advance = (id: string) =>
    setParcels((p) =>
      p.map((x) => {
        if (x.id !== id) return x;
        if (x.status === "pending") return { ...x, status: "transit", courier: x.courier ?? couriers[Math.floor(Math.random() * couriers.length)] };
        if (x.status === "transit") return { ...x, status: "delivered" };
        return x;
      })
    );

  const assign = (id: string, courier: string) => setParcels((p) => p.map((x) => (x.id === id ? { ...x, courier } : x)));

  const count = (s: Status) => parcels.filter((p) => p.status === s).length;
  const rate = parcels.length ? Math.round((count("delivered") / parcels.length) * 100) : 0;

  return (
    <DemoFrame url="app.afriflow.bj/dashboard">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Colis", parcels.length, "#38bdf8"],
            ["En attente", count("pending"), "#8fa4bd"],
            ["En route", count("transit"), "#c9a227"],
            ["Livrés", `${rate} %`, "#34d399"],
          ].map(([l, v, c]) => (
            <div key={l as string} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-widest text-navy-200">{l}</p>
              <p className="font-display text-xl font-extrabold" style={{ color: c as string }}>
                {v}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setParcels(initial)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-navy-200 hover:border-gold hover:text-gold" title="Réinitialiser">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button onClick={add} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-bold text-navy">
            <Plus className="h-4 w-4" /> Nouveau colis
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cols.map((col) => (
          <div key={col.key} className="rounded-2xl border border-white/10 bg-navy-900/60 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-bold">{col.label}</p>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold text-navy" style={{ background: col.color }}>
                {count(col.key)}
              </span>
            </div>
            <div className="min-h-[120px] space-y-2">
              <AnimatePresence>
                {parcels
                  .filter((p) => p.status === col.key)
                  .map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="rounded-xl border border-white/10 bg-navy-800 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs" style={{ color: col.color }}>
                          #{p.id}
                        </span>
                        <Package className="h-4 w-4 text-navy-200" />
                      </div>
                      <p className="mt-1 text-sm font-bold">{p.client}</p>
                      <p className="text-xs text-navy-200">{p.zone}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        {p.status === "pending" ? (
                          <select
                            value={p.courier ?? ""}
                            onChange={(e) => assign(p.id, e.target.value)}
                            className="rounded-lg border border-white/10 bg-navy-900 px-2 py-1 text-xs text-cream"
                          >
                            <option value="">Livreur…</option>
                            {couriers.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-navy-100">
                            <Bike className="h-3.5 w-3.5 text-gold" /> {p.courier}
                          </span>
                        )}
                        {p.status !== "delivered" && (
                          <button
                            onClick={() => advance(p.id)}
                            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-gold hover:text-navy"
                          >
                            {p.status === "pending" ? "Expédier" : "Livré"} <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
