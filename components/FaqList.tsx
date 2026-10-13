"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FaqList({ limit }: { limit?: number }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const list = faqs.filter((f) => (f.q + " " + f.a).toLowerCase().includes(term)).slice(0, limit);
  return (
    <div>
      {limit === undefined && (
        <label className="mb-6 block">
          <span className="mb-1 block text-sm font-medium">Search questions</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. payment, storage, timeline" className="w-full rounded-lg border border-black/20 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime" />
        </label>
      )}
      <div className="space-y-3">
        {list.map((f) => (
          <details key={f.q} className="rounded-lg border border-black/10 bg-white p-4 text-ink">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-black/70">{f.a}</p>
          </details>
        ))}
        {list.length === 0 && <p role="status" className="text-black/60">No questions match "{q}". Try a different word or contact us.</p>}
      </div>
    </div>
  );
}
