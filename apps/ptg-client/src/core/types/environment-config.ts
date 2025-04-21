import { EnvironmentProviders, Provider } from '@angular/core';

export interface EnvironmentConfig {
  production: boolean;

  providers?: Array<Provider | EnvironmentProviders>;
}
