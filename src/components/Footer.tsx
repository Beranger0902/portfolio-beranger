import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 px-6 py-10 text-sm text-navy-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-cream">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-sm text-navy">BA</span>
          Beranger<span className="text-gold">.</span>
        </Link>
        <p className="text-center">© {new Date().getFullYear()} {profile.name}. Conçu et développé avec Next.js & Tailwind CSS.</p>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, Icon: Github, label: "GitHub" },
            { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
