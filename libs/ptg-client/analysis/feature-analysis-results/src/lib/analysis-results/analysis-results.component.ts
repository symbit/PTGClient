import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
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
import { AnalysisConfig } from '@ptg/analysis-types';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

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
    Button,
    Menu,
  ],
})
export class AnalysisResultsComponent implements ComponentCanDeactivate {
  readonly state = inject(AnalysisStore);
  readonly analysisConfig = signal<AnalysisConfig | null>(null);
  readonly items: MenuItem[] = [
    {
      label: 'Exportuj do Excela',
      icon: 'pi pi-file-excel',
      command: () => this.exportExcel(),
    },
  ];

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): boolean {
    return false;
  }

  onConfigChanged(config: AnalysisConfig): void {
    const analysis = this.state.analysis();

    if (!analysis) return;

    const { startDate, endDate } = analysis.analysisResults[0];
    this.analysisConfig.set(config);
    this.state.updateAnalysis({
      ...config,
      realizationIds: this.state.realizationsIds(),
      trendType: 'first_difference',
      startDate,
      endDate,
    });
  }

  exportExcel(): void {
    const analysis = this.state.analysis();

    if (!analysis) return;

    this.state.exportAnalysis({
      nForecasts: this.analysisConfig()?.nForecasts || 1,
      emaHalflife: this.analysisConfig()?.emaHalflife || 3,
      trendType: 'first_difference',
      ar: this.analysisConfig()?.ar || 1,
      i: this.analysisConfig()?.i || 1,
      ma: this.analysisConfig()?.ma || 3,
      realizationIds: this.state.realizationsIds(),
      startDate: this.state.analysis()?.analysisResults[0].startDate || '',
      endDate: this.state.analysis()?.analysisResults[0].endDate || '',
    });
  }
}
