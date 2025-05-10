import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DataBoxComponent } from '@ptg/shared-ui-data-box';
import { RealizationDetails } from '@ptg/analysis-types';
import { SectorPipe } from '@ptg/shared-utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ptg-analysis-information',
  templateUrl: './analysis-information.component.html',
  styleUrl: './analysis-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataBoxComponent, SectorPipe, DatePipe],
})
export class AnalysisInformationComponent {
  readonly analysisDetails = input.required<RealizationDetails | null>();
}
