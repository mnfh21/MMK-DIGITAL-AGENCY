import type { Config } from "@/lib/wizard";
import { Card } from "@/components/ui";

const v = (s: string) => s.trim() || "-";
const list = (a: string[]) => (a.length ? a.join(", ") : "-");

export default function Summary({ cfg, onEdit }: { cfg: Config; onEdit?: (step: number) => void }) {
  const groups: [string, number, [string, string][]][] = [
    ["Category", 0, [["Website category", v(cfg.category)]]],
    ["Project", 1, [["Project", v(cfg.projectName)], ["Business", v(cfg.business)], ["Industry", v(cfg.industry)], ["Goal", v(cfg.goal)], ["Audience", v(cfg.audience)], ["Description", v(cfg.description)], ["Existing site", v(cfg.url)]]],
    ["Pages", 2, [["Selected pages", list([...cfg.pages, ...cfg.customPages])]]],
    ["Features (frontend demos)", 3, [["Features", list(cfg.features)]]],
    ["Design", 4, [["Theme", v(cfg.theme)], ["Palette", `${cfg.palette} (${cfg.primary} / ${cfg.accent})`], ["Style", v(cfg.style)], ["Font", v(cfg.font)], ["Layout", v(cfg.layout)], ["References", v(cfg.refs)], ["Notes", v(cfg.notes)]]],
    ["Animation and complexity", 5, [["Animation", v(cfg.motion)], ["Complexity", v(cfg.complexity)], ["Mobile", v(cfg.mobile)], ["Accessibility", list(cfg.a11y)]]],
    ["Timeline and budget", 6, [["Timeline", v(cfg.timeline)], ["Budget", v(cfg.budget)], ["Additional requirements", v(cfg.extra)]]],
    ["Customer", 7, [["Name", v(cfg.name)], ["Email", v(cfg.email)], ["Company", v(cfg.company)], ["Country", v(cfg.country)], ["Contact method", v(cfg.contact)], ["Notes", v(cfg.cnotes)]]],
  ];
  return (
    <div className="grid gap-4">
      {groups.map(([title, step, rows]) => (
        <Card key={title}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">{title}</h3>
            {onEdit && <button type="button" className="text-sm underline" onClick={() => onEdit(step)}>Edit</button>}
          </div>
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {rows.map(([k, val]) => (<div key={k}><dt className="text-black/50">{k}</dt><dd className="break-words">{val}</dd></div>))}
          </dl>
        </Card>
      ))}
    </div>
  );
}
