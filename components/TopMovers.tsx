import { Currency } from "@/lib/types";
import { getFlag } from "@/lib/flags";
import { getRatePerUnit } from "@/lib/types";
import Link from "next/link";

interface Props {
  currencies: Currency[];
}

export function TopMovers({ currencies }: Props) {
  const sorted = [...currencies].filter((c) => c.diff !== 0);
  const gainers = sorted
    .filter((c) => c.diff < 0)
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3);
  const losers = sorted
    .filter((c) => c.diff > 0)
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 3);

  const Card = ({ c, type }: { c: Currency; type: "gain" | "loss" }) => (
    <Link
      href={`/currency/${c.code.toLowerCase()}`}
      className="flex items-center gap-3 p-3 rounded-xl border hover:bg-accent transition-colors"
    >
      <span className="text-2xl">{getFlag(c.code)}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{c.code}</p>
        <p className="text-xs text-muted-foreground truncate">{c.name}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm">{getRatePerUnit(c).toFixed(4)} ₾</p>
        <p
          className={`text-xs font-medium ${type === "gain" ? "text-green-500" : "text-red-500"}`}
        >
          {type === "gain" ? "↓" : "↑"} {Math.abs(c.diff).toFixed(4)}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-sm text-green-600 mb-3 uppercase tracking-wide">
          ლარი გამყარდა (Top 3)
        </h3>
        <div className="space-y-2">
          {gainers.map((c) => (
            <Card key={c.code} c={c} type="gain" />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-red-500 mb-3 uppercase tracking-wide">
          ლარი დასუსტდა (Top 3)
        </h3>
        <div className="space-y-2">
          {losers.map((c) => (
            <Card key={c.code} c={c} type="loss" />
          ))}
        </div>
      </div>
    </div>
  );
}
