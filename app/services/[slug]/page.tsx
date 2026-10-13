import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Sparkles, Zap, Layers } from "lucide-react";
import { Button, Card, Notice, PageHero, Section } from "@/components/ui";
import { services, projects } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function Service({ params }: { params: { slug: string } }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();

  const relatedProj = projects.find((p) => p.slug === s.relatedProject);
  const otherServices = services.filter((x) => x.slug !== params.slug);

  return (
    <>
      <PageHero
        kicker={s.badge}
        title={s.title}
        sub={`${s.blurb} Estimated typical turnaround: ${s.timeline}.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Service Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
              <h3 className="text-2xl font-bold text-ink">Service Scope & Methodology</h3>
              <p className="mt-4 text-base md:text-lg text-black/75 leading-relaxed">
                {s.detail}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-black/60">
                <Clock size={16} className="text-lime" />
                <span>Typical sprint timeline: {s.timeline}</span>
              </div>
            </div>

            {/* Inclusions */}
            <Card>
              <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-lime" />
                Standard Deliverables & Capabilities
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium text-black/80">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-lime/20 text-ink text-xs font-bold">
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Related Case Study Card */}
            {relatedProj && (
              <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                    Featured Implementation
                  </span>
                  <span className="text-xs font-semibold text-lime-800 bg-lime/20 px-2.5 py-0.5 rounded-full">
                    {relatedProj.cat}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-ink">{relatedProj.title}</h4>
                    <p className="text-sm text-black/65 mt-1">{relatedProj.blurb}</p>
                  </div>
                  <Button href={`/portfolio/${relatedProj.slug}`} tone="outline" className="shrink-0">
                    View Case Study <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA & Next Steps */}
          <div className="space-y-6">
            <Card dark className="text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-bold text-lime">
                <Sparkles size={12} /> Plan this service
              </span>
              <h3 className="mt-3 text-xl font-bold">Configure your {s.title} project</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Choose your specific pages, features, and styling in the project builder.
              </p>
              <div className="mt-6 space-y-3">
                <Button href="/start-project" className="w-full justify-center">
                  Start in Planner <Zap size={14} />
                </Button>
                <Button href="/pricing" tone="ghost" className="w-full justify-center">
                  Compare Packages
                </Button>
              </div>
            </Card>

            {/* Other Services Navigation */}
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <h4 className="font-bold text-sm text-ink mb-3">Explore other services</h4>
              <div className="space-y-2">
                {otherServices.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 transition group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-black">{other.title}</p>
                      <p className="text-xs text-black/50">{other.badge}</p>
                    </div>
                    <ArrowUpRight size={14} className="text-black/40 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition"
            >
              <ArrowLeft size={16} /> Back to all services
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
