import { PageHero, Section } from "@/components/ui";
import PreviewView from "@/components/PreviewView";

export const metadata = { title: "Project preview" };

export default function Preview() {
  return (
    <>
      <PageHero title="Project summary" sub="Your saved brief and a local visual mockup." />
      <Section><PreviewView /></Section>
    </>
  );
}
