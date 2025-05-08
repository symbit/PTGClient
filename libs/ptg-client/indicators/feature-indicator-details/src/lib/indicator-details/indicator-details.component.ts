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

@Component({
  selector: 'ptg-indicator-details',
  template: `
    <ptg-back-button routerLink="/indicators" label="Powrót do wskaźników" />

    <ptg-indicator-information />

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
  ],
  providers: [IndicatorDetailsStore],
})
export class IndicatorDetailsComponent implements AfterViewInit {
  readonly indicatorId = input<number>(0);

  private readonly _state = inject(IndicatorDetailsStore);

  ngAfterViewInit() {
    this._state.loadIndicator(this.indicatorId());
  }
}
