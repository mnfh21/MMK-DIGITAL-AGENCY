import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { Button, PageHero, Section } from "@/components/ui";
import FaqList from "@/components/FaqList";

export const metadata = { title: "FAQ" };

export default function Faq() {
  return (
    <>
      <PageHero
        title="Frequently asked questions"
        sub="Everything you need to know about our process, technology stack, and pricing structure."
      />
      <Section>
        <div className="max-w-3xl">
          <FaqList />

          <div className="mt-14 rounded-2xl border border-black/10 bg-white p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/20 text-ink">
                <HelpCircle size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink">Have a question that isn't answered here?</h3>
                <p className="mt-1 text-sm text-black/70">
                  Our team is available to assist you. Send us a message or configure a custom project brief.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/contact">
                    Contact Us <ArrowUpRight size={14} />
                  </Button>
                  <Button href="/support" tone="dark">
                    Support Center
                  </Button>
                  <Button href="/start-project" tone="outline">
                    Start a project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
