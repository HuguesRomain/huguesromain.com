import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GlassFilter } from "@/components/ui/glass-filter";
import { GridLines } from "@/components/ui/grid-lines";
import { SiteNav } from "@/components/site-nav";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hugues Romain — Ingénieur full-stack & IA",
  description:
    "Ingénieur full-stack & IA freelance. Posez vos questions directement à une IA qui répond à sa place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-mono text-text">
        <GlassFilter />
        <GridLines />
        <SiteNav />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
