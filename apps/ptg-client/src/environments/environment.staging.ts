import { EnvironmentConfig } from '../core/types/environment-config';
import { provideConfig } from '@ptg/shared-config';

const production = true;

export const environment: EnvironmentConfig = {
  production,

  providers: [
    provideConfig({
      apiUrl: `http://1.2.3.4:8000/api`,
    }),
  ],
};
