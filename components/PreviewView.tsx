"use client";
import Link from "next/link";
import { Button, Notice } from "@/components/ui";
import Summary from "@/components/Summary";
import { useWizard } from "@/hooks/useWizard";
import type { Config } from "@/lib/wizard";

function Mockup({ cfg }: { cfg: Config }) {
  const dark = cfg.theme === "Dark" || cfg.theme === "Mixed";
  const pages = [...cfg.pages, ...cfg.customPages];
  return (
    <div className="overflow-hidden rounded-xl border border-black/20 shadow-lg" style={{ background: dark ? cfg.accent : "#ffffff", color: dark ? "#ffffff" : "#111111" }}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/10 px-4 py-3 text-sm">
        <strong style={{ color: cfg.primary }}>{cfg.projectName || "Your project"}</strong>
        <span className="flex flex-wrap gap-3 opacity-80">{pages.slice(0, 5).map((p) => (<span key={p}>{p}</span>))}</span>
      </div>
      <div className="px-6 py-14">
        <h3 className="text-3xl font-bold">{cfg.business || "Your business"}</h3>
        <p className="mt-2 opacity-70">{cfg.goal || "Your main goal appears here."}</p>
        <span className="mt-6 inline-block rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: cfg.primary, color: cfg.accent }}>Primary action</span>
      </div>
      <p className="px-4 pb-3 text-xs opacity-60">Style: {cfg.style || "-"} · Font: {cfg.font} · Layout: {cfg.layout} · Local mockup only, not a generated website.</p>
    </div>
  );
}

export default function PreviewView() {
  const { cfg, ready } = useWizard();
  if (!ready) return <p className="py-10" role="status">Loading your brief...</p>;
  const empty = !cfg.category && !cfg.projectName;
  return (
    <div className="space-y-8">
      {empty && <Notice kind="info">No saved brief yet. The mockup below uses default values. <Link className="underline font-semibold hover:text-black" href="/start-project">Start the wizard</Link>.</Notice>}
      <Mockup cfg={cfg} />
      <Summary cfg={cfg} />
      <div className="flex flex-wrap gap-3">
        <Button tone="dark" href="/start-project">Edit brief</Button>
        <Button href="/checkout">Continue to checkout</Button>
      </div>
    </div>
  );
}
