import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Step,
  StepList,
  StepPanel,
  StepPanels,
  Stepper,
} from 'primeng/stepper';
import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { RouterLink } from '@angular/router';
import { PredictionCreatorComponent } from './prediction-creator/prediction-creator.component';

@Component({
  selector: 'ptg-prediction-creator-stepper',
  template: `
    <ptg-back-button
      routerLink="/predictions"
      label="Powrót do listy prognoz"
    />

    <p-stepper [value]="1" [linear]="true">
      <p-step-list>
        <p-step [value]="1">Konfiguracja</p-step>
        <p-step [value]="2">Wynik</p-step>
      </p-step-list>
      <p-step-panels>
        <p-step-panel [value]="1">
          <ng-template #content let-activateCallback="activateCallback">
            <ptg-prediction-creator />
          </ng-template>
        </p-step-panel>
      </p-step-panels>
    </p-stepper>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Step,
    StepList,
    Stepper,
    StepPanels,
    StepPanel,
    BackButtonComponent,
    RouterLink,
    PredictionCreatorComponent,
  ],
})
export class PredictionCreatorStepperComponent {}
