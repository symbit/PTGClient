export interface ExportAnalysis {
  nForecasts: number;
  emaHalflife: number;
  trendType: 'first_difference';
  ar: number;
  i: number;
  ma: number;
  realizationIds: number[];
  startDate: string;
  endDate: string;
}
