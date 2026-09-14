import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Github, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDemo from "@/components/demos";
import ProjectHero from "@/components/ProjectHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Beranger Agbodainon`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main>
      <Navbar home={false} />
      <ProjectHero project={project} />

      {/* Contenu */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <Reveal>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Le projet</p>
              <h2 className="font-display text-xl font-extrabold text-navy md:text-2xl">Contexte & solution</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                {project.longDescription.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mt-12 font-display text-xl font-bold text-navy">Fonctionnalités clés</h3>
            </Reveal>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <StaggerItem key={f}>
                  <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-gold hover:shadow-card">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="text-sm leading-6 text-slate-700">{f}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <aside className="space-y-6">
            <Reveal direction="left">
              <div className="rounded-3xl bg-navy-gradient p-7 text-cream shadow-card">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Résultats</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-xl bg-white/5 p-3 text-center">
                      <p className="font-display text-xl font-extrabold text-gold">{r.value}</p>
                      <p className="mt-1 text-[11px] leading-tight text-navy-200">{r.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-gold">Stack technique</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-2">
                  {project.demoComponent && (
                    <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-navy shadow-glow-sm">
                      <Play className="h-4 w-4" /> Tester la démo interactive
                    </a>
                  )}
                  {project.links.site && (
                    <a href={project.links.site} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-gold hover:text-gold">
                      <ExternalLink className="h-4 w-4" /> Voir le site en ligne
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-gold hover:text-gold">
                      <Github className="h-4 w-4" /> Code source
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Informations</p>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ["Catégorie", project.category],
                    ["Année", project.year],
                    ["Type", project.kind === "pro" ? "Projet professionnel" : "Démonstration conceptuelle"],
                    ["Rôle", "Développeur full-stack"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="text-right font-semibold text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Démo */}
      {project.demoComponent && (
        <section id="demo" className="noise relative overflow-hidden bg-navy-gradient px-6 py-20 text-cream">
          <div className="grid-pattern absolute inset-0 opacity-60" />
          <div className="absolute -right-40 top-0 h-[420px] w-[420px] animate-blob rounded-full blur-[110px]" style={{ background: project.accent + "33" }} />
          <div className="relative mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Démo interactive</p>
              <h2 className="font-display text-xl font-extrabold md:text-2xl">Testez {project.title}</h2>
              <p className="mt-3 max-w-2xl text-navy-100">
                Une version simplifiée et fonctionnelle de l&apos;application, qui tourne directement dans votre navigateur. Cliquez, saisissez, explorez.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <ProjectDemo id={project.demoComponent} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { p: prev, label: "Projet précédent", Icon: ArrowLeft, align: "left" },
            { p: next, label: "Projet suivant", Icon: ArrowRight, align: "right" },
          ].map(({ p, label, Icon, align }) => (
            <Link
              key={label}
              href={`/projets/${p.slug}`}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-gold hover:shadow-card ${align === "right" ? "flex-row-reverse text-right" : ""}`}
            >
              <img src={p.cover} alt="" className="h-20 w-32 shrink-0 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="min-w-0 flex-1">
                <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gold">
                  {align === "left" && <Icon className="h-3.5 w-3.5" />}
                  {label}
                  {align === "right" && <Icon className="h-3.5 w-3.5" />}
                </p>
                <p className="mt-1 truncate font-display text-lg font-bold text-navy">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/#projets" className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-bold text-navy transition hover:bg-navy hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Tous les projets
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
