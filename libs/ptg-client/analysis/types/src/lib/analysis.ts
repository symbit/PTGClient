export interface Analysis {
  rawTimeSeries: {
    dates: string[];
    values: number[];
  };
  inSamplePrediction: {
    dates: string[];
    values: number[];
    predictionLowerCi: number[];
    predictionUpperCi: number[];
  };
  forecast: {
    dates: string[];
    values: number[];
    predictionLowerCi: number[];
    predictionUpperCi: number[];
  };
  indicatorTrend: ['flat'];
  seasonalDecomposition: {
    trendComponent: number[];
    seasonalComponent: number[];
    seasonalDecompositionResiduals: number[];
  };
  indicatorEma: {
    dates: string[];
    values: number[];
  };
  acfAnalysis: {
    acf: number[];
    acfLowerCi: number[];
    acfUpperCi: number[];
  };
  pacfAnalysis: {
    pacf: number[];
    pacfLowerCi: number[];
    pacfUpperCi: number[];
  };
}
