import { PredictionStatus } from '@ptg/predictions-types';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'predictionStatus',
})
export class PredictionStatusPillPipe implements PipeTransform {
  transform(status: PredictionStatus): { label: string; class: string } {
    const label = predictionStatusMapper(status);
    switch (status) {
      case 'inprogress':
        return { label, class: 'in-progress' };
      case 'success':
        return { label, class: 'success' };
      case 'failure':
        return { label, class: 'failure' };
      default:
        return { label, class: 'unknown' };
    }
  }
}

export function predictionStatusMapper(status: PredictionStatus) {
  switch (status) {
    case 'inprogress':
      return 'W trakcie';
    case 'success':
      return 'Wygenerowana';
    case 'failure':
      return 'Błąd';
    default:
      return 'Nieznany';
  }
}
