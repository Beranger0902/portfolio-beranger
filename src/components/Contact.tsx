"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Clé Web3Forms (https://web3forms.com) : si définie, le message arrive directement par e-mail.
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const composed = () => `${form.subject ? `*${form.subject}*\n\n` : ""}${form.message}\n\n— ${form.name}${form.email ? ` · ${form.email}` : ""}`;

  const sendWhatsApp = () => {
    window.open(`${profile.whatsapp}?text=${encodeURIComponent(composed())}`, "_blank", "noopener");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(form.subject || `Contact depuis le portfolio — ${form.name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(composed())}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!web3formsKey) return sendWhatsApp();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: form.subject || `Contact depuis le portfolio — ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const cards = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: "Téléphone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
    { Icon: MessageCircle, label: "WhatsApp", value: profile.phone, href: profile.whatsapp },
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

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Contact</p>
                <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                  Construisons quelque chose <span className="text-gold-gradient">d&apos;utile.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-navy-100">
                  Vous avez un projet web, une plateforme SaaS ou une idée de produit numérique ? Échangeons sur vos
                  besoins — je réponds généralement sous 24 h.
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

              <motion.form
                onSubmit={submit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-3xl border border-white/10 bg-navy-900/60 p-6 backdrop-blur-xl md:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Votre nom" required />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="vous@exemple.com" required />
                </div>
                <div className="mt-4">
                  <Field label="Sujet" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} placeholder="Plateforme SaaS, site web, API…" />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy-200">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet en quelques lignes…"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-navy-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                {status === "sent" ? (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0" /> Message envoyé ! Je vous réponds très vite.
                  </div>
                ) : (
                  <>
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="shine-card mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 font-bold text-navy shadow-glow disabled:opacity-60"
                    >
                      {web3formsKey ? (
                        <>
                          <Send className="h-4 w-4" /> {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4" /> Envoyer via WhatsApp
                        </>
                      )}
                    </motion.button>
                    <div className="mt-3 flex items-center justify-center gap-4 text-xs text-navy-300">
                      {web3formsKey && (
                        <button type="button" onClick={sendWhatsApp} className="inline-flex items-center gap-1 font-semibold text-cream/80 hover:text-gold">
                          <MessageCircle className="h-3.5 w-3.5" /> ou via WhatsApp
                        </button>
                      )}
                      <button type="button" onClick={sendEmail} className="inline-flex items-center gap-1 font-semibold text-cream/80 hover:text-gold">
                        <Mail className="h-3.5 w-3.5" /> ou par e-mail
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="mt-3 text-center text-xs text-red-300">L&apos;envoi a échoué — utilisez WhatsApp ou l&apos;e-mail ci-dessus.</p>
                    )}
                  </>
                )}
              </motion.form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy-200">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-navy-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}
