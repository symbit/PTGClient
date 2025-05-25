import { Pipe, PipeTransform } from '@angular/core';
import { PredictionStatus } from '@ptg/predictions-types';
import { predictionStatusMapper } from './prediction-status.mapper';

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
