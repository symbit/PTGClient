import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationComponent } from '@ptg/feature-navigation';
import { RouterOutlet } from '@angular/router';
import { UiFooterComponent } from '@ptg/ui-footer';
import { LoadingComponent } from '@ptg/shared/feature-loading';

@Component({
  selector: 'ptg-feature-shell-web',
  templateUrl: './feature-shell-web.component.html',
  styleUrl: './feature-shell-web.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavigationComponent,
    RouterOutlet,
    UiFooterComponent,
    LoadingComponent,
  ],
})
export class FeatureShellWebComponent {}
