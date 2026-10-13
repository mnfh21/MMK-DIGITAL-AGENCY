import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button, Card, Head, PageHero, Section } from "@/components/ui";

export const metadata = { title: "About" };

export default function About() {
  const values: [string, string][] = [
    ["Clarity", "Simple structures and honest communication."],
    ["Craft", "Careful typography, spacing and detail."],
    ["Reliability", "Code that builds, runs and can be maintained."],
  ];

  return (
    <>
      <PageHero
        title="About MMK"
        sub="A creative technology studio for web design, development and e-commerce. This site is a frontend demonstration."
      />
      <Section>
        <Head
          kicker="Our approach"
          title="Design and engineering together"
          sub="We keep strategy, design and development in one team so your website stays coherent from first sketch to launch."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(([t, d]) => (
            <Card key={t}>
              <h3 className="font-bold text-xl">{t}</h3>
              <p className="mt-2 text-black/70 leading-relaxed">{d}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-black/10 bg-white p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime-900">
                <Sparkles size={12} className="text-lime-700" />
                Explore Our Work
              </span>
              <h3 className="mt-3 text-2xl font-bold text-ink">Ready to collaborate on your next digital product?</h3>
              <p className="mt-1 text-black/70 max-w-xl">
                See our sample case studies, explore capabilities, or start drafting your project brief in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/start-project">
                Start a project <ArrowUpRight size={14} />
              </Button>
              <Button href="/portfolio" tone="dark">
                View portfolio
              </Button>
              <Button href="/services" tone="outline">
                Our services
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
