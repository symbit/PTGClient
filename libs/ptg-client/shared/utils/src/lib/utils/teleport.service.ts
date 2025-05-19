import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { DomPortalOutlet, Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class AngularCdkTeleportService {
  private portalOutlet: DomPortalOutlet | null = null;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  registerPortalOutlet(outletElement: HTMLElement): void {
    this.portalOutlet = new DomPortalOutlet(
      outletElement,
      this.cfr,
      this.appRef,
      this.injector,
      document,
    );
  }

  unregisterPortalOutlet(): void {
    this.portalOutlet?.dispose();
    this.portalOutlet = null;
  }

  teleport(portal: Portal<any>): void {
    if (!this.portalOutlet) {
      console.warn('No portal outlet registered.');
      return;
    }

    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }

    this.portalOutlet.attach(portal);
  }

  finishTeleportation(): void {
    this.portalOutlet?.detach();
  }
}
