"use client";
import { Button, Card } from "@/components/ui";
import { packages } from "@/lib/data";
import { useWizard } from "@/hooks/useWizard";

export default function PackageCards() {
  const { cfg, setCfg, ready } = useWizard();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {packages.map((p) => {
        const on = ready && cfg.pkg === p.id;
        return (
          <Card key={p.id} className={on ? "ring-2 ring-ink" : ""}>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-2 text-3xl font-extrabold">${p.price.toLocaleString("en-US")}</p>
            <p className="text-sm text-black/60">Example price, not a quote · up to {p.pages} pages</p>
            <ul className="mt-4 space-y-2 text-sm">{p.points.map((x) => (<li key={x}>✓ {x}</li>))}</ul>
            <Button tone={on ? "dark" : "primary"} className="mt-6 w-full" onClick={() => setCfg((c) => ({ ...c, pkg: p.id }))}>{on ? "Selected" : `Select ${p.name}`}</Button>
          </Card>
        );
      })}
    </div>
  );
}
