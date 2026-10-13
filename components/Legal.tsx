import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { legal } from "@/lib/data";

const legalPages = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy" },
  { key: "terms", label: "Terms & Conditions", href: "/terms" },
  { key: "cookies", label: "Cookie Policy", href: "/cookies" },
];

export default function Legal({ k }: { k: string }) {
  const doc = legal[k];
  return (
    <>
      <PageHero title={doc.title} sub="Draft template for this demo site. Have a qualified professional review it before real use." />
      <Section>
        {/* Interlinked navigation tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-black/10 pb-4">
          {legalPages.map((p) => {
            const active = p.key === k;
            return (
              <Link
                key={p.key}
                href={p.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-ink text-lime shadow-sm"
                    : "bg-white text-ink/75 hover:bg-black/5 hover:text-ink border border-black/10"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>

        <div className="max-w-3xl space-y-8">
          {doc.sections.map(([h, t]) => (
            <div key={h} className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-ink">{h}</h2>
              <p className="mt-3 text-black/75 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
