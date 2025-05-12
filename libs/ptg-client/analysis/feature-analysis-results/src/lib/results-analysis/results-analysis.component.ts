import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'ptg-results-analysis',
  templateUrl: './results-analysis.component.html',
  styleUrl: './results-analysis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card],
})
export class ResultsAnalysisComponent {
  readonly resultsAnalysis = input.required<Record<string, number>>();
}
