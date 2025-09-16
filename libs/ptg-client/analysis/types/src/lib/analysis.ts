import { RawTimeSeries } from '@ptg/shared-types';

export interface RealizationDetails {
  indicators: AnalysisResultsRealizationDetails[];
  indicatorSectors: string[];
  indicatorRegions: string[];
  indicatorFrequencies: string[];
  startDate: string;
  endDate: string;
}

export type IndicatorTrend = 'flat' | 'increasing' | 'decreasing';

export interface InSamplePrediction extends RawTimeSeries {
  predictionLowerCi: number[];
  predictionUpperCi: number[];
}

export type Forecast = InSamplePrediction;

export interface SeasonalDecomposition {
  dates: string[];
  trendComponent: number[];
  seasonalComponent: number[];
  seasonalDecompositionResiduals: number[];
}

export interface AcfAnalysis {
  acf: number[];
  acfLowerCi: number[];
  acfUpperCi: number[];
}

export interface PacfAnalysis {
  pacf: number[];
  pacfLowerCi: number[];
  pacfUpperCi: number[];
}

export interface AnalysisResultsRealizationDetails {
  realizationId: number;
  indicatorId: number;
  indicatorName: string;
  indicatorSector: string;
  indicatorRegion: string;
  indicatorFrequency: string;
  indicatorUnit: string;
}

export interface AnalysisResults {
  startDate: string;
  endDate: string;
  realizationDetails: AnalysisResultsRealizationDetails;
  rawTimeSeries: RawTimeSeries;
  inSamplePrediction: InSamplePrediction;
  indicatorEma: RawTimeSeries;
  forecast: Forecast;
  indicatorTrend: IndicatorTrend[];
  seasonalDecomposition: SeasonalDecomposition;
  acfAnalysis: AcfAnalysis;
  pacfAnalysis: PacfAnalysis;
}

export interface Analysis {
  correlation: number | null;
  analysisResults: AnalysisResults[];
}

export interface RawData {
  date: string;
  value: number[];
  trend: IndicatorTrend;
}

export interface ComparativeAnalysisChart {
  labels: string[];
  datasets: {
    indicatorId: number;
    label: string;
    data: number[];
    indicatorUnit: string;
  }[];
}
