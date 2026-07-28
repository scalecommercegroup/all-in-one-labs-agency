import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/MarketingPages";
import { services } from "@/content/site";
import { buildServiceMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.copy.sv.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((candidate) => candidate.copy.sv.slug === slug);
  if (!service) return {};
  return buildServiceMetadata(service.key, "sv");
}

export default async function Page({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((candidate) => candidate.copy.sv.slug === slug);
  if (!service) notFound();
  return <ServicePage locale="sv" service={service} />;
}
