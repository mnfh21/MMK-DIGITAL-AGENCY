import { Section } from "@/components/ui";
import Wizard from "@/components/Wizard";

export const metadata = { title: "Start a project" };

export default function StartProject() {
  return (
    <Section>
      <h1 className="mb-8 text-center text-4xl font-extrabold md:text-5xl">Start your project</h1>
      <Wizard />
    </Section>
  );
}
