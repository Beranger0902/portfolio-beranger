const techs = [
  "Next.js", "React", "TypeScript", "Laravel", "PHP 8", "Node.js", "Express", "Vue.js",
  "Tailwind CSS", "PostgreSQL", "MySQL", "Prisma", "Drizzle", "Docker", "Redis", "Git",
  "JWT", "API REST", "SQLite", "Postman",
];

export default function Marquee() {
  const items = [...techs, ...techs];
  return (
    <div className="relative border-y border-gold/20 bg-navy-900 py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-sm text-cream/90 transition hover:border-gold hover:text-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
