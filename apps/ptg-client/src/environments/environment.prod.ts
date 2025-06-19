import { EnvironmentConfig } from '../core/types/environment-config';
import { provideConfig } from '@ptg/shared-config';

const production = true;

export const environment: EnvironmentConfig = {
  production,

  providers: [
    provideConfig({
      apiUrl: `https://backend.prognozy.iptg.pl/api`,
      wsUrl: `wss://backend.prognozy.iptg.pl/api/predictions/status-updates`,
    }),
  ],
};
