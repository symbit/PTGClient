import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'ptg-back-button',
  template: `
    <p-button [label]="label()" variant="text" icon="pi pi-arrow-left" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class BackButtonComponent {
  readonly label = input<string>('Wróć');
}
