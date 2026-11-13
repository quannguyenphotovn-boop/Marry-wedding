import { Playfair_Display, Inter } from "next/font/google";

export const display = Playfair_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

export const body = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});
