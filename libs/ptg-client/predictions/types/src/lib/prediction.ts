import { RawTimeSeries, User } from '@ptg/shared-types';
import { Article } from '@ptg/articles-types';

export interface PredictionDefinition {
  id: number;
  name: string;
  targetRealizationId: number;
  explanatoryRealizationIds: number[];
  useRecentNews: true;
  frequency: 'monthly' | 'quarterly' | 'yearly';
}

export type PredictionStatus =
  | 'inprogress'
  | 'success'
  | 'failure'
  | 'retrying';

export interface PredictionAnalysisResults {
  forecast: PredictionForecast;
  rawTimeSeries: RawTimeSeries;
}

export interface PredictionForecast extends RawTimeSeries {
  predictionLowerCi: number[];
  predictionUpperCi: number[];
}

export interface ExplanatoryRealization {
  indicatorName: string;
  region: string;
  sector: string;
}

export interface TargetRealization {
  indicatorName: string;
  region: string;
  sector: string;
  unit: string;
}

export interface Prediction {
  id: number;
  generationDate: string;
  userId: number;
  user: User;
  predictionDefinitionId: number;
  predictionDefinition: PredictionDefinition;
  nForecast: number;
  analysisResults: PredictionAnalysisResults;
  targetRealization: TargetRealization;
  status: PredictionStatus;
  dataImpliedEndDateTime: string;
  generatedComment: string;
  explanatoryRealizations: ExplanatoryRealization[];
  usedNewsArticles: Article[];
}
