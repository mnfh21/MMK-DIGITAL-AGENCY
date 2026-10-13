import { PageHero, Section } from "@/components/ui";
import CheckoutView from "@/components/CheckoutView";

export const metadata = { title: "Checkout (demo)" };

export default function Checkout() {
  return (
    <>
      <PageHero title="Checkout (demo)" sub="A simulated checkout. No payment is taken." />
      <Section><CheckoutView /></Section>
    </>
  );
}
