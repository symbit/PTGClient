import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptg-feature-shell-web',
  templateUrl: './feature-shell-web.component.html',
  styleUrl: './feature-shell-web.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureShellWebComponent {}
