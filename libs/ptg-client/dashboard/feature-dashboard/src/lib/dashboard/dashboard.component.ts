import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
