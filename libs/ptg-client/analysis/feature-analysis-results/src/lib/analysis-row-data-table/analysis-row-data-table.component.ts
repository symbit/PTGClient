import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { RawData } from '@ptg/analysis-types';

@Component({
  selector: 'ptg-analysis-row-data-table',
  imports: [TableModule, DatePipe],
  templateUrl: './analysis-row-data-table.component.html',
  styleUrl: './analysis-row-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisRowDataTableComponent {
  readonly data = input.required<RawData[]>();
}
