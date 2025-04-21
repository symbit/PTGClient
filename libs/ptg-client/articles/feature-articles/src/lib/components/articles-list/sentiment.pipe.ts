import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentiment',
})
export class SentimentPipe implements PipeTransform {
  transform(value: string): { text: string; class: string } {
    if (value === 'Positive') {
      return { text: 'Pozytywny', class: 'text-success-100' };
    } else if (value === 'Negative') {
      return { text: 'Negatywny', class: 'text-secondary-100' };
    } else if (value === 'Neutral') {
      return { text: 'Neutralny', class: 'text-info-100' };
    } else {
      return { text: '-', class: '' };
    }
  }
}
