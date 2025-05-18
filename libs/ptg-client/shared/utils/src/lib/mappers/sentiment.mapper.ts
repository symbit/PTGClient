import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentiment',
})
export class SentimentMapper implements PipeTransform {
  transform(value: string): string {
    if (value === 'positive') {
      return 'Pozytywny';
    } else if (value === 'negative') {
      return 'Negatywny';
    } else return 'Neutralny';
  }
}
