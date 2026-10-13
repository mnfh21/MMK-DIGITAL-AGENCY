import { packages, addons } from "@/lib/data";

export type Config = {
  category: string; projectName: string; business: string; industry: string; description: string; audience: string; url: string; goal: string;
  pages: string[]; customPages: string[]; features: string[];
  theme: string; palette: string; primary: string; accent: string; style: string; font: string; layout: string; refs: string; notes: string;
  motion: string; complexity: string; mobile: string; a11y: string[];
  timeline: string; budget: string; extra: string;
  name: string; email: string; company: string; country: string; contact: string; cnotes: string; pkg: string;
};
export type SK = { [P in keyof Config]: Config[P] extends string ? P : never }[keyof Config];
export type AK = { [P in keyof Config]: Config[P] extends string[] ? P : never }[keyof Config];

export const defaults: Config = {
  category: "", projectName: "", business: "", industry: "", description: "", audience: "", url: "", goal: "",
  pages: ["Home", "Contact"], customPages: [], features: [],
  theme: "", palette: "Lime", primary: "#c6f432", accent: "#111111", style: "", font: "Modern sans", layout: "Standard", refs: "", notes: "",
  motion: "", complexity: "", mobile: "Mobile-first", a11y: [],
  timeline: "", budget: "", extra: "",
  name: "", email: "", company: "", country: "", contact: "", cnotes: "", pkg: "growth",
};
export const steps = ["Category", "Details", "Pages", "Features", "Design", "Motion", "Budget", "You"];
export const arrayKeys: AK[] = ["pages", "customPages", "features", "a11y"];
export const backendFeatures = ["Contact form", "Shopping cart UI", "Checkout UI", "User profile UI", "Booking interface", "Newsletter form", "Dashboard UI"];
export const palettes: [string, string, string][] = [["Lime", "#c6f432", "#111111"], ["Ocean", "#38bdf8", "#0f172a"], ["Sunset", "#fb923c", "#7c2d12"], ["Mono", "#e5e5e5", "#171717"]];
export const opts = {
  category: ["Business website", "E-commerce store", "Portfolio", "Landing page", "Blog or magazine", "SaaS or dashboard", "Educational website", "Other"],
  pages: ["Home", "About", "Services", "Portfolio", "Pricing", "Blog", "Contact", "FAQ", "Login UI", "Dashboard UI"],
  features: ["Contact form", "Search interface", "Product catalog", "Shopping cart UI", "Checkout UI", "User profile UI", "Dashboard UI", "Booking interface", "Newsletter form", "Multilingual interface", "Dark mode", "Animations", "Image gallery", "Blog interface", "Testimonials section"],
  theme: ["Light", "Dark", "Mixed"], style: ["Minimal", "Corporate", "Creative", "Futuristic", "Luxury", "Playful"],
  font: ["Modern sans", "Classic serif", "Geometric", "Monospace accent"], layout: ["Standard", "Wide", "Editorial", "Grid-heavy"],
  motion: ["No animations", "Subtle animations", "Advanced animations"], complexity: ["Basic", "Standard", "Advanced"],
  mobile: ["Mobile-first", "Desktop-first", "Equal priority"], a11y: ["High contrast", "Large text", "Reduced motion", "Screen-reader focus", "Keyboard navigation"],
  timeline: ["Under 1 month", "1-2 months", "3+ months", "Flexible"], budget: ["Under $2,000", "$2,000-$5,000", "$5,000-$10,000", "$10,000+"],
  contact: ["Email", "Phone", "Video call"],
};
const EMAIL = /^\S+@\S+\.\S+$/;

export function validate(s: number, c: Config): Record<string, string> {
  const e: Record<string, string> = {};
  const req = (k: SK, m: string) => { if (!c[k].trim()) e[k] = m; };
  if (s === 0) req("category", "Choose a website category.");
  if (s === 1) {
    req("projectName", "Enter a project name."); req("business", "Enter your business name."); req("industry", "Enter your industry.");
    req("audience", "Describe your target audience."); req("goal", "State the main goal.");
    if (c.description.trim().length < 20) e.description = "Describe the project in at least 20 characters.";
    if (c.url.trim() && !/^https?:\/\/\S+\.\S+$/.test(c.url.trim())) e.url = "Enter a full URL starting with http:// or https://.";
  }
  if (s === 2 && c.pages.length + c.customPages.length === 0) e.pages = "Select or add at least one page.";
  if (s === 4) { req("theme", "Choose a theme."); req("style", "Choose a style."); }
  if (s === 5) { req("motion", "Choose an animation level."); req("complexity", "Choose a design complexity."); }
  if (s === 6) { req("timeline", "Choose a timeframe."); req("budget", "Choose a budget range."); }
  if (s === 7) {
    req("name", "Enter your full name."); req("country", "Enter your country."); req("contact", "Choose a contact method.");
    if (!EMAIL.test(c.email.trim())) e.email = "Enter a valid email address.";
  }
  return e;
}

export function quote(c: Config, sel: number[] = []) {
  const p = packages.find((x) => x.id === c.pkg) ?? packages[1];
  const pages = c.pages.length + c.customPages.length;
  const lines: [string, number][] = [[`${p.name} package (example price)`, p.price]];
  const extra = Math.max(0, pages - p.pages);
  if (extra) lines.push([`${extra} extra page(s) x 120`, extra * 120]);
  if (c.features.length) lines.push([`${c.features.length} feature(s) x 90`, c.features.length * 90]);
  if (c.motion === "Advanced animations") lines.push(["Advanced animations", 600]);
  if (c.complexity === "Advanced") lines.push(["Advanced design complexity", 800]);
  sel.forEach((i) => { const a = addons[i]; if (a) lines.push(a); });
  return { lines, total: lines.reduce((t, l) => t + l[1], 0) };
}
