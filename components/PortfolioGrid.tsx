"use client";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui";
import { filters, projects } from "@/lib/data";
import { ArrowUpRight, Sparkles, TrendingUp, RotateCcw } from "lucide-react";

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.cat === f).slice(0, limit);

  return (
    <div>
      {limit === undefined && (
        <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
          {filters.map((x) => (
            <button
              key={x}
              type="button"
              aria-pressed={f === x}
              onClick={() => setF(x)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                f === x
                  ? "border-ink bg-ink text-lime shadow-md scale-105"
                  : "border-black/15 bg-white text-ink hover:border-ink/40"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/20 p-12 text-center bg-white/60">
          <p className="text-base text-black/60">No projects found in this category.</p>
          <button
            type="button"
            onClick={() => setF("All")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-lime"
          >
            <RotateCcw size={14} /> Reset filter
          </button>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block focus:outline-none">
              <Card className="h-full flex flex-col justify-between overflow-hidden border border-black/10 bg-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] group-hover:border-black/20">
                <div>
                  {/* Visual mockup window */}
                  <div
                    className={`relative h-48 w-full rounded-xl bg-gradient-to-br ${p.hue} p-4 shadow-inner overflow-hidden flex flex-col justify-between text-white`}
                  >
                    {/* Simulated browser header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        <span>{p.slug}.demo</span>
                      </div>
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                        {p.year}
                      </span>
                    </div>

                    {/* Centered mockup badge */}
                    <div className="text-center my-auto">
                      <h4 className="text-xl font-black drop-shadow-md tracking-tight">{p.title}</h4>
                      <p className="text-xs text-white/90 drop-shadow">{p.cat} Architecture</p>
                    </div>

                    {/* Floating metric indicator */}
                    {p.metrics && p.metrics[0] && (
                      <div className="self-start rounded-lg bg-black/40 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
                        <TrendingUp size={12} className="text-lime" />
                        <span>{p.metrics[0].label}: {p.metrics[0].value}</span>
                      </div>
                    )}
                  </div>

                  {/* Metadata info */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-black/50">
                      <span className="font-semibold uppercase tracking-wider text-black/60">{p.cat}</span>
                      <span>{p.client}</span>
                    </div>
                    <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink group-hover:text-black">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-black/70 leading-relaxed line-clamp-2">
                      {p.blurb}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-ink">
                  <span className="inline-flex items-center gap-1 text-black/70 group-hover:text-ink">
                    View Case Study
                  </span>
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-black/5 group-hover:bg-lime group-hover:text-ink transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
