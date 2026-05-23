export interface Currency {
  code: string;
  quantity: number;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: string;
  validFromDate: string;
}

export interface NBGResponse {
  date: string;
  currencies: Currency[];
}

export function getRatePerUnit(currency: Currency): number {
  return currency.rate / currency.quantity;
}

export function convertToGEL(amount: number, currency: Currency): number {
  return amount * getRatePerUnit(currency);
}

export function convertFromGEL(gelAmount: number, currency: Currency): number {
  return gelAmount / getRatePerUnit(currency);
}
