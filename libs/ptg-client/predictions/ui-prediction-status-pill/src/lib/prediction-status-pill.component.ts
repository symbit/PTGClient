import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PredictionStatusPillPipe } from '@ptg/predictions-utils';
import { Tag } from 'primeng/tag';
import { PredictionStatus } from '@ptg/predictions-types';

@Component({
  selector: 'ptg-prediction-status-pill',
  template: `
    @let predictionStatus = status() | predictionStatus;
    <p-tag [class]="predictionStatus.class" [value]="predictionStatus.label" />
  `,
  styles: `
    .in-progress {
      --p-tag-primary-background: #ffe0b2;
      --p-tag-primary-color: var(--neutral-dark-100);
      --p-tag-font-weight: 400;
    }

    .success {
      --p-tag-primary-background: #a5d6a7;
      --p-tag-font-weight: 400;
      --p-tag-primary-color: var(--neutral-dark-100);
    }

    .failure {
      --p-tag-primary-background: #d0332e;
      --p-tag-primary-color: var(--neutral-light-100);
      --p-tag-font-weight: 400;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PredictionStatusPillPipe, Tag],
})
export class PredictionStatusPillComponent {
  readonly status = input.required<PredictionStatus>();
}
