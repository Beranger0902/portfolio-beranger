import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid-pattern flex min-h-screen items-center justify-center bg-navy-gradient px-6 text-center text-cream">
      <div>
        <p className="font-display text-6xl font-extrabold text-gold-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Page introuvable</h1>
        <p className="mt-2 text-navy-200">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-bold text-navy shadow-glow">
          <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
