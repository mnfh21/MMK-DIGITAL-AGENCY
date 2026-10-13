import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, HelpCircle, Sparkles } from "lucide-react";
import { Button, Card, PageHero, Section } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/lib/data";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Get in touch"
        title="Let's build something remarkable"
        sub="Have a new project or question? Send a message or explore our planning tool."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <Card className="border border-black/10 bg-white">
              <h2 className="mb-6 text-xl font-bold text-ink flex items-center gap-2">
                <Sparkles size={18} className="text-lime" /> Direct Contact Information
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-lime/20 text-ink shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-black/50">Email</span>
                    <a href={`mailto:${contact.email}`} className="font-semibold text-ink hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-lime/20 text-ink shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-black/50">Phone</span>
                    <a href={`tel:${contact.phone}`} className="font-semibold text-ink hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-lime/20 text-ink shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-black/50">Office</span>
                    <p className="font-medium text-black/80">{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-lime/20 text-ink shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-black/50">Working Hours</span>
                    <p className="font-medium text-black/70">{contact.hours}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="rounded-2xl border border-black/10 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-ink">Prefer planning step-by-step?</h4>
                <p className="text-xs text-black/60 mt-0.5">Estimate costs and define project scope in our interactive planner.</p>
              </div>
              <Button href="/start-project" tone="dark" className="shrink-0 text-xs">
                Start Planner <ArrowUpRight size={13} />
              </Button>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-ink">Need technical support?</h4>
                <p className="text-xs text-black/60 mt-0.5">Visit the support center or browse our FAQ.</p>
              </div>
              <div className="flex gap-2">
                <Link href="/support" className="text-xs font-bold underline hover:text-black">Support</Link>
                <span>·</span>
                <Link href="/faq" className="text-xs font-bold underline hover:text-black">FAQ</Link>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
