"use client";

import { Currency, getRatePerUnit } from "@/lib/types";
import { getFlag } from "@/lib/flags";
import { getDiffClass, getDiffArrow } from "@/lib/currency-utils";
import { HistoryChart } from "@/components/HistoryChart";
import { MiniCalculator } from "@/components/MiniCalculator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";

interface Props {
  currency: Currency;
  allCurrencies: Currency[];
}

export function CurrencyPageContent({ currency, allCurrencies }: Props) {
  const t = useT();
  const ratePerUnit = getRatePerUnit(currency);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t.backHome}
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-5xl">{getFlag(currency.code)}</span>
        <div>
          <h1 className="text-3xl font-bold">{currency.code}</h1>
          <p className="text-muted-foreground">{currency.name}</p>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          {currency.quantity} {currency.code} = {t.gelEquivalent}
        </p>
        <p className="text-5xl font-bold font-mono">{ratePerUnit.toFixed(4)} ₾</p>
        <p className={`text-lg font-medium ${getDiffClass(currency.diff)}`}>
          {getDiffArrow(currency.diff)} {Math.abs(currency.diff).toFixed(4)}{" "}
          {t.vsYesterday}
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">{t.conversion}</h2>
        <MiniCalculator currency={currency} allCurrencies={allCurrencies} />
      </div>

      <div className="bg-card border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">{t.historicalRate}</h2>
        <HistoryChart code={currency.code} />
      </div>
    </div>
  );
}
