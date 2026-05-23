"use client";

import { useState, useMemo, useCallback } from "react";
import { Currency, getRatePerUnit } from "@/lib/types";
import { getDiffClass, getDiffArrow } from "@/lib/currency-utils";
import { getFlag } from "@/lib/flags";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import { Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

type SortKey = "code" | "name" | "rate" | "diff";
type SortDir = "asc" | "desc";

interface Props {
  currencies: Currency[];
  favorites: string[];
  onToggleFavorite: (code: string) => void;
}

export function CurrencyTable({ currencies, favorites, onToggleFavorite }: Props) {
  const t = useT();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("code");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [copied, setCopied] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const copyRate = useCallback(async (c: Currency) => {
    const text = `${c.code}: ${getRatePerUnit(c).toFixed(4)} ₾`;
    await navigator.clipboard.writeText(text);
    setCopied(c.code);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return currencies
      .filter((c) =>
        !q || c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "code") cmp = a.code.localeCompare(b.code);
        else if (sortKey === "name") cmp = a.name.localeCompare(b.name, "ka");
        else if (sortKey === "rate") cmp = getRatePerUnit(a) - getRatePerUnit(b);
        else if (sortKey === "diff") cmp = a.diff - b.diff;
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [currencies, search, sortKey, sortDir]);

  const SortTh = ({
    label,
    k,
  }: {
    label: string;
    k: SortKey;
  }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none hover:bg-accent transition-colors whitespace-nowrap"
      onClick={() => handleSort(k)}
      aria-sort={sortKey === k ? sortDir === "asc" ? "ascending" : "descending" : "none"}
    >
      {label}{" "}
      <span className="text-muted-foreground">
        {sortKey === k ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </th>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <SearchBar value={search} onChange={setSearch} />
        <p className="text-sm text-muted-foreground">{filtered.length} {t.countSuffix}</p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{t.notFound}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm" aria-label={t.tableLabel}>
            <thead className="bg-muted/50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide w-8"></th>
                <SortTh label={t.colCode} k="code" />
                <SortTh label={t.colName} k="name" />
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">{t.colQty}</th>
                <SortTh label={t.colRate} k="rate" />
                <SortTh label={t.colChange} k="diff" />
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.code}
                  className={`border-t hover:bg-accent/50 transition-colors ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-3 py-3">
                    <button
                      onClick={() => onToggleFavorite(c.code)}
                      className={`transition-colors ${favorites.includes(c.code) ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
                      aria-label={favorites.includes(c.code) ? t.removeFav : t.addFav}
                    >
                      <Star className="h-4 w-4" fill={favorites.includes(c.code) ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/currency/${c.code.toLowerCase()}`} className="flex items-center gap-2 font-semibold hover:text-primary">
                      <span className="text-lg">{getFlag(c.code)}</span>
                      {c.code}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{c.quantity}</td>
                  <td className="px-4 py-3 font-mono font-medium">{getRatePerUnit(c).toFixed(4)}</td>
                  <td className={`px-4 py-3 font-mono font-medium ${getDiffClass(c.diff)}`}>
                    {getDiffArrow(c.diff)} {Math.abs(c.diff).toFixed(4)}
                  </td>
                  <td className="px-3 py-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyRate(c)}
                      aria-label={t.copy}
                    >
                      <Copy className={`h-3 w-3 ${copied === c.code ? "text-green-500" : ""}`} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
