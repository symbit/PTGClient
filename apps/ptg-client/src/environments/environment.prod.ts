import { EnvironmentConfig } from '../core/types/environment-config';
import { provideConfig } from '@ptg/shared-config';

const production = true;

export const environment: EnvironmentConfig = {
  production,

  providers: [
    provideConfig({
      apiUrl: `https://192.168.33.18:8000/api`,
    }),
  ],
};
