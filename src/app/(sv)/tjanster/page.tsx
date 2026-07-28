import type { Metadata } from "next";
import { ServicesPage } from "@/components/MarketingPages";
import { buildStaticMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticMetadata("services", "sv");

export default function Page() {
  return <ServicesPage locale="sv" />;
}
