/// <reference types="jest" />
import {
  EnvironmentProviders,
  Inject,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

import { TypedConfigOptions } from './config.model';

export type ConfigOptions = Record<string, unknown>;

export const CONFIG_OPTIONS = new InjectionToken<Partial<TypedConfigOptions>>(
  'ConfigOptions',
  {
    providedIn: 'root',
    factory: () => ({}),
  },
);

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly _options: Partial<TypedConfigOptions>,
  ) {}

  /**
   * This returns a configuration value based on the property path.
   * Dot notations are allowed to extract values from the configuration
   * object (e.g., `ardorConfig.token`).
   */
  get<K extends keyof TypedConfigOptions>(
    propertyPath: K,
  ): TypedConfigOptions[K] {
    if (Object.prototype.hasOwnProperty.call(this._options, propertyPath)) {
      return this._options[propertyPath] as TypedConfigOptions[K];
    }
    // Do not throw an error in unit tests, as any change to the configuration will cause many unit tests to fail.
    if (typeof jest !== 'undefined') {
      return 'jest_testing_value' as unknown as TypedConfigOptions[K];
    }
    // This shouldn't be guarded with `ngDevMode` since we should always be throwing
    // an error, regardless of whether we're in development or production mode.
    throw new Error(`Configuration key "${propertyPath}" does not exist.`);
  }
}

export function injectConfigProperty<K extends keyof TypedConfigOptions>(
  propertyPath: K,
): TypedConfigOptions[K] {
  return inject(ConfigService).get(propertyPath);
}

export function provideConfig(
  options: Partial<TypedConfigOptions> = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: CONFIG_OPTIONS, useValue: options },
  ]);
}
