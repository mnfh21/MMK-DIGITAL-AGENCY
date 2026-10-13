import { Button, Notice, PageHero, Section } from "@/components/ui";
import PackageCards from "@/components/PackageCards";

export const metadata = { title: "Pricing" };

export default function Pricing() {
  return (
    <>
      <PageHero title="Pricing" sub="Compare example packages. Selecting one carries it into your checkout demo." />
      <Section>
        <div className="mb-8"><Notice kind="demo">All prices are illustrative examples. They are not quotes or binding offers.</Notice></div>
        <PackageCards />
        <div className="mt-8 flex flex-wrap gap-3"><Button href="/start-project">Configure your project</Button><Button tone="dark" href="/checkout">Go to checkout demo</Button></div>
      </Section>
    </>
  );
}
