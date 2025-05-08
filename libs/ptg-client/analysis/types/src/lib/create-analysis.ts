export interface CreateAnalysis {
  nForecasts: number;
  emaHalflife: number;
  trendType: string;
  ar: number;
  i: number;
  ma: number;
  startDate: string;
  endDate: string;
}
