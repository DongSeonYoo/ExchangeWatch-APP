export interface ExchangeRate {
  baseCurrency: string;
  currencyCode: string;
  rate: number;
  change: number;
  changePct: number;
  timestamp: number;
}

export interface ExchangeRateDaily {
  idx: number;
  baseCurrency: string;
  currencyCode: string;
  openRate: number;
  highRate: number;
  lowRate: number;
  closeRate: number;
  avgRate: number;
  rateCount: number;
  ohlcDate: Date;
  createdAt: Date;
}

export interface ExchangeRateHistory {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  average: number;
  rateCount: number;
}
