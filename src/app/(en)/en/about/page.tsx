import type { Metadata } from "next";
import { AboutPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("about", "en");

export default function Page() {
  return <AboutPage locale="en" />;
}
