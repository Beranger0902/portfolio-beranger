"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker servi depuis /public (copie de pdfjs-dist/build/pdf.worker.min.mjs)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// Rendu du PDF en canvas via pdf.js : fonctionne aussi sur mobile, contrairement à une iframe.
export default function CvViewer({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.min(el.clientWidth - 24, 900));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full overflow-auto px-3 py-4">
      {error ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-navy-200">
          <p className="text-sm">L&apos;aperçu n&apos;a pas pu être chargé.</p>
          <a href={url} target="_blank" rel="noreferrer" className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-bold text-navy">
            Ouvrir le PDF
          </a>
        </div>
      ) : (
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setPages(numPages)}
          onLoadError={() => setError(true)}
          loading={
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-navy-200">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold/20 border-t-gold" />
              <p className="text-sm">Chargement de l&apos;aperçu…</p>
            </div>
          }
          className="flex flex-col items-center gap-4"
        >
          {width > 0 &&
            Array.from({ length: pages }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-lg shadow-2xl"
              />
            ))}
        </Document>
      )}
    </div>
  );
}
