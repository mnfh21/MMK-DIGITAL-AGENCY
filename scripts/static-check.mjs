// Dependency-free static checks: import resolution, named exports, route files, internal links, forbidden patterns.
import fs from "node:fs"; import path from "node:path";
const root = process.cwd(); const problems = []; const files = [];
const walk = (d) => { for (const n of fs.readdirSync(d)) { if (["node_modules", ".next", ".git"].includes(n)) continue; const p = path.join(d, n); fs.statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(n) && files.push(p); } };
walk(root);
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8")); const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const resolve = (from, spec) => { const base = spec.startsWith("@/") ? path.join(root, spec.slice(2)) : path.resolve(path.dirname(from), spec); for (const c of [base, base + ".ts", base + ".tsx", path.join(base, "index.ts"), path.join(base, "index.tsx")]) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c; return null; };
const exportsOf = (src) => { const s = new Set(); for (const m of src.matchAll(/export\s+(?:async\s+)?(?:function|const|let|class|type|interface)\s+(\w+)/g)) s.add(m[1]); for (const m of src.matchAll(/export\s*\{([^}]+)\}/g)) m[1].split(",").forEach((x) => s.add(x.trim().split(/\s+as\s+/).pop())); if (/export\s+default/.test(src)) s.add("default"); return s; };
const cache = {}; const ex = (f) => (cache[f] ??= exportsOf(fs.readFileSync(f, "utf8")));
for (const f of files) {
  const src = fs.readFileSync(f, "utf8"); const rel = path.relative(root, f);
  for (const m of src.matchAll(/import\s+(type\s+)?([^;]*?)\s+from\s+["']([^"']+)["']/gs)) {
    const [, , clause, spec] = m;
    if (spec.startsWith("@/") || spec.startsWith(".")) {
      const t = resolve(f, spec); if (!t) { problems.push(`${rel}: cannot resolve "${spec}"`); continue; }
      if (!/\.(ts|tsx)$/.test(t)) continue; const have = ex(t);
      const named = clause.match(/\{([^}]*)\}/); const def = clause.replace(/\{[^}]*\}/, "").replace(/,/g, "").trim();
      if (def && !have.has("default")) problems.push(`${rel}: "${spec}" has no default export`);
      if (named) for (const n of named[1].split(",").map((x) => x.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0]).filter(Boolean)) if (!have.has(n)) problems.push(`${rel}: "${spec}" does not export ${n}`);
    } else { const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]; if (!deps[name] && !deps["@types/" + name] && !["react", "react-dom"].includes(name)) problems.push(`${rel}: package "${name}" not in package.json`); }
  }
  if (/\.tsx$/.test(f) && /\b(useState|useEffect|useReducedMotion|usePathname|useCallback)\(/.test(src) && !/^\s*"use client"/.test(src) && !/hooks\//.test(rel)) problems.push(`${rel}: uses hooks without "use client"`);
  if (/localStorage\.(get|set|remove)Item/.test(src) && !/useEffect|useCallback/.test(src)) problems.push(`${rel}: localStorage outside effect/callback`);
  if (/"use server"|from "next\/server"|\bfetch\(/.test(src)) problems.push(`${rel}: forbidden backend pattern`);
}
// routes
const routes = []; const pages = files.filter((f) => /app[\\/].*page\.tsx$/.test(f));
for (const p of pages) { const dir = path.relative(path.join(root, "app"), path.dirname(p)).split(path.sep).filter(Boolean); routes.push("/" + dir.join("/")); if (!ex(p).has("default")) problems.push(`${p}: page has no default export`); }
const dyn = { "/services/[slug]": ["web-design", "web-development", "ecommerce"], "/portfolio/[slug]": ["lumen-studio", "north-market", "pixel-pulse", "orbit-board"] };
const concrete = new Set(routes.filter((r) => !r.includes("[")).map((r) => r || "/")); for (const [k, v] of Object.entries(dyn)) v.forEach((s) => concrete.add(k.replace("[slug]", s)));
const required = ["/", "/about", "/services", "/services/web-design", "/services/web-development", "/services/ecommerce", "/portfolio", "/start-project", "/preview", "/checkout", "/support", "/contact", "/faq", "/privacy", "/terms", "/cookies"];
for (const r of required) if (!concrete.has(r)) problems.push(`missing required route ${r}`);
const data = fs.readFileSync("lib/data.ts", "utf8"); const slugsOk = (k, key) => [...data.matchAll(new RegExp(`slug: "([^"]+)"`, "g"))].length;
let links = 0;
for (const f of files) { const src = fs.readFileSync(f, "utf8"); const hrefs = [...src.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map((m) => m[1]); if (/data\.ts$/.test(f)) hrefs.push(...[...src.matchAll(/"(\/[a-z][a-z0-9\-\/]*)"/g)].map((m) => m[1]));
  for (const h of hrefs) { links++; const n = h === "/" ? "/" : h.replace(/\/$/, ""); if (!concrete.has(n)) problems.push(`${path.relative(root, f)}: link to missing route ${h}`); } }
console.log(`files scanned: ${files.length}\nroute files: ${pages.length}\nrequired routes present: ${required.filter((r) => concrete.has(r)).length}/${required.length} (+ 4 project detail pages via [slug])\nliteral internal links checked: ${links}`);
console.log(problems.length ? "PROBLEMS:\n" + problems.map((p) => " - " + p).join("\n") : "static check: no problems found");
process.exit(problems.length ? 1 : 0);
