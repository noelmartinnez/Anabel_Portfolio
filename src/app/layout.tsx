import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Cursor } from "@/components/Cursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anabel Pérez Lara — Publicidad & Relaciones Públicas",
  description:
    "Portfolio de Anabel Pérez Lara, estudiante de Publicidad y Relaciones Públicas y Community Manager. Creatividad, comunicación y estrategia de marca.",
  openGraph: {
    title: "Anabel Pérez Lara — Publicidad & Relaciones Públicas",
    description:
      "Creatividad, comunicación y estrategia de marca. Portfolio de Anabel Pérez Lara.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${jost.variable}`}>
      <body>
        <LanguageProvider>
          <Cursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
