"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export function NavHomeLink() {
  const { lang, t } = useLang();
  const siteName = lang === "en" ? "GEL Rate" : "ლარის კურსი";
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-2xl">₾</span>
        <span>{siteName}</span>
      </Link>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
      >
        {t.navHome}
      </Link>
    </div>
  );
}
