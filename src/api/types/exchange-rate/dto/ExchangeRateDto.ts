export interface RateDetailDto {
  name: string; // 통화 이름
  rate: number; // 환율
  dayChange: number; // 일간 변동액
  dayChangePercent: number; // 일간 변동률(%)
}

export interface CurrentRatesResponseDto {
  baseCurrency: string; // 기준 통화
  rates: {
    [currencyCode: string]: RateDetailDto;
  };
}
