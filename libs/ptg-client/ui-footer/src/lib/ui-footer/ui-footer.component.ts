import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'ptg-ui-footer',
  template: `
    <footer class="border border-t border-neutral-300 p-4">
      <div class="flex justify-between items-center">
        <p class="text-dark-200">
          &#169; 2025 Narzędzie Prognostyczne. Wszelkie prawa zastrzeżone.
        </p>

        <div>
          <button mat-icon-button color="primary">
            <mat-icon class="text-primary-100">info</mat-icon>
          </button>

          <button mat-icon-button color="primary">
            <mat-icon class="text-primary-100">mail</mat-icon>
          </button>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatIconButton],
})
export class UiFooterComponent {}
