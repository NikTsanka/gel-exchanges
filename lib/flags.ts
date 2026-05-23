export const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", RUB: "🇷🇺", TRY: "🇹🇷",
  AED: "🇦🇪", AMD: "🇦🇲", AUD: "🇦🇺", AZN: "🇦🇿", BRL: "🇧🇷",
  BYN: "🇧🇾", CAD: "🇨🇦", CHF: "🇨🇭", CNY: "🇨🇳", CZK: "🇨🇿",
  DKK: "🇩🇰", EGP: "🇪🇬", HKD: "🇭🇰", HUF: "🇭🇺", ILS: "🇮🇱",
  INR: "🇮🇳", IRR: "🇮🇷", ISK: "🇮🇸", JPY: "🇯🇵", KGS: "🇰🇬",
  KRW: "🇰🇷", KWD: "🇰🇼", KZT: "🇰🇿", MDL: "🇲🇩", NOK: "🇳🇴",
  NZD: "🇳🇿", PLN: "🇵🇱", QAR: "🇶🇦", RON: "🇷🇴", RSD: "🇷🇸",
  SEK: "🇸🇪", SGD: "🇸🇬", TJS: "🇹🇯", TMT: "🇹🇲", UAH: "🇺🇦",
  UZS: "🇺🇿", ZAR: "🇿🇦", GEL: "🇬🇪",
};

export function getFlag(code: string): string {
  return CURRENCY_FLAGS[code] ?? "🏳️";
}
