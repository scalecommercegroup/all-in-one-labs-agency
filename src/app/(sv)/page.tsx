import type { Metadata } from "next";
import { HomePage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("home", "sv");

export default function Page() {
  return <HomePage locale="sv" />;
}
