export interface RateDetailDto {
  name: string; // 통화 이름
  rate: number; // 환율
  dayChange: number; // 일간 변동액
  dayChangePercent: number; // 일간 변동률(%)
  inverseRate: number; // 변환된(반전) 환율
  timestamp: Date;
}

export interface CurrentRatesResponseDto {
  baseCurrency: string; // 기준 통화
  rates: {
    [currencyCode: string]: RateDetailDto;
  };
}
