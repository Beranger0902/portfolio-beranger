import type { ReactNode } from "react";

export default function DemoFrame({ url, children, phone = false }: { url: string; children: ReactNode; phone?: boolean }) {
  if (phone) {
    return (
      <div className="mx-auto w-full max-w-[360px]">
        <div className="rounded-[2.6rem] border-[6px] border-navy-950 bg-navy-950 p-2 shadow-card">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-800 text-cream">
            <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-navy-950" />
            <div className="min-h-[600px] pt-10">{children}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy-800 text-cream shadow-card">
      <div className="flex items-center gap-3 border-b border-white/10 bg-navy-900 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 rounded-full bg-navy-800 px-4 py-1.5 text-center font-mono text-xs text-navy-200">{url}</div>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">Démo live</span>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
