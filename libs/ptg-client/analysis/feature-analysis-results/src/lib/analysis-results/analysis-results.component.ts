import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { AnalysisStore } from '@ptg/analysis-data-access-analysis';
import { ComponentCanDeactivate } from '@ptg/shared-utils';

import { Card } from 'primeng/card';

import { AnalysisInformationComponent } from '../analysis-information/analysis-information.component';
import { AnalysisRowDataTableComponent } from '../analysis-row-data-table/analysis-row-data-table.component';
import { AnalysisChartComponent } from '../analysis-chart/analysis-chart.component';
import { AnalysisSeasonalDecompositionComponent } from '../analysis-seasonal-decomposition/analysis-seasonal-decomposition.component';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primeng/accordion';
import { AnalysisPartialAutocorrelationChartComponent } from '../analysis-autocorrelation-chart/analysis-partial-autocorrelation-chart.component';
import { AnalysisAutocorrelationChartComponent } from '../analysis-partial-autocorrelation-chart/analysis-autocorrelation-chart.component';
import { ComparativeAnalysisChartComponent } from '../comparative-analysis-chart/comparative-analysis-chart.component';
import { ResultsAnalysisComponent } from '../results-analysis/results-analysis.component';

@Component({
  selector: 'ptg-analysis-results',
  templateUrl: './analysis-results.component.html',
  styleUrl: './analysis-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    BackButtonComponent,
    RouterLink,
    AnalysisInformationComponent,
    AnalysisRowDataTableComponent,
    AnalysisChartComponent,
    AnalysisSeasonalDecompositionComponent,
    AnalysisPartialAutocorrelationChartComponent,
    AnalysisAutocorrelationChartComponent,
    ComparativeAnalysisChartComponent,
    ResultsAnalysisComponent,
  ],
})
export class AnalysisResultsComponent implements ComponentCanDeactivate {
  readonly state = inject(AnalysisStore);

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): boolean {
    return false;
  }
}
