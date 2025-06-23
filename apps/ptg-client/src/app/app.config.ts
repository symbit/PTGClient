import {
  ApplicationConfig,
  enableProdMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { providePrimeNG } from 'primeng/config';
import { customPreset } from '../themes/theme';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from '@ptg/auth-data-access-auth';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DialogService } from 'primeng/dynamicdialog';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch(),
      withInterceptors([tokenInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    }),
    provideCharts(withDefaultRegisterables()),
    environment.providers || [],
    DialogService,
  ],
};
