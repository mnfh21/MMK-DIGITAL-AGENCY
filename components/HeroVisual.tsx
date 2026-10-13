"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, TrendingUp, CheckCircle2, Sparkles, Layers, ShieldCheck } from "lucide-react";

function Float({ d, className, children }: { d: number; className: string; children?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 4 + d, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg lg:max-w-xl py-6 select-none">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-lime/20 via-cyan-500/10 to-purple-500/10 rounded-3xl blur-3xl opacity-50" />

      {/* Main Glassmorphic Window Mockup */}
      <div className="relative rounded-2xl border border-white/15 bg-ink-card/90 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/50 font-mono">
            <span>https://mmk-studio.digital</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-lime font-semibold">
            <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
            Live
          </div>
        </div>

        {/* Mockup Canvas */}
        <div className="space-y-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 w-24 rounded-full bg-lime/80 mb-2" />
              <div className="h-4 w-44 rounded-md bg-white/80 font-bold" />
            </div>
            <div className="h-8 px-3 rounded-lg bg-lime text-ink font-bold text-xs flex items-center gap-1">
              <Zap size={13} />
              <span>Launch Ready</span>
            </div>
          </div>

          {/* Grid Cards in Window */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] text-white/60">Speed Score</p>
              <p className="text-lg font-extrabold text-lime mt-0.5">99 / 100</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-lime w-[99%]" />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] text-white/60">Conversion</p>
              <p className="text-lg font-extrabold text-white mt-0.5">+142%</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
                <TrendingUp size={11} />
                <span>Exceeding KPI</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] text-white/60">Code Health</p>
              <p className="text-lg font-extrabold text-sky-400 mt-0.5">A+ Clean</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-sky-300">
                <ShieldCheck size={11} />
                <span>Zero defects</span>
              </div>
            </div>
          </div>

          {/* Wireframe content preview */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-12 rounded bg-white/40" />
              <div className="h-2 w-28 rounded bg-white/20" />
            </div>
            <div className="h-10 rounded-lg bg-gradient-to-r from-lime/20 via-emerald-500/10 to-transparent border border-lime/30 flex items-center px-3 justify-between">
              <span className="text-xs text-lime font-medium flex items-center gap-1.5">
                <Sparkles size={13} /> Next.js 14 App Architecture
              </span>
              <span className="text-[10px] text-white/60 font-mono">0.18s FCP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge 1 - Top Right */}
      <Float
        d={0.5}
        className="absolute -top-3 -right-3 sm:-right-6 rounded-xl border border-lime/40 bg-ink-card/95 backdrop-blur-md px-3.5 py-2.5 shadow-xl text-white"
      >
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-lime/20 text-lime">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">Pixel Perfect</p>
            <p className="text-[10px] text-white/60 mt-0.5">Mobile & Desktop</p>
          </div>
        </div>
      </Float>

      {/* Floating Badge 2 - Bottom Left */}
      <Float
        d={1.2}
        className="absolute -bottom-4 -left-3 sm:-left-6 rounded-xl border border-white/20 bg-ink-card/95 backdrop-blur-md px-3.5 py-2.5 shadow-xl text-white"
      >
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-lime">
            <Layers size={16} />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">Interactive Brief</p>
            <p className="text-[10px] text-white/60 mt-0.5">Live Price Calculator</p>
          </div>
        </div>
      </Float>
    </div>
  );
}
