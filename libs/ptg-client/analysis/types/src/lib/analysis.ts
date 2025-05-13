export interface RealizationDetails {
  indicatorNames: string[];
  indicatorSectors: string[];
  indicatorRegions: string[];
  indicatorFrequencies: string[];
  startDate: string;
  endDate: string;
}

export type IndicatorTrend = 'flat' | 'increasing' | 'decreasing';

export interface RawTimeSeries {
  dates: string[];
  values: number[];
}

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

export interface AnalysisResults {
  startDate: string;
  endDate: string;
  realizationDetails: {
    realizationId: number;
    indicatorName: string;
    indicatorSector: string;
    indicatorRegion: string;
    indicatorFrequency: string;
  };
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
    label: string;
    data: number[];
  }[];
}
