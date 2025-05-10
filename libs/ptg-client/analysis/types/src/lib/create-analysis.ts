import { AnalysisConfig } from './analysis-config';

export interface CreateAnalysis extends AnalysisConfig {
  realizationIds: number[];
  trendType: string;
  startDate: string;
  endDate: string;
}
