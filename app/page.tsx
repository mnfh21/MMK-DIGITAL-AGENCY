import Link from "next/link";
import { Button, Card, Head, Section } from "@/components/ui";
import Reveal from "@/components/Reveal";
import HeroVisual from "@/components/HeroVisual";
import PortfolioGrid from "@/components/PortfolioGrid";
import FaqList from "@/components/FaqList";
import { packages, services, workflow } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Section dark>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-lime">Digital agency · demo site</p>
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">We build web experiences that <span className="text-lime">move people</span>.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/70">Design, development and e-commerce for ambitious brands. Configure your project in minutes and see a live summary.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button href="/start-project">Start your project</Button><Button href="/portfolio" tone="ghost">See sample work</Button></div>
          </Reveal>
          <HeroVisual />
        </div>
      </Section>
      <Section>
        <Head kicker="Services" title="What we do" />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}><Card className="h-full"><h3 className="text-xl font-bold">{s.title}</h3><p className="mt-2 text-black/70">{s.blurb}</p><Link className="mt-4 inline-block font-semibold underline" href={`/services/${s.slug}`}>Learn more</Link></Card></Reveal>
          ))}
        </div>
      </Section>
      <Section dark>
        <Head kicker="Portfolio" title="Selected sample projects" sub="Illustrative concepts, not real client work." />
        <PortfolioGrid limit={3} />
        <div className="mt-8"><Button href="/portfolio" tone="ghost">View all</Button></div>
      </Section>
      <Section>
        <Head kicker="Process" title="How we work" />
        <ol className="grid gap-6 md:grid-cols-4">
          {workflow.map(([t, d], i) => (<li key={t}><Card className="h-full"><p className="text-3xl font-extrabold text-black/20">0{i + 1}</p><h3 className="mt-2 font-bold">{t}</h3><p className="mt-1 text-sm text-black/70">{d}</p></Card></li>))}
        </ol>
      </Section>
      <Section dark>
        <Head kicker="Pricing" title="Example packages" sub="Illustrative prices, not binding quotes." />
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((p) => (<Card key={p.id}><h3 className="font-bold">{p.name}</h3><p className="mt-1 text-2xl font-extrabold">${p.price.toLocaleString("en-US")}</p><p className="text-sm text-black/60">Up to {p.pages} pages</p></Card>))}
        </div>
        <div className="mt-8"><Button href="/pricing">Compare packages</Button></div>
      </Section>
      <Section>
        <Head kicker="FAQ" title="Common questions" />
        <FaqList limit={4} />
        <div className="mt-6"><Link href="/faq" className="font-semibold underline">All questions</Link></div>
      </Section>
      <Section dark>
        <div className="text-center"><h2 className="text-4xl font-extrabold md:text-5xl">Ready to plan your website?</h2><p className="mx-auto mt-3 max-w-xl text-white/70">Build your project brief step by step. It stays in your browser.</p><div className="mt-8"><Button href="/start-project">Start your project</Button></div></div>
      </Section>
    </>
  );
}
