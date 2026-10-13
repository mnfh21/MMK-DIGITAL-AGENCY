import Link from "next/link";
import { Mail, Phone, Clock, ArrowUpRight, LifeBuoy } from "lucide-react";
import { Button, Card, Head, PageHero, Section } from "@/components/ui";
import FaqList from "@/components/FaqList";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/lib/data";

export const metadata = { title: "Support" };

export default function Support() {
  return (
    <>
      <PageHero
        kicker="Client Care"
        title="Support Center"
        sub="Find answers, submit a simulated ticket, or connect directly with our engineering team."
      />
      <Section>
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card className="border border-black/10 bg-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime/20 text-ink">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-black/50">Direct Email</p>
                <a href={`mailto:${contact.email}`} className="font-bold text-ink hover:underline">
                  {contact.email}
                </a>
              </div>
            </div>
          </Card>

          <Card className="border border-black/10 bg-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime/20 text-ink">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-black/50">Phone Hotline</p>
                <a href={`tel:${contact.phone}`} className="font-bold text-ink hover:underline">
                  {contact.phone}
                </a>
              </div>
            </div>
          </Card>

          <Card className="border border-black/10 bg-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime/20 text-ink">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-black/50">Operating Hours</p>
                <p className="text-sm font-bold text-ink">{contact.hours}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <Head title="Search Knowledge Base & FAQ" />
            <Button href="/faq" tone="outline" className="hidden sm:inline-flex text-xs">
              View all FAQs <ArrowUpRight size={13} />
            </Button>
          </div>
          <FaqList limit={6} />
        </div>

        <div className="mt-14">
          <Head
            title="Submit a Support Ticket"
            sub="UI demo: tickets are formatted locally and can be copied or launched in your email client."
          />
          <ContactForm ticket />
        </div>
      </Section>
    </>
  );
}
