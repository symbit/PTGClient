export interface RealizationDetails {
  indicatorName: string;
  indicatorSector: string;
  indicatorRegion: string;
  indicatorFrequency: string;
  startDate?: string;
  endDate?: string;
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

export interface Analysis {
  startDate: string;
  endDate: string;
  realizationDetails: RealizationDetails;
  rawTimeSeries: RawTimeSeries;
  inSamplePrediction: InSamplePrediction;
  indicatorEma: RawTimeSeries;
  forecast: Forecast;
  indicatorTrend: IndicatorTrend[];
  seasonalDecomposition: SeasonalDecomposition;
  acfAnalysis: AcfAnalysis;
  pacfAnalysis: PacfAnalysis;
}

export interface RawData {
  date: string;
  value: number;
  trend: IndicatorTrend;
}
