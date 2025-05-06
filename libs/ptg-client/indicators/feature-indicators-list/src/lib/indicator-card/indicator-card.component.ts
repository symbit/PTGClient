import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Indicator } from '@ptg/indicators-types';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IndicatorSourceMapper } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-indicator-card',
  templateUrl: './indicator-card.component.html',
  styleUrl: './indicator-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Tag, Button, RouterLink, IndicatorSourceMapper],
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorCardComponent {
  readonly indicator = input.required<Indicator>();
}
