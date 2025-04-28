import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthCardComponent } from '../auth-card/auth-card.component';
import { UiFooterComponent } from '@ptg/ui-footer';

@Component({
  selector: 'ptg-auth',
  imports: [RouterOutlet, AuthCardComponent, UiFooterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
