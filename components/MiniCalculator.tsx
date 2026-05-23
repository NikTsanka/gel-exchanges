"use client";

import { useState } from "react";
import { Currency } from "@/lib/types";
import { convertCurrencies, formatAmount } from "@/lib/currency-utils";
import { getFlag } from "@/lib/flags";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currency: Currency;
  allCurrencies: Currency[];
}

export function MiniCalculator({ currency, allCurrencies }: Props) {
  const [amount, setAmount] = useState("1");
  const [gelAmount, setGelAmount] = useState(
    formatAmount(convertCurrencies(1, currency, "GEL"), 4)
  );
  const [reversed, setReversed] = useState(false);

  const handleAmount = (v: string) => {
    setAmount(v);
    const n = parseFloat(v.replace(",", "."));
    if (!isNaN(n)) {
      const result = reversed
        ? convertCurrencies(n, "GEL", currency)
        : convertCurrencies(n, currency, "GEL");
      setGelAmount(formatAmount(result, 4));
    }
  };

  const swap = () => {
    setReversed((r) => !r);
    const n = parseFloat(amount.replace(",", "."));
    if (!isNaN(n)) {
      const result = !reversed
        ? convertCurrencies(n, "GEL", currency)
        : convertCurrencies(n, currency, "GEL");
      setGelAmount(formatAmount(result, 4));
    }
  };

  void allCurrencies;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">{reversed ? "🇬🇪" : getFlag(currency.code)}</span>
        <Input
          type="number"
          value={amount}
          onChange={(e) => handleAmount(e.target.value)}
          className="font-mono"
        />
        <span className="font-medium text-sm whitespace-nowrap">
          {reversed ? "GEL" : currency.code}
        </span>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="icon" onClick={swap}>
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xl">{reversed ? getFlag(currency.code) : "🇬🇪"}</span>
        <div className="flex-1 bg-muted rounded-md px-3 py-2 font-mono text-base font-semibold">
          {gelAmount}
        </div>
        <span className="font-medium text-sm whitespace-nowrap">
          {reversed ? currency.code : "GEL"}
        </span>
      </div>
    </div>
  );
}
