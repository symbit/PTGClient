import { RawTimeSeries, User } from '@ptg/shared-types';

export interface PredictionDefinition {
  id: number;
  name: string;
  targetRealizationId: number;
  explanatoryRealizationIds: number[];
  nForecast: number;
  useRecentNews: true;
  systemPrompt: string;
}

export type PredictionStatus = 'inprogress' | 'success' | 'failure';

export interface PredictionAnalysisResults {
  forecast: PredictionForecast;
  rawTimeSeries: RawTimeSeries;
}

export interface PredictionForecast extends RawTimeSeries {
  predictionLowerCi: number[];
  predictionUpperCi: number[];
}

export interface Prediction {
  id: number;
  generationDate: string;
  userId: number;
  user: User;
  predictionDefinitionId: number;
  predictionDefinition: PredictionDefinition;
  analysisResults: PredictionAnalysisResults;
  status: PredictionStatus;
  dataImpliedStartDateTime: string;
  dataImpliedEndDateTime: string;
  generatedComment: string;
}
