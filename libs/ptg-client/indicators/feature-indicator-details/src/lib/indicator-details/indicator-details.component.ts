import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { IndicatorInformationComponent } from '../indicator-information/indicator-information.component';
import { IndicatorDataComponent } from '../indicator-data/indicator-data.component';
import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { RouterLink } from '@angular/router';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { IndicatorDetailsLoadingComponent } from './indicator-details-loading.component';
import { IndicatorDataLoadingComponent } from '../indicator-data/indicator-data-loading.component';

@Component({
  selector: 'ptg-indicator-details',
  template: `
    <ptg-back-button routerLink="/indicators" label="Powrót do wskaźników" />

    @if (!state.isIndicatorDetailsLoading()) {
      <ptg-indicator-information />
    } @else {
      <ptg-indicator-details-loading />
    }

    <ptg-indicator-data />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IndicatorInformationComponent,
    IndicatorDataComponent,
    BackButtonComponent,
    RouterLink,
    IndicatorDetailsLoadingComponent,
    IndicatorDataLoadingComponent,
  ],
  providers: [IndicatorDetailsStore],
})
export class IndicatorDetailsComponent implements AfterViewInit {
  readonly indicatorId = input<number>(0);

  readonly state = inject(IndicatorDetailsStore);

  ngAfterViewInit() {
    this.state.loadIndicator(this.indicatorId());
  }
}
