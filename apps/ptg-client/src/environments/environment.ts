import { EnvironmentConfig } from '../core/types/environment-config';
import { provideConfig } from '@ptg/shared-config';

const production = false;

export const environment: EnvironmentConfig = {
  production,

  providers: [
    provideConfig({
      apiUrl: `http://localhost:8000/api`,
    }),
  ],
};
