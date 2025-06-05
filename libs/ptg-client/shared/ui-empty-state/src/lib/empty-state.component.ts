import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ptg-empty-state',
  template: `
    <p class="body-style-16--lighter" [style]="{ 'text-align': align() }">
      Brak danych
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly align = input<'left' | 'center' | 'right'>('center');
}
