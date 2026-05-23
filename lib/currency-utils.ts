import { Currency, getRatePerUnit } from "./types";

export function formatGEL(amount: number): string {
  return new Intl.NumberFormat("ka-GE", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount);
}

export function formatAmount(amount: number, decimals = 4): string {
  return new Intl.NumberFormat("ka-GE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function convertCurrencies(
  amount: number,
  from: Currency | "GEL",
  to: Currency | "GEL"
): number {
  if (from === "GEL" && to === "GEL") return amount;

  let gelAmount: number;
  if (from === "GEL") {
    gelAmount = amount;
  } else {
    gelAmount = amount * getRatePerUnit(from);
  }

  if (to === "GEL") return gelAmount;
  return gelAmount / getRatePerUnit(to);
}

export function getDiffClass(diff: number): string {
  if (diff > 0) return "text-red-500"; // lari weakened
  if (diff < 0) return "text-green-500"; // lari strengthened
  return "text-muted-foreground";
}

export function getDiffArrow(diff: number): string {
  if (diff > 0) return "↑";
  if (diff < 0) return "↓";
  return "→";
}

export function formatDiff(diff: number): string {
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff.toFixed(4)}`;
}
