"use client";

import { Currency, getRatePerUnit } from "@/lib/types";
import { getFlag } from "@/lib/flags";
import { getDiffClass, getDiffArrow } from "@/lib/currency-utils";
import Link from "next/link";

interface Props {
  currencies: Currency[];
  favorites: string[];
  onToggle: (code: string) => void;
}

export function Favorites({ currencies, favorites, onToggle }: Props) {
  const favCurrencies = currencies.filter((c) => favorites.includes(c.code));
  if (favCurrencies.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">ჩემი ვალუტები ⭐</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {favCurrencies.map((c) => (
          <div key={c.code} className="bg-card border rounded-xl p-4 relative hover:shadow-md transition-shadow">
            <button
              onClick={() => onToggle(c.code)}
              className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-600 transition-colors text-sm"
              aria-label="ფავორიტიდან ამოღება"
            >
              ★
            </button>
            <Link href={`/currency/${c.code.toLowerCase()}`}>
              <div className="text-2xl mb-1">{getFlag(c.code)}</div>
              <p className="font-bold text-sm">{c.code}</p>
              <p className="font-mono text-base mt-1">{getRatePerUnit(c).toFixed(4)}</p>
              <p className={`text-xs mt-1 ${getDiffClass(c.diff)}`}>
                {getDiffArrow(c.diff)} {Math.abs(c.diff).toFixed(4)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
