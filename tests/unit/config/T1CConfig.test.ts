import { T1CConfig, T1CConfigOptions, LOCALHOST_FALLBACK_URL } from '../../../src/scripts/core/T1CConfig';
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

  // -----------------------------------------------------------------------
  // localhost fallback behaviour
  // -----------------------------------------------------------------------
  describe('localhost fallback', () => {
    it('automatically appends localhost as the last connection entry', () => {
      const cfg = new T1CConfig(new T1CConfigOptions('https://custom.domain', '51983'));
      const last = cfg.t1cApiConnections[cfg.t1cApiConnections.length - 1];
      expect(last.url).toBe(LOCALHOST_FALLBACK_URL);
    });

    it('localhost fallback uses the same port as the primary connection', () => {
      const customPort = '9876';
      const cfg = new T1CConfig(new T1CConfigOptions('https://custom.domain', customPort));
      const last = cfg.t1cApiConnections[cfg.t1cApiConnections.length - 1];
      expect(last.url).toBe(LOCALHOST_FALLBACK_URL);
      expect(last.port).toBe(customPort);
    });

    it('primary connection is tried first (index 0)', () => {
      const cfg = new T1CConfig(new T1CConfigOptions('https://custom.domain', '51983'));
      expect(cfg.t1cApiConnections[0].url).toBe('https://custom.domain');
    });

    it('does NOT duplicate localhost when primary URL is already localhost', () => {
      const cfg = new T1CConfig(new T1CConfigOptions(LOCALHOST_FALLBACK_URL, '51983'));
      const localhostEntries = cfg.t1cApiConnections.filter(
        c => c.url === LOCALHOST_FALLBACK_URL
      );
      expect(localhostEntries.length).toBe(1);
    });

    it('does NOT add localhost when it is already present in explicit t1cApiConnections', () => {
      const explicitConnections = [
        { url: 'https://primary.domain', port: '51983' },
        { url: LOCALHOST_FALLBACK_URL, port: '51983' },
      ];
      const opts = new T1CConfigOptions(
        'https://primary.domain',
        '51983',
        undefined,
        undefined,
        undefined,
        explicitConnections
      );
      const cfg = new T1CConfig(opts);
      const localhostEntries = cfg.t1cApiConnections.filter(
        c => c.url === LOCALHOST_FALLBACK_URL
      );
      expect(localhostEntries.length).toBe(1);
    });

    it('uses the default port for localhost fallback when no port is supplied', () => {
      const cfg = new T1CConfig(new T1CConfigOptions('https://custom.domain'));
      const localhostEntry = cfg.t1cApiConnections.find(
        c => c.url === LOCALHOST_FALLBACK_URL
      );
      expect(localhostEntry).toBeDefined();
      // Default port is 51983
      expect(localhostEntry!.port).toBe('51983');
    });

    it('connections list has exactly 2 entries for a simple custom-url config', () => {
      const cfg = new T1CConfig(new T1CConfigOptions('https://customer.example.com', '51983'));
      expect(cfg.t1cApiConnections).toHaveLength(2);
    });

    it('LOCALHOST_FALLBACK_URL constant is https://localhost', () => {
      expect(LOCALHOST_FALLBACK_URL).toBe('https://localhost');
    });
  });
});
