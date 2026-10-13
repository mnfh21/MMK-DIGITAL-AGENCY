"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { nav } from "@/lib/data";

export default function Header() {
  const path = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [hasBrief, setHasBrief] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mmk_wizard_config") || localStorage.getItem("mmk-brief-v1");
      if (stored) {
        const raw = JSON.parse(stored);
        const parsed = raw.cfg || raw;
        if (parsed.projectName || parsed.category) {
          setHasBrief(true);
        } else {
          setHasBrief(false);
        }
      } else {
        setHasBrief(false);
      }
    } catch {
      // Ignore storage errors
    }
  }, [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl text-white transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-extrabold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-lime font-black text-ink shadow-[0_0_15px_rgba(198,244,50,0.3)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(198,244,50,0.5)] transition-all">
              M
            </div>
            <span className="font-display tracking-tight text-white group-hover:text-lime transition-colors">
              MMK <span className="text-xs font-semibold uppercase tracking-widest text-white/50 block md:inline md:ml-1 font-sans">Digital</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
            <span>Available for new projects</span>
          </div>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map(([label, href]) => {
            const targetHref = href as string;
            const isActive = targetHref === "/" ? path === "/" : path.startsWith(targetHref);
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-semibold transition-colors duration-200 ${
                  isActive ? "text-lime" : "text-white/75 hover:text-white"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-lime" />
                )}
              </Link>
            );
          })}

          {hasBrief && (
            <Link
              href="/preview"
              className="inline-flex items-center gap-1.5 rounded-lg border border-lime/30 bg-lime/10 px-2.5 py-1 text-xs font-semibold text-lime hover:bg-lime/20 transition"
              title="View your saved project brief"
            >
              <Sparkles size={12} />
              <span>Draft active</span>
            </Link>
          )}

          <Button href="/start-project" className="!py-2 !px-4 text-xs">
            Start a project
            <ArrowUpRight size={14} />
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-2xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-3 px-5 py-6">
              {nav.map(([label, href]) => {
                const targetHref = href as string;
                const isActive = targetHref === "/" ? path === "/" : path.startsWith(targetHref);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-white/10 text-lime"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-lime" />}
                  </Link>
                );
              })}

              {hasBrief && (
                <Link
                  href="/preview"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm font-semibold text-lime"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} /> View Saved Brief
                  </span>
                  <span>Review →</span>
                </Link>
              )}

              <div className="pt-2">
                <Button href="/start-project" className="w-full justify-center">
                  Start a project
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
