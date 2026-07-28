import type { Metadata } from "next";
import { ContactPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("contact", "sv");

export default function Page() {
  return <ContactPage locale="sv" />;
}
