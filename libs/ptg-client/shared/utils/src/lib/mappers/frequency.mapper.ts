import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequency',
})
export class FrequencyPipe implements PipeTransform {
  transform(frequency: string): string {
    return frequencyMapper(frequency);
  }
}

export function frequencyMapper(frequency: string): string {
  switch (frequency) {
    case 'monthly':
      return 'Miesięczny';
    case 'quarterly':
      return 'Kwartalny';
    case 'yearly':
      return 'Roczny';
    default:
      return '-';
  }
}
