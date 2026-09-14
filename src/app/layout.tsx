import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CvProvider from "@/components/CvProvider";

export const metadata: Metadata = {
  title: "Beranger Agbodainon — Développeur Full-Stack",
  description:
    "Portfolio professionnel de Beranger Agbodainon, développeur full-stack spécialisé en architecture SaaS, Next.js, Laravel et PostgreSQL.",
  keywords: ["développeur full-stack", "Next.js", "Laravel", "SaaS", "Bénin", "Cotonou"],
  authors: [{ name: "Beranger Agbodainon" }],
  openGraph: {
    title: "Beranger Agbodainon — Développeur Full-Stack",
    description: "Je conçois des plateformes numériques utiles, solides et évolutives.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CvProvider>
          <ScrollProgress />
          <CursorGlow />
          {children}
          <BackToTop />
        </CvProvider>
      </body>
    </html>
  );
}
