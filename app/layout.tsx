import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildWebsiteSchema, buildOrganizationSchema } from "@/lib/seo/buildMetadata";

export const metadata: Metadata = {
  title: {
    default: "Fjarvit — Indian Credit Card Benefit Changes",
    template: "%s | Fjarvit",
  },
  description:
    "Track cashback, reward, and lounge benefit changes on Indian credit cards, with before/after examples.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = buildWebsiteSchema();
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
