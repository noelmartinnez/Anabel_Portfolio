import type { Metadata } from "next";
import { Playfair_Display, Courier_Prime } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Cursor } from "@/components/Cursor";
import { SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const courier = Courier_Prime({
  variable: "--font-courier",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Sin `metadataBase` las URLs de Open Graph salen relativas y los rastreadores
  // de WhatsApp o LinkedIn las descartan.
  metadataBase: new URL(SITE_URL),
  // Solo el nombre: es lo que se lee en la pestaña, donde no cabe mas.
  title: "Anabel Pérez Lara",
  description:
    "Portfolio creativo de Anabel Pérez: comunicación, fotografía, estilismo y estrategia de marca.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anabel Pérez",
    description:
      "Portfolio creativo de Anabel Pérez: comunicación, fotografía, estilismo y estrategia de marca.",
    type: "website",
    locale: "es_ES",
    siteName: "Anabel Pérez Lara",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anabel Pérez",
    description:
      "Portfolio creativo de Anabel Pérez: comunicación, fotografía, estilismo y estrategia de marca.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${courier.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Cursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
