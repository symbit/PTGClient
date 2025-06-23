import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import {
  AnalysisResultsRealizationDetails,
  RawData,
} from '@ptg/analysis-types';
import { RegionPipe, SectorPipe } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-analysis-row-data-table',
  imports: [TableModule, DatePipe, RegionPipe, SectorPipe],
  templateUrl: './analysis-row-data-table.component.html',
  styleUrl: './analysis-row-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisRowDataTableComponent {
  readonly data = input.required<RawData[]>();
  readonly indicators = input.required<AnalysisResultsRealizationDetails[]>();
}
