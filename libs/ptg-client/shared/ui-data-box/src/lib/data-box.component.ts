import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ptg-data-box',
  template: `
    <div class="mt-2 text-primary-100">
      <p>{{ label() }}</p>
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataBoxComponent {
  readonly label = input.required<string>();
}
