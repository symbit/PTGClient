import { Pipe, PipeTransform } from '@angular/core';
import { PredictionPeriods } from '../consts';

@Pipe({
  name: 'predictionPeriod',
})
export class PredictionPeriodPipe implements PipeTransform {
  transform(nForecast: number, frequency: string): string {
    return (
      PredictionPeriods[frequency as keyof typeof PredictionPeriods].find(
        (p) => p.value === nForecast,
      )?.label || ''
    );
  }
}
