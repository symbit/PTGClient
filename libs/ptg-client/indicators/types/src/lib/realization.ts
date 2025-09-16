export interface Realization {
  id: number;
  region: string;
  sector: string;
  frequency: string;
  unit: string;
}

export interface RealizationData {
  id: number;
  date: string;
  value: number;
  addedAt: string;
  updatedAt: string;
}
