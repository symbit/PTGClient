import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';

@Component({
  selector: 'ptg-articles-filters',
  templateUrl: './articles-filters.component.html',
  styleUrl: './articles-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, Card, Select],
})
export class ArticlesFiltersComponent {
  readonly industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Transportation',
    'Construction',
    'Energy',
    'Hospitality',
  ];
}
