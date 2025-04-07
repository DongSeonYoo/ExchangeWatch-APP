/**
 * SSE로 전달되는 환율 업데이트 정보
 */
export interface LatestRateUpdateDto {
  rate: number; // 현재 환율
  change: number; // 변동액
  changePct: number; // 변동률(%)
  timestamp: number; // 타임스탬프
  baseCurrency: string; // 기준 통화
  currencyCode: string; // 대상 통화
}
