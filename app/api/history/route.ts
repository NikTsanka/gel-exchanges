import { NextRequest, NextResponse } from "next/server";
import { format, subDays } from "date-fns";

const NBG_BASE = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase();
  const days = parseInt(searchParams.get("days") ?? "30");
  const lang = searchParams.get("lang") ?? "ka";

  if (!code) {
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  }

  const today = new Date();
  const dates: string[] = [];
  for (let i = days; i >= 0; i--) {
    dates.push(format(subDays(today, i), "yyyy-MM-dd"));
  }

  try {
    const results = await Promise.all(
      dates.map(async (date) => {
        const url = `${NBG_BASE}/${lang}/json/?date=${date}`;
        const res = await fetch(url, { next: { revalidate: 86400 } });
        if (!res.ok) return null;
        const data = await res.json();
        const currencies = data[0]?.currencies ?? [];
        const currency = currencies.find(
          (c: { code: string }) => c.code === code
        );
        return currency
          ? { date, rate: currency.rate / currency.quantity }
          : null;
      })
    );

    const history = results.filter(Boolean);
    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch history", detail: String(err) },
      { status: 502 }
    );
  }
}
