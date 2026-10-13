import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "MMK Digital Agency", template: "%s · MMK Digital Agency" },
  description: "Web design, development and e-commerce by MMK Digital Agency (frontend demo site).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-mist text-ink antialiased selection:bg-lime selection:text-ink">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
