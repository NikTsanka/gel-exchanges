"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { NBGResponse, Currency } from "@/lib/types";
import { Calculator } from "@/components/Calculator";
import { TopMovers } from "@/components/TopMovers";
import { Favorites } from "@/components/Favorites";
import { CurrencyTable } from "@/components/CurrencyTable";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_FAVORITES = ["USD", "EUR", "GBP", "RUB", "TRY"];

interface Props {
  initialData: NBGResponse | null;
}

export function ClientPage({ initialData }: Props) {
  const [data, setData] = useState<NBGResponse | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);

  useEffect(() => {
    const stored = localStorage.getItem("gel-favorites");
    if (stored) {
      try { setFavorites(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const toggleFavorite = useCallback((code: string) => {
    setFavorites((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      localStorage.setItem("gel-favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/currencies");
      const json = await res.json();
      setData(json[0] ?? null);
    } finally {
      setLoading(false);
    }
  };

  const currencies: Currency[] = useMemo(() => data?.currencies ?? [], [data]);

  const formattedDate = data?.date
    ? format(new Date(data.date), "d MMMM yyyy", { locale: ka })
    : "";

  if (!data) {
    return (
      <div className="text-center py-24">
        <p className="text-2xl mb-2">⚠️</p>
        <p className="text-muted-foreground">კურსების ჩატვირთვა ვერ მოხერხდა</p>
        <Button onClick={refresh} className="mt-4">სცადე თავიდან</Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold">₾ ლარის გაცვლითი კურსი</h1>
        <p className="text-muted-foreground">
          NBG ოფიციალური კურსი — {formattedDate}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={refresh}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          განახლება
        </Button>
      </section>

      {/* Calculator */}
      <section>
        <Calculator currencies={currencies} />
      </section>

      {/* Top Movers */}
      <section>
        <h2 className="text-lg font-semibold mb-4">დღის მოძრაობა</h2>
        <TopMovers currencies={currencies} />
      </section>

      {/* Favorites */}
      <section>
        <Favorites
          currencies={currencies}
          favorites={favorites}
          onToggle={toggleFavorite}
        />
      </section>

      {/* Full Table */}
      <section>
        <h2 className="text-lg font-semibold mb-4">ყველა ვალუტა</h2>
        <CurrencyTable
          currencies={currencies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </section>
    </div>
  );
}
