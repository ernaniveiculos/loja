import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { FAVICON_DATA_URI } from "@/lib/brand-assets";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ernani Veículos — Compra, venda e consignação de veículos",
  description: "Encontre o carro ideal, anuncie seu veículo ou deixe em consignação com a Ernani Veículos.",
  icons: {
    icon: FAVICON_DATA_URI,
    shortcut: FAVICON_DATA_URI,
    apple: FAVICON_DATA_URI,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
