import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button, Card, Notice, PageHero, Section } from "@/components/ui";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function Project({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const otherProjects = projects.filter((x) => x.slug !== params.slug).slice(0, 2);

  return (
    <>
      <PageHero
        kicker={`${p.cat} Case Study`}
        title={p.title}
        sub={`${p.blurb} Commissioned concept for ${p.client} (${p.year}).`}
      />

      <Section>
        {/* Main visual showcase banner */}
        <div
          className={`relative mb-10 h-72 md:h-96 w-full rounded-2xl bg-gradient-to-br ${p.hue} p-6 md:p-10 shadow-xl overflow-hidden flex flex-col justify-between text-white border border-black/10`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span>https://concept.{p.slug}.preview</span>
            </div>
            <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {p.year} Edition
            </span>
          </div>

          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black drop-shadow-md tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm md:text-base text-white/90 drop-shadow">
              Architecture & Interface Design for {p.client}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {p.metrics?.map((m) => (
              <div
                key={m.label}
                className="rounded-xl bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 text-xs md:text-sm font-bold flex items-center gap-2"
              >
                <TrendingUp size={14} className="text-lime" />
                <span>
                  {m.label}: <strong className="text-lime">{m.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <Notice kind="demo">
            This is an illustrative portfolio concept developed to showcase our design and engineering standards.
          </Notice>
        </div>

        {/* Content split */}
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-ink">Project Overview</h3>
              <p className="mt-3 text-base md:text-lg text-black/75 leading-relaxed">
                {p.blurb} Designed with a clean component hierarchy, fast server-side rendering, and responsive typography optimized for both desktop conversion and mobile engagement.
              </p>
            </div>

            {/* Scope / Deliverables */}
            <Card>
              <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-lime" />
                Scope of Work & Deliverables
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.scope.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm font-medium text-black/80">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-lime/20 text-ink text-xs font-bold">
                      ✓
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Interconnected links banner */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/50">Service Category</p>
                <h4 className="text-lg font-bold text-ink">Need similar {p.serviceTitle} work?</h4>
                <p className="text-sm text-black/60 mt-1">Explore our detailed service breakdown and capabilities.</p>
              </div>
              <Button href={`/services/${p.serviceSlug}`} tone="outline" className="shrink-0">
                View {p.serviceTitle} <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>

          {/* Sidebar CTA & Next Steps */}
          <div className="space-y-6">
            <Card dark className="text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-bold text-lime">
                <Sparkles size={12} /> Ready to start?
              </span>
              <h3 className="mt-3 text-xl font-bold">Build your project like {p.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Configure your required pages, design system preferences, and features in our interactive planner.
              </p>
              <div className="mt-6 space-y-3">
                <Button href="/start-project" className="w-full justify-center">
                  Start a project <Zap size={14} />
                </Button>
                <Button href="/pricing" tone="ghost" className="w-full justify-center">
                  Compare package prices
                </Button>
              </div>
            </Card>

            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <h4 className="font-bold text-sm text-ink mb-3">Other featured concepts</h4>
              <div className="space-y-2">
                {otherProjects.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/portfolio/${other.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 transition group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-black">{other.title}</p>
                      <p className="text-xs text-black/50">{other.cat}</p>
                    </div>
                    <ArrowUpRight size={14} className="text-black/40 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition"
            >
              <ArrowLeft size={16} /> Back to all portfolio projects
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
