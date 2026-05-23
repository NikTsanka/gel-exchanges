import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavHomeLink } from "@/components/NavHomeLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GEL Rate — NBG | ლარის კურსი",
  description:
    "National Bank of Georgia (NBG) official GEL exchange rates. Calculator, history, favorites. / საქართველოს ეროვნული ბანკის ოფიციალური კურსი.",
  keywords: "GEL, lari, NBG, exchange rate, კურსი, ლარი, ვალუტა",
  openGraph: {
    title: "GEL Rate — NBG",
    description: "National Bank of Georgia official exchange rate",
    locale: "ka_GE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <LangProvider>
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                <NavHomeLink />
                <nav className="flex items-center gap-1">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </nav>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
