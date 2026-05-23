"use client";

import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 h-9 font-semibold text-xs tracking-wide"
      onClick={() => setLang(lang === "ka" ? "en" : "ka")}
      aria-label={`Switch to ${lang === "ka" ? "English" : "Georgian"}`}
    >
      {t.langLabel}
    </Button>
  );
}
