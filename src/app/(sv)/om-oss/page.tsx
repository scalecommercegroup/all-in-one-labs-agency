import type { Metadata } from "next";
import { AboutPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("about", "sv");

export default function Page() {
  return <AboutPage locale="sv" />;
}
