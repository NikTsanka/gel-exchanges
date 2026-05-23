import { NextRequest, NextResponse } from "next/server";

const NBG_BASE = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") ?? "ka";
  const date = searchParams.get("date");

  const url = date
    ? `${NBG_BASE}/${lang}/json/?date=${date}`
    : `${NBG_BASE}/${lang}/json`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`NBG API error: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch exchange rates", detail: String(err) },
      { status: 502 }
    );
  }
}
