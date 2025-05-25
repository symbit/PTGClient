import { Prediction } from './prediction';

export interface CreatePrediction {
  predictionDefinitionId: number;
  forceNewPrediction: boolean;
  startDateTime: string;
  endDateTime: string;
}

export interface CreatePredictionResponse {
  created: boolean;
  prediction: Prediction;
}
