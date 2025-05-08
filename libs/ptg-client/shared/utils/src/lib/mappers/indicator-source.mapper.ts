import { Pipe, PipeTransform } from '@angular/core';
import { IndicatorSources } from '@ptg/indicators-types';

@Pipe({
  name: 'indicatorSource',
})
export class IndicatorSourceMapper implements PipeTransform {
  transform(source: IndicatorSources): string {
    return indicatorSourceMapper(source);
  }
}

export function indicatorSourceMapper(source: IndicatorSources): string {
  switch (source) {
    case 'gus':
      return 'Główny Urząd Statystyczny (GUS)';
    case 'nbp':
      return 'Narodowy Bank Polski (NBP)';
    case 'eurostat':
      return 'Urząd Statystyczny Unii Europejskiej';
    case 'pmi':
      return "Purchasing Managers' Index";
    case 'gowork':
      return 'GoWork.pl';
    case 'pracuj.pl':
      return 'Pracuj.pl';
    case 'zus':
      return 'Zakład Ubezpieczeń Społecznych (ZUS)';
    case 'cbop':
      return 'Centralna Baza Ofert Pracy: (CBOP)';
    case 'manual':
      return 'Własny';
    default:
      return '-';
  }
}
