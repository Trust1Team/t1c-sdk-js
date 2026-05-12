import { T1CConfig, T1CConfigOptions } from '../../../src/scripts/core/T1CConfig';
import { makeConfig, TEST_BASE_URL, TEST_PORT, TEST_JWT, TEST_VERSION } from '../../__fixtures__/mockConfig';

describe('T1CConfig', () => {
  describe('construction', () => {
    it('creates a config with required options', () => {
      const cfg = makeConfig();
      expect(cfg).toBeDefined();
    });

    it('t1cApiUrl getter returns url:port combined', () => {
      const cfg = makeConfig();
      expect(cfg.t1cApiUrl).toBe(`${TEST_BASE_URL}:${TEST_PORT}`);
    });

    it('stores the jwt (via t1cJwt getter)', () => {
      const cfg = makeConfig();
      expect(cfg.t1cJwt).toBe(TEST_JWT);
    });

    it('allows setting version post-construction', () => {
      const cfg = new T1CConfig(new T1CConfigOptions(TEST_BASE_URL, TEST_PORT));
      cfg.version = TEST_VERSION;
      expect(cfg.version).toBe(TEST_VERSION);
    });

    it('defaults version to undefined before it is set', () => {
      const cfg = new T1CConfig(new T1CConfigOptions(TEST_BASE_URL, TEST_PORT));
      expect(cfg.version).toBeUndefined();
    });
  });

  describe('port configuration', () => {
    it('stores the api port as string', () => {
      const cfg = makeConfig();
      // t1cApiUrl includes the port — verify port is embedded
      expect(cfg.t1cApiUrl).toContain(TEST_PORT);
    });

    it('accepts a custom port', () => {
      const opts = new T1CConfigOptions(TEST_BASE_URL, '9999');
      const cfg = new T1CConfig(opts);
      expect(cfg.t1cApiUrl).toContain('9999');
    });

    it('can update port via setter', () => {
      const cfg = makeConfig();
      cfg.t1cApiPort = '8080';
      expect(cfg.t1cApiUrl).toContain('8080');
    });
  });

  describe('url configuration', () => {
    it('uses custom base URL', () => {
      const opts = new T1CConfigOptions('https://custom.host', TEST_PORT);
      const cfg = new T1CConfig(opts);
      expect(cfg.t1cApiUrl).toContain('custom.host');
    });

    it('can update url via setter', () => {
      const cfg = makeConfig();
      cfg.t1cApiUrl = 'https://new.host';
      expect(cfg.t1cApiUrl).toContain('new.host');
    });
  });

  describe('optional fields', () => {
    it('has undefined t1cJwt when not provided', () => {
      const cfg = new T1CConfig(new T1CConfigOptions(TEST_BASE_URL, TEST_PORT));
      expect(cfg.t1cJwt).toBeUndefined();
    });

    it('stores applicationDomain when provided', () => {
      const opts = new T1CConfigOptions(TEST_BASE_URL, TEST_PORT, undefined, 'rmc.t1t.be');
      const cfg = new T1CConfig(opts);
      expect(cfg.applicationDomain).toBe('rmc.t1t.be');
    });

    it('defaults skipResponseValidation to false', () => {
      const cfg = makeConfig();
      expect(cfg.skipResponseValidation).toBe(false);
    });

    it('honours skipResponseValidation=true', () => {
      const opts = new T1CConfigOptions(TEST_BASE_URL, TEST_PORT, undefined, undefined, true);
      const cfg = new T1CConfig(opts);
      expect(cfg.skipResponseValidation).toBe(true);
    });

    it('t1cApiConnections is populated from url+port', () => {
      const cfg = makeConfig();
      expect(cfg.t1cApiConnections.length).toBeGreaterThan(0);
      expect(cfg.t1cApiConnections[0].url).toBe(TEST_BASE_URL);
    });
  });

  describe('jwt mutability', () => {
    it('t1cJwt can be updated', () => {
      const cfg = makeConfig();
      cfg.t1cJwt = 'new-jwt-value';
      expect(cfg.t1cJwt).toBe('new-jwt-value');
    });

    it('t1cJwt can be cleared', () => {
      const cfg = makeConfig();
      cfg.t1cJwt = undefined;
      expect(cfg.t1cJwt).toBeUndefined();
    });
  });
});
