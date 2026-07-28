import { Albert_Sans, Familjen_Grotesk } from "next/font/google";

export const displayFont = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable}`;
