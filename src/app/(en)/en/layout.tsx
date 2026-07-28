import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { LocaleDocument } from "@/components/LocaleDocument";
import { buildStaticMetadata, rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  ...buildStaticMetadata("home", "en"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#101223",
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LocaleDocument locale="en">{children}</LocaleDocument>;
}
