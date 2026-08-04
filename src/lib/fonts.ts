import { Inter } from "next/font/google";

export const brandFont = Inter({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export const fontVariables = brandFont.variable;
