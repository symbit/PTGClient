import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentiment',
})
export class SentimentPipe implements PipeTransform {
  transform(value: string): { text: string; class: string } {
    if (value === 'positive') {
      return { text: 'Pozytywny', class: 'text-success-100' };
    } else if (value === 'negative') {
      return { text: 'Negatywny', class: 'text-secondary-100' };
    } else if (value === 'neutral') {
      return { text: 'Neutralny', class: 'text-info-100' };
    } else {
      return { text: '-', class: '' };
    }
  }
}
