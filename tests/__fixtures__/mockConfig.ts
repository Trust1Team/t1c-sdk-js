import { T1CConfig, T1CConfigOptions } from '../../src/scripts/core/T1CConfig';
import { LocalConnection } from '../../src/scripts/core/client/Connection';

export const TEST_BASE_URL = 'https://t1c.t1t.io';
export const TEST_PORT = '51983';
export const TEST_JWT = 'eyJhbGciOiJSUzI1NiJ9.test.signature';
export const TEST_VERSION = '3.7.11';

export function makeConfigOptions(): T1CConfigOptions {
  return new T1CConfigOptions(TEST_BASE_URL, TEST_PORT, TEST_JWT);
}

export function makeConfig(): T1CConfig {
  const opts = new T1CConfigOptions(TEST_BASE_URL, TEST_PORT, TEST_JWT);
  const cfg = new T1CConfig(opts);
  cfg.version = TEST_VERSION;
  return cfg;
}

export function makeConfigNoJwt(): T1CConfig {
  const opts = new T1CConfigOptions(TEST_BASE_URL, TEST_PORT);
  const cfg = new T1CConfig(opts);
  cfg.version = TEST_VERSION;
  return cfg;
}

export function makeConnection(): LocalConnection {
  return new LocalConnection(makeConfig());
}
