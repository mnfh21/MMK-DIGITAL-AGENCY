"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, Notice } from "@/components/ui";
import { useWizard } from "@/hooks/useWizard";
import { addons, packages } from "@/lib/data";
import { quote } from "@/lib/wizard";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function CheckoutView() {
  const { cfg, setCfg, ready } = useWizard();
  const [sel, setSel] = useState<number[]>([]);
  const [terms, setTerms] = useState(false);
  const [err, setErr] = useState("");
  const [ref, setRef] = useState("");
  if (!ready) return <p className="py-10" role="status">Loading your brief...</p>;

  const q = quote(cfg, sel);
  const missing = !cfg.name.trim() || !cfg.email.trim() || !cfg.projectName.trim();
  const submit = () => {
    if (missing) { setErr("Complete your project brief (project name, your name and email) before checkout."); return; }
    if (!terms) { setErr("Please accept the demo terms to continue."); return; }
    setErr("");
    setRef("DEMO-" + Date.now().toString(36).toUpperCase());
  };

  if (ref) {
    return (
      <Card>
        <h2 className="text-2xl font-bold">Demo checkout complete</h2>
        <div className="my-4"><Notice kind="demo">This is a simulation. No payment was taken, no order was placed and nothing was sent to MMK.</Notice></div>
        <p>Simulated reference: <strong>{ref}</strong></p>
        <p className="mt-1">Illustrative total: <strong>{money(q.total)}</strong></p>
        <div className="mt-6 flex gap-3"><Button href="/">Back to home</Button><Button tone="dark" href="/start-project">Edit brief</Button></div>
      </Card>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Notice kind="demo">Demo checkout: prices are illustrative, no card details are collected and no payment is processed.</Notice>
        <Card>
          <h2 className="mb-3 text-lg font-bold">Package</h2>
          <div className="flex flex-wrap gap-2">
            {packages.map((p) => (<button key={p.id} type="button" aria-pressed={cfg.pkg === p.id} onClick={() => setCfg((c) => ({ ...c, pkg: p.id }))} className={`rounded-full border px-4 py-2 text-sm ${cfg.pkg === p.id ? "border-ink bg-ink text-lime" : "border-black/20"}`}>{p.name} · {money(p.price)}</button>))}
          </div>
          <h2 className="mb-3 mt-6 text-lg font-bold">Optional add-ons</h2>
          {addons.map(([n, p], i) => (
            <label key={n} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" checked={sel.includes(i)} onChange={() => setSel(sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i])} />{n} (+{money(p)})</label>
          ))}
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between"><h2 className="text-lg font-bold">Your information</h2><Link className="text-sm underline hover:text-black font-medium" href="/start-project">Edit</Link></div>
          <p className="text-sm">{cfg.name || "-"} · {cfg.email || "-"}</p>
          <p className="text-sm text-black/70">Project: {cfg.projectName || "-"} · {cfg.pages.length + cfg.customPages.length} page(s) · {cfg.features.length} feature(s)</p>
        </Card>
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={terms} onChange={(e) => setTerms(e.target.checked)} />I understand this is a demo and that no order or payment will be made. See the <Link className="underline hover:text-black" href="/terms">terms</Link>.</label>
        {err && <Notice kind="error">{err}</Notice>}
        <Button onClick={submit}>Complete demo checkout</Button>
      </div>
      <Card className="h-fit">
        <h2 className="mb-3 text-lg font-bold">Price breakdown</h2>
        <ul className="space-y-2 text-sm">{q.lines.map(([n, p]) => (<li key={n} className="flex justify-between gap-3"><span>{n}</span><span>{money(p)}</span></li>))}</ul>
        <p className="mt-4 flex justify-between border-t pt-3 font-bold"><span>Illustrative total</span><span>{money(q.total)}</span></p>
      </Card>
    </div>
  );
}
