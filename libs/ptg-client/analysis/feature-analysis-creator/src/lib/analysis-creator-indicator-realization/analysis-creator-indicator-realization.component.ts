import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { Card } from 'primeng/card';
import { IndicatorSearchComponent } from '../indicator-search/indicator-search.component';
import { IndicatorRealizationComponent } from '@ptg/shared-feature-indicator-relization';
import { Indicator } from '@ptg/indicators-types';
import { Button } from 'primeng/button';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ptg-analysis-creator-indicator-realization',
  templateUrl: './analysis-creator-indicator-realization.component.html',
  styleUrl: './analysis-creator-indicator-realization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    IndicatorSearchComponent,
    IndicatorRealizationComponent,
    Button,
  ],
})
export class AnalysisCreatorIndicatorRealizationComponent {
  readonly removable = input<boolean>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();

  readonly remove = output<void>();

  readonly selectedIndicator = signal<Indicator | null>(null);
}
