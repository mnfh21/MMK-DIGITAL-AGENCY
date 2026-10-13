"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button, Card, Notice } from "@/components/ui";
import Summary from "@/components/Summary";
import { useWizard } from "@/hooks/useWizard";
import { AK, Config, SK, backendFeatures, opts, palettes, steps, validate } from "@/lib/wizard";

const inp = "w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-lime";
const chip = (on: boolean) => `inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm transition ${on ? "border-ink bg-ink text-lime" : "border-black/20 bg-white hover:border-ink"}`;
const LAST = steps.length;

export default function Wizard() {
  const { cfg, setCfg, step, setStep, ready, reset } = useWizard();
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const [custom, setCustom] = useState("");
  const rm = useReducedMotion();

  if (!ready) return <p className="py-20 text-center" role="status">Loading your saved brief...</p>;

  const set = <K extends keyof Config>(k: K, v: Config[K]) => {
    setCfg((c) => ({ ...c, [k]: v }));
    setErrs((e) => { const n = { ...e }; delete n[k as string]; return n; });
  };
  const err = (k: string) => (errs[k] ? <p className="mt-1 text-sm text-red-600" role="alert">{errs[k]}</p> : null);
  const text = (k: SK, label: string, o: { area?: boolean; type?: string; opt?: boolean } = {}) => (
    <label key={k} className="block">
      <span className="mb-1 block text-sm font-medium">{label}{o.opt && <span className="text-black/50"> (optional)</span>}</span>
      {o.area ? <textarea rows={3} className={inp} value={cfg[k]} onChange={(e) => set(k, e.target.value)} /> : <input type={o.type ?? "text"} className={inp} value={cfg[k]} onChange={(e) => set(k, e.target.value)} />}
      {err(k)}
    </label>
  );
  const pick = (k: SK, label: string, list: string[]) => (
    <fieldset key={k} className="mb-5">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {list.map((o) => (<button key={o} type="button" aria-pressed={cfg[k] === o} onClick={() => set(k, o)} className={chip(cfg[k] === o)}>{cfg[k] === o && <Check size={14} />}{o}</button>))}
      </div>
      {err(k)}
    </fieldset>
  );
  const multi = (k: AK, label: string, list: string[], mark: string[] = []) => (
    <fieldset key={k} className="mb-5">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {list.map((o) => {
          const on = cfg[k].includes(o);
          return (<button key={o} type="button" aria-pressed={on} onClick={() => set(k, on ? cfg[k].filter((x) => x !== o) : [...cfg[k], o])} className={chip(on)}>{on && <Check size={14} />}{o}{mark.includes(o) ? " ◇" : ""}</button>);
        })}
      </div>
      {err(k)}
    </fieldset>
  );
  const addCustom = () => {
    const v = custom.trim();
    if (v && !cfg.customPages.includes(v) && cfg.customPages.length < 10) { set("customPages", [...cfg.customPages, v]); setCustom(""); }
  };

  const body = [
    pick("category", "What kind of website do you need?", opts.category),
    <div key="d" className="grid gap-4 md:grid-cols-2">
      {text("projectName", "Project name")}{text("business", "Business name")}{text("industry", "Business industry")}{text("audience", "Target audience")}
      <div className="md:col-span-2">{text("description", "Project description", { area: true })}</div>
      {text("goal", "Main project goal")}{text("url", "Existing website URL", { opt: true, type: "url" })}
    </div>,
    <div key="p">
      {multi("pages", "Select pages", opts.pages)}
      <div className="flex gap-2">
        <input className={inp} placeholder="Custom page name" value={custom} aria-label="Custom page name" onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }} />
        <Button tone="dark" onClick={addCustom}>Add page</Button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {cfg.customPages.map((p) => (<li key={p} className={chip(true)}>{p}<button type="button" aria-label={`Remove ${p}`} className="ml-1" onClick={() => set("customPages", cfg.customPages.filter((x) => x !== p))}>×</button></li>))}
      </ul>
    </div>,
    <div key="f">
      <div className="mb-4"><Notice kind="demo">Features marked ◇ normally need a backend. Here they are frontend demonstrations only.</Notice></div>
      {multi("features", "Select features", opts.features, backendFeatures)}
    </div>,
    <div key="s">
      {pick("theme", "Theme", opts.theme)}
      <fieldset className="mb-5"><legend className="mb-2 text-sm font-medium">Color palette</legend>
        <div className="flex flex-wrap gap-2">
          {palettes.map(([n, p, a]) => (<button key={n} type="button" aria-pressed={cfg.palette === n} className={chip(cfg.palette === n)} onClick={() => setCfg((c) => ({ ...c, palette: n, primary: p, accent: a }))}><span className="h-3 w-3 rounded-full border" style={{ background: p }} />{n}</button>))}
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <label>Primary <input type="color" value={cfg.primary} onChange={(e) => setCfg((c) => ({ ...c, palette: "Custom", primary: e.target.value }))} /></label>
          <label>Accent <input type="color" value={cfg.accent} onChange={(e) => setCfg((c) => ({ ...c, palette: "Custom", accent: e.target.value }))} /></label>
        </div>
      </fieldset>
      {pick("style", "Style", opts.style)}{pick("font", "Font preference", opts.font)}{pick("layout", "Layout preference", opts.layout)}
      <div className="grid gap-4">{text("refs", "Reference website URLs", { area: true, opt: true })}{text("notes", "Design notes", { area: true, opt: true })}</div>
    </div>,
    <div key="m">
      {pick("motion", "Animation level", opts.motion)}{pick("complexity", "Design complexity", opts.complexity)}
      {pick("mobile", "Preferred mobile experience", opts.mobile)}{multi("a11y", "Accessibility preferences", opts.a11y)}
    </div>,
    <div key="b">{pick("timeline", "Desired completion timeframe", opts.timeline)}{pick("budget", "Budget range", opts.budget)}{text("extra", "Additional requirements", { area: true, opt: true })}</div>,
    <div key="c" className="grid gap-4 md:grid-cols-2">
      {text("name", "Full name")}{text("email", "Email address", { type: "email" })}{text("company", "Company name", { opt: true })}{text("country", "Country")}
      <div className="md:col-span-2">{pick("contact", "Preferred contact method", opts.contact)}{text("cnotes", "Additional notes", { area: true, opt: true })}</div>
    </div>,
    <div key="r"><div className="mb-4"><Notice kind="demo">Your brief is saved in this browser only. Nothing is sent anywhere.</Notice></div><Summary cfg={cfg} onEdit={setStep} /></div>,
  ][step];

  const next = () => {
    const e = validate(step, cfg);
    setErrs(e);
    if (Object.keys(e).length) return;
    setStep(step + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ol className="mb-4 flex flex-wrap gap-2" aria-label="Progress">
        {[...steps, "Review"].map((s, i) => (
          <li key={s}><button type="button" disabled={i > step} aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)} className={`rounded-full px-3 py-1 text-xs font-medium ${i === step ? "bg-ink text-lime" : i < step ? "bg-lime text-ink" : "bg-black/10 text-black/50"}`}>{i + 1}. {s}</button></li>
        ))}
      </ol>
      <div className="mb-6 h-1 rounded bg-black/10"><div className="h-1 rounded bg-ink transition-all" style={{ width: `${(step / LAST) * 100}%` }} /></div>
      <Card>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={rm ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={rm ? { opacity: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <h2 className="mb-4 text-2xl font-bold">{step < LAST ? `${step + 1}. ${steps[step]}` : "Review your brief"}</h2>
            {body}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button tone="dark" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
          {step < LAST ? <Button onClick={next}>{step === LAST - 1 ? "Review" : "Next"}</Button> : <Button href="/preview">Continue to preview</Button>}
        </div>
      </Card>
      <div className="mt-6">
        {confirm ? (
          <Notice kind="error">
            <p className="mb-2">Erase your whole brief? This cannot be undone.</p>
            <div className="flex gap-3">
              <button type="button" className="rounded bg-red-700 px-3 py-1 text-white" onClick={() => { reset(); setErrs({}); setConfirm(false); }}>Yes, reset</button>
              <button type="button" className="underline" onClick={() => setConfirm(false)}>Cancel</button>
            </div>
          </Notice>
        ) : (<button type="button" className="text-sm underline" onClick={() => setConfirm(true)}>Reset brief</button>)}
      </div>
    </div>
  );
}
