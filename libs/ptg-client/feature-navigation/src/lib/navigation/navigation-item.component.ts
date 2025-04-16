import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavigationItem = {
  link: string;
  label: string;
};

@Component({
  selector: 'ptg-navigation-item',
  template: `
    <a
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }"
      [routerLink]="item().link"
      class="p-2 rounded-md"
      >{{ item().label }}</a
    >
  `,
  styles: `
    .active {
      background-color: var(--neutral-light-400);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class NavigationItemComponent {
  readonly item = input.required<NavigationItem>();
}
