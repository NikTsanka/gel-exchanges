import { NBGResponse, Currency } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CurrencyPageContent } from "./CurrencyPageContent";

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

  return (
    <CurrencyPageContent currency={currency} allCurrencies={data.currencies} />
  );
}
