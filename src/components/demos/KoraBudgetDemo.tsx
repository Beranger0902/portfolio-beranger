"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import DemoFrame from "./DemoFrame";

type Tx = { id: number; label: string; amount: number; category: string; type: "in" | "out" };

const categories = ["Loyer", "Salaires", "Matériel", "Cotisations", "Subventions", "Divers"];
const colors: Record<string, string> = {
  Loyer: "#a78bfa",
  Salaires: "#cf7046",
  Matériel: "#34d399",
  Cotisations: "#38bdf8",
  Subventions: "#f472b6",
  Divers: "#fb923c",
};

const initial: Tx[] = [
  { id: 1, label: "Cotisations membres", amount: 45000, category: "Cotisations", type: "in" },
  { id: 2, label: "Subvention mairie", amount: 250000, category: "Subventions", type: "in" },
  { id: 3, label: "Loyer du siège", amount: 80000, category: "Loyer", type: "out" },
  { id: 4, label: "Achat vidéoprojecteur", amount: 62500, category: "Matériel", type: "out" },
  { id: 5, label: "Indemnités bénévoles", amount: 35000, category: "Salaires", type: "out" },
];

const fmt = (n: number) => n.toLocaleString("fr-FR") + " F";

export default function KoraBudgetDemo() {
  const [txs, setTxs] = useState<Tx[]>(initial);
  const [form, setForm] = useState({ label: "", amount: "", category: "Divers", type: "out" as "in" | "out" });

  const totals = useMemo(() => {
    const income = txs.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);
    const byCat = categories
      .map((c) => ({ c, v: txs.filter((t) => t.type === "out" && t.category === c).reduce((s, t) => s + t.amount, 0) }))
      .filter((x) => x.v > 0);
    return { income, expense, balance: income - expense, byCat };
  }, [txs]);

  const add = (e: FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.label || !amount) return;
    setTxs((t) => [{ id: Date.now(), label: form.label, amount, category: form.category, type: form.type }, ...t]);
    setForm({ label: "", amount: "", category: "Divers", type: "out" });
  };

  // Donut
  const R = 54, C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <DemoFrame url="app.korabudget.org/tresorerie">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Solde", totals.balance, totals.balance >= 0 ? "#34d399" : "#ff5f57"],
          ["Recettes", totals.income, "#38bdf8"],
          ["Dépenses", totals.expense, "#ff5f57"],
        ].map(([l, v, c]) => (
          <div key={l as string} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-navy-200">{l}</p>
            <motion.p key={v as number} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-display text-xl font-extrabold" style={{ color: c as string }}>
              {fmt(v as number)}
            </motion.p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        {/* Donut */}
        <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4">
          <p className="text-sm font-bold">Répartition des dépenses</p>
          <div className="mt-3 flex items-center gap-4">
            <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
              <circle cx="70" cy="70" r={R} fill="none" stroke="#ffffff10" strokeWidth="18" />
              {totals.byCat.map(({ c, v }) => {
                const frac = totals.expense ? v / totals.expense : 0;
                const el = (
                  <motion.circle
                    key={c}
                    cx="70"
                    cy="70"
                    r={R}
                    fill="none"
                    stroke={colors[c]}
                    strokeWidth="18"
                    strokeDasharray={`${frac * C} ${C}`}
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -offset, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                );
                offset += frac * C;
                return el;
              })}
            </svg>
            <ul className="space-y-1.5 text-xs">
              {totals.byCat.map(({ c, v }) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[c] }} />
                  <span className="text-navy-100">{c}</span>
                  <span className="ml-auto font-mono text-navy-200">{Math.round((v / totals.expense) * 100)} %</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={add} className="mt-4 space-y-2 border-t border-white/10 pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Nouvelle transaction</p>
            <input
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Libellé"
              className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm placeholder:text-navy-300 focus:border-gold focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min={1}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Montant"
                className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm placeholder:text-navy-300 focus:border-gold focus:outline-none"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              {(["in", "out"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 rounded-lg border py-2 text-xs font-bold transition ${
                    form.type === t ? (t === "in" ? "border-emerald-400 bg-emerald-400/15 text-emerald-300" : "border-red-400 bg-red-400/15 text-red-300") : "border-white/10 text-navy-200"
                  }`}
                >
                  {t === "in" ? "Recette" : "Dépense"}
                </button>
              ))}
            </div>
            <button type="submit" className="w-full rounded-lg bg-gold-gradient py-2 text-sm font-bold text-navy">
              Ajouter
            </button>
          </form>
        </div>

        {/* Liste */}
        <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4">
          <p className="text-sm font-bold">Transactions ({txs.length})</p>
          <ul className="mt-3 max-h-[420px] space-y-2 overflow-auto pr-1">
            <AnimatePresence initial={false}>
              {txs.map((t) => (
                <motion.li
                  key={t.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-800 p-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.type === "in" ? "bg-emerald-400/15 text-emerald-400" : "bg-red-400/15 text-red-400"}`}
                  >
                    {t.type === "in" ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{t.label}</p>
                    <p className="text-xs text-navy-200">
                      <span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: colors[t.category] }} />
                      {t.category}
                    </p>
                  </div>
                  <span className={`font-mono text-sm font-bold ${t.type === "in" ? "text-emerald-400" : "text-red-400"}`}>
                    {t.type === "in" ? "+" : "-"}
                    {fmt(t.amount)}
                  </span>
                  <button onClick={() => setTxs((x) => x.filter((y) => y.id !== t.id))} className="text-navy-300 hover:text-red-400" aria-label="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </DemoFrame>
  );
}
