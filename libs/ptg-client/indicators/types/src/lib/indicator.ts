import { Realization } from './realization';

export type IndicatorSources =
  | 'gus'
  | 'nbp'
  | 'eurostat'
  | 'pmi'
  | 'gowork'
  | 'pracuj.pl'
  | 'cbop'
  | 'zus'
  | 'manual';

export interface Indicator {
  id: number;
  symbol: string;
  name: string;
  description: string;
  nextExecutionDate: string;
  source: IndicatorSources;
  realizations: Realization[];
}
