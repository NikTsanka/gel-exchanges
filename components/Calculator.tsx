"use client";

import { useState, useCallback } from "react";
import { Currency } from "@/lib/types";
import { convertCurrencies, formatAmount } from "@/lib/currency-utils";
import { getFlag } from "@/lib/flags";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const QUICK_AMOUNTS = [100, 500, 1000, 10000];
const GEL_OPTION = "GEL";

interface Props {
  currencies: Currency[];
}

export function Calculator({ currencies }: Props) {
  const t = useT();
  const [fromCode, setFromCode] = useState(GEL_OPTION);
  const [toCode, setToCode] = useState("USD");
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("");

  const allOptions = [
    { code: GEL_OPTION, name: "ქართული ლარი" } as Currency & { code: string },
    ...currencies,
  ];

  const getCurrency = (code: string): Currency | "GEL" =>
    code === GEL_OPTION
      ? "GEL"
      : currencies.find((c) => c.code === code) ?? "GEL";

  const parseAmount = (v: string) =>
    parseFloat(v.replace(/\s/g, "").replace(",", "."));

  const recalcTo = useCallback(
    (amount: string, from: string, to: string) => {
      const n = parseAmount(amount);
      if (isNaN(n)) { setToAmount(""); return; }
      const result = convertCurrencies(n, getCurrency(from), getCurrency(to));
      setToAmount(formatAmount(result, 4));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currencies]
  );

  const recalcFrom = useCallback(
    (amount: string, from: string, to: string) => {
      const n = parseAmount(amount);
      if (isNaN(n)) { setFromAmount(""); return; }
      const result = convertCurrencies(n, getCurrency(to), getCurrency(from));
      setFromAmount(formatAmount(result, 4));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currencies]
  );

  const handleFromAmount = (v: string) => {
    setFromAmount(v);
    recalcTo(v, fromCode, toCode);
  };

  const handleToAmount = (v: string) => {
    setToAmount(v);
    recalcFrom(v, fromCode, toCode);
  };

  const handleFromCode = (v: string) => {
    setFromCode(v);
    recalcTo(fromAmount, v, toCode);
  };

  const handleToCode = (v: string) => {
    setToCode(v);
    recalcTo(fromAmount, fromCode, v);
  };

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
    recalcTo(fromAmount, toCode, fromCode);
  };

  const setQuick = (amount: number) => {
    setFromAmount(String(amount));
    recalcTo(String(amount), fromCode, toCode);
  };

  const CurrencySelect = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {allOptions.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {getFlag(c.code)} {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-md max-w-xl w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">{t.calcTitle}</h2>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <Input
            type="text"
            inputMode="decimal"
            value={fromAmount}
            onChange={(e) => handleFromAmount(e.target.value)}
            className="text-lg font-mono"
            aria-label={t.calcFrom}
          />
        </div>
        <CurrencySelect value={fromCode} onChange={handleFromCode} />
      </div>

      <div className="flex justify-center mb-3">
        <Button variant="outline" size="icon" onClick={swap} aria-label={t.calcSwap}>
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <Input
            type="text"
            inputMode="decimal"
            value={toAmount}
            onChange={(e) => handleToAmount(e.target.value)}
            className="text-lg font-mono"
            aria-label={t.calcTo}
          />
        </div>
        <CurrencySelect value={toCode} onChange={handleToCode} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {QUICK_AMOUNTS.map((a) => (
          <Button
            key={a}
            variant="outline"
            size="sm"
            onClick={() => setQuick(a)}
            className="text-xs"
          >
            {a.toLocaleString()}
          </Button>
        ))}
      </div>
    </div>
  );
}
