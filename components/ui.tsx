import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Info, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";

const base = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime disabled:cursor-not-allowed disabled:opacity-40 select-none";

const tones = {
  primary: "bg-lime text-ink font-bold shadow-[0_2px_15px_-3px_rgba(198,244,50,0.4)] hover:bg-lime-hover hover:shadow-[0_4px_25px_-2px_rgba(198,244,50,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost: "border border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0",
  dark: "bg-ink text-white border border-white/10 hover:bg-black hover:border-lime/40 hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
  outline: "border border-black/15 bg-white text-ink hover:bg-black/5 hover:border-black/30 hover:-translate-y-0.5 active:translate-y-0",
};

type BP = {
  tone?: keyof typeof tones;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ tone = "primary", href, children, className = "", ...rest }: BP) {
  const c = `${base} ${tones[tone]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={c}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={c} {...rest}>
      {children}
    </button>
  );
}

export function Section({
  dark,
  id,
  children,
  className = "",
}: {
  dark?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden transition-colors ${
        dark ? "bg-ink text-white mesh-glow" : "bg-mist text-ink"
      } ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:py-24">{children}</div>
    </section>
  );
}

export function Head({
  kicker,
  title,
  sub,
  centered = false,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime">
            <Sparkles size={12} className="text-lime" />
            {kicker}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-base md:text-lg leading-relaxed opacity-75">{sub}</p>}
    </div>
  );
}

export function PageHero({
  title,
  sub,
  kicker,
}: {
  title: string;
  sub?: string;
  kicker?: string;
}) {
  return (
    <Section dark className="border-b border-white/10">
      <div className="max-w-3xl">
        {kicker && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-lime">
              <Sparkles size={12} className="text-lime" />
              {kicker}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl leading-tight">
          {title}
        </h1>
        {sub && <p className="mt-5 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">{sub}</p>}
      </div>
    </Section>
  );
}

export function Card({
  dark = false,
  children,
  className = "",
}: {
  dark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 transition-all duration-300 ${
        dark
          ? "border border-white/10 bg-ink-card/90 text-white backdrop-blur-md hover:border-lime/30 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.5)]"
          : "border border-black/8 bg-white text-ink shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.1)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "lime" | "outline";
}) {
  const styles = {
    default: "bg-black/5 text-ink border border-black/10",
    lime: "bg-lime/15 text-lime border border-lime/30",
    outline: "border border-white/20 text-white/80 bg-white/5",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}

const nt = {
  info: {
    cls: "border-sky-300/80 bg-sky-50/90 text-sky-950",
    icon: <Info size={16} className="text-sky-600 shrink-0 mt-0.5" />,
  },
  success: {
    cls: "border-emerald-300/80 bg-emerald-50/90 text-emerald-950",
    icon: <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />,
  },
  error: {
    cls: "border-red-300/80 bg-red-50/90 text-red-950",
    icon: <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />,
  },
  demo: {
    cls: "border-amber-300/80 bg-amber-50/90 text-amber-950",
    icon: <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />,
  },
};

export function Notice({
  kind = "info",
  children,
}: {
  kind?: keyof typeof nt;
  children: ReactNode;
}) {
  const item = nt[kind];
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${item.cls}`}
    >
      {item.icon}
      <div className="flex-1">{children}</div>
    </div>
  );
}
