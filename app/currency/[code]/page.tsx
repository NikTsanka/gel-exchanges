import { NBGResponse, Currency, getRatePerUnit } from "@/lib/types";
import { getFlag } from "@/lib/flags";
import { getDiffClass, getDiffArrow } from "@/lib/currency-utils";
import { HistoryChart } from "@/components/HistoryChart";
import { MiniCalculator } from "@/components/MiniCalculator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getCurrencies(): Promise<NBGResponse | null> {
  try {
    const res = await fetch(
      "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `${code.toUpperCase()} კურსი — NBG`,
    description: `${code.toUpperCase()} ვალუტის ლარის კურსი საქართველოს ეროვნული ბანკიდან`,
  };
}

export default async function CurrencyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const data = await getCurrencies();
  if (!data) notFound();

  const currency: Currency | undefined = data.currencies.find(
    (c) => c.code === code.toUpperCase()
  );
  if (!currency) notFound();

  const ratePerUnit = getRatePerUnit(currency);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> მთავარზე დაბრუნება
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="text-5xl">{getFlag(currency.code)}</span>
        <div>
          <h1 className="text-3xl font-bold">{currency.code}</h1>
          <p className="text-muted-foreground">{currency.name}</p>
        </div>
      </div>

      {/* Rate */}
      <div className="bg-card border rounded-2xl p-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          {currency.quantity} {currency.code} = ქართული ლარი
        </p>
        <p className="text-5xl font-bold font-mono">{ratePerUnit.toFixed(4)} ₾</p>
        <p className={`text-lg font-medium ${getDiffClass(currency.diff)}`}>
          {getDiffArrow(currency.diff)} {Math.abs(currency.diff).toFixed(4)} გუშინდელთან შედარებით
        </p>
      </div>

      {/* Mini Calculator */}
      <div className="bg-card border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">კონვერტაცია</h2>
        <MiniCalculator currency={currency} allCurrencies={data.currencies} />
      </div>

      {/* History Chart */}
      <div className="bg-card border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">ისტორიული კურსი</h2>
        <HistoryChart code={currency.code} />
      </div>
    </div>
  );
}
