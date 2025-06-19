import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'ptg-ui-footer',
  template: `
    <footer class="print:hidden border border-t border-neutral-300 p-4 mt-10">
      <div class="flex justify-between items-center">
        <p class="text-dark-200">
          &#169; 2025 Narzędzie Prognostyczne. Wszelkie prawa zastrzeżone.
        </p>

        <div>
          <p-button icon="pi pi-info-circle" [rounded]="true" [text]="true" />
          <p-button icon="pi pi-envelope" [rounded]="true" [text]="true" />
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class UiFooterComponent {}
