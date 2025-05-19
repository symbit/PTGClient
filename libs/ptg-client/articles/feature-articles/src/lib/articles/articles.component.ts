import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { AngularCdkTeleportService } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, Tabs, TabList, Tab],
})
export class ArticlesComponent implements OnDestroy {
  private readonly _router = inject(Router);

  get url(): string {
    return this._router.url;
  }

  readonly selectedTab = signal<string>(this.url);
  readonly tabs = [
    {
      route: '/articles/statistics',
      label: 'Statystyki',
      routerLinkActiveOptions: { exact: true },
      selected: true,
    },
    {
      route: '/articles/accepted',
      label: 'Zaakceptowane',
      routerLinkActiveOptions: { exact: true },
    },
    {
      route: '/articles/rejected',
      label: 'Odrzucone',
      routerLinkActiveOptions: { exact: true },
    },
  ];

  @ViewChild('angularCdkPortalOutlet') set angularCdkPortalOutletElement(
    elementRef: ElementRef<HTMLElement>,
  ) {
    this._angularCdkTeleportService.registerPortalOutlet(
      elementRef.nativeElement,
    );
  }

  private readonly _angularCdkTeleportService = inject(
    AngularCdkTeleportService,
  );

  ngOnDestroy(): void {
    this._angularCdkTeleportService.unregisterPortalOutlet();
  }
}
