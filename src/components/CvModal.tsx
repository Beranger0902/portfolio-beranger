"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const CvViewer = dynamic(() => import("./CvViewer"), { ssr: false });

export const CV_URL = "/CV_Beranger_Agbodainon.pdf";

export default function CvModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cv-backdrop"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/80 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu du CV"
        >
          <motion.div
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-800 shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-navy-900/60 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-navy">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-cream sm:text-base">CV — Beranger Agbodainon</p>
                  <p className="text-xs text-navy-200">Aperçu avant téléchargement · PDF</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-cream transition hover:border-gold hover:text-gold sm:inline-flex"
                >
                  <ExternalLink className="h-4 w-4" /> Ouvrir dans un onglet
                </a>
                <motion.a
                  href={CV_URL}
                  download="CV_Beranger_Agbodainon.pdf"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-xs font-bold text-navy shadow-glow-sm sm:text-sm"
                >
                  <Download className="h-4 w-4" /> Télécharger
                </motion.a>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-red-400 hover:text-red-400"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Aperçu rendu par pdf.js (fonctionne sur mobile) */}
            <div className="relative min-h-0 flex-1 bg-navy-950">
              <CvViewer url={CV_URL} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
