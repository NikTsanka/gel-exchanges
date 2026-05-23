import { NBGResponse } from "@/lib/types";
import { ClientPage } from "./ClientPage";

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

export default async function Home() {
  const data = await getCurrencies();
  return <ClientPage initialData={data} />;
}
