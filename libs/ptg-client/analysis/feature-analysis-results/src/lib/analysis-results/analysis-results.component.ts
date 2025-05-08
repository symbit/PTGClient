import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptg-analysis-results',
  templateUrl: './analysis-results.component.html',
  styleUrl: './analysis-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisResultsComponent {}
