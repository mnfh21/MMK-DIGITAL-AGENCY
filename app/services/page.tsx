import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, Sparkles, Zap } from "lucide-react";
import { Button, Card, PageHero, Section } from "@/components/ui";
import { services } from "@/lib/data";

export const metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <PageHero
        kicker="Capabilities & Disciplines"
        title="Full-Stack Digital Craft"
        sub="Strategy, bespoke interface design, and modern web engineering delivered with precision."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Card
              key={s.slug}
              className="flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-black/10 bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-lime/20 text-ink text-xs font-bold px-3 py-1">
                    {s.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-black/50">
                    <Clock size={13} />
                    <span>{s.timeline}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-ink">{s.title}</h2>
                <p className="mt-2 text-sm text-black/70 leading-relaxed">{s.blurb}</p>

                <div className="mt-6 border-t border-black/5 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3">
                    What we include
                  </p>
                  <ul className="space-y-2 text-sm text-black/80">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lime mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-black group"
                >
                  <span>Explore service</span>
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
                <Button href="/start-project" className="!py-1.5 !px-3 !text-xs">
                  Plan <Zap size={12} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl bg-ink p-8 md:p-12 text-white relative overflow-hidden mesh-glow border border-white/10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-bold text-lime mb-4">
              <Sparkles size={12} /> Unsure which service fits?
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Build your customized project scope in minutes
            </h3>
            <p className="mt-3 text-base text-white/70 leading-relaxed">
              Our step-by-step project planner calculates pages, features, and budget ranges dynamically in your browser.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/start-project">Open Project Planner</Button>
              <Button href="/contact" tone="ghost">Schedule Consultation</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
