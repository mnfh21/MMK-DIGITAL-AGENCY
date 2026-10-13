import { Notice, PageHero, Section } from "@/components/ui";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata = { title: "Portfolio" };

export default function Portfolio() {
  return (
    <>
      <PageHero title="Portfolio" sub="Sample concepts that show our approach." />
      <Section>
        <div className="mb-8"><Notice kind="demo">These are illustrative sample concepts, not real client projects.</Notice></div>
        <PortfolioGrid />
      </Section>
    </>
  );
}
