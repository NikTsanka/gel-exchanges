import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ლარის კურსი — NBG ოფიციალური",
  description:
    "საქართველოს ეროვნული ბანკის (NBG) ოფიციალური გაცვლითი კურსი ლარის (GEL) მიმართ. კალკულატორი, ისტორია, ფავორიტები.",
  keywords: "ლარი, კურსი, NBG, GEL, ვალუტა, კალკულატორი",
  openGraph: {
    title: "ლარის კურსი — NBG",
    description: "ეროვნული ბანკის ოფიციალური გაცვლითი კურსი",
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
          <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <span className="text-2xl">₾</span>
                <span>ლარის კურსი</span>
              </Link>
              <nav className="flex items-center gap-3">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  მთავარი
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
