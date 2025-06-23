import { Realization } from './realization';
import { IndicatorGroup } from './indicator-groups';

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
  group: IndicatorGroup;
  source: IndicatorSources;
  realizations: Realization[];
}
