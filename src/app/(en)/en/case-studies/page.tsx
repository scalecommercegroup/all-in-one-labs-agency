import type { Metadata } from "next";
import { CasesPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("cases", "en");

export default function Page() {
  return <CasesPage locale="en" />;
}
