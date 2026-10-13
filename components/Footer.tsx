import Link from "next/link";
import { footerLinks } from "@/lib/data";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight group">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-lime font-black text-ink shadow-[0_0_15px_rgba(198,244,50,0.3)] group-hover:scale-105 transition-all">
                M
              </span>
              <span className="font-display">MMK</span>
            </Link>
            <p className="mt-3 text-sm text-white/65 leading-relaxed">
              Modern digital studio crafting high-impact web design, robust engineering, and revenue-driven e-commerce.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs text-lime font-medium">
              <Sparkles size={12} />
              <span>Full demo environment</span>
            </div>
          </div>

          {footerLinks.map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-lime font-sans">
                {title}
              </h3>
              <ul className="space-y-2.5 text-sm text-white/70">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 hover:text-lime transition-colors group"
                    >
                      <span>{label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-lime"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} MMK Digital Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Studio: SF · Cairo · London</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart size={12} className="text-lime fill-lime" /> for ambitious brands
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
