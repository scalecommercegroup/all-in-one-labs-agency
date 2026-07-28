import type { Metadata } from "next";
import { PrivacyPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("privacy", "en");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
