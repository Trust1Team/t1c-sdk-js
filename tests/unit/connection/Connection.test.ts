import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LocalConnection } from '../../../src/scripts/core/client/Connection';
import { T1CConfig, T1CConfigOptions } from '../../../src/scripts/core/T1CConfig';
import { T1CLibException } from '../../../src/scripts/core/exceptions/CoreExceptions';
import { makeConfig, makeConfigNoJwt, TEST_BASE_URL, TEST_PORT, TEST_VERSION } from '../../__fixtures__/mockConfig';
import { apiError } from '../../__fixtures__/mockResponses';

const SUFFIX = '/v3/info';
// UrlUtil.create(basePath, suffix) = encodeURI(basePath + suffix)
// The basePath passed to conn.get() is TEST_BASE_URL (no port) so FULL_URL has no port.
const FULL_URL = `${TEST_BASE_URL}${SUFFIX}`;

let mock: MockAdapter;
beforeEach(() => { mock = new MockAdapter(axios); });
afterEach(() => { mock.restore(); });

function makePayload() { return { success: true, data: { version: '3.7.11' } }; }

describe('LocalConnection - GET', () => {
  it('resolves with response data on 200', async () => {
    const payload = makePayload();
    mock.onGet(FULL_URL).reply(200, payload);
    const conn = new LocalConnection(makeConfig());
    const result = await conn.get(TEST_BASE_URL, SUFFIX);
    expect(result).toMatchObject(payload);
  });

  it('sets Authorization Bearer header when JWT is present', async () => {
    mock.onGet(FULL_URL).reply((config) => {
      expect(config.headers?.Authorization).toContain('Bearer ');
      return [200, makePayload()];
    });
    const conn = new LocalConnection(makeConfig());
    await conn.get(TEST_BASE_URL, SUFFIX);
  });

  it('sets X-CSRF-Token header on all requests', async () => {
    mock.onGet(FULL_URL).reply((config) => {
      expect(config.headers?.['X-CSRF-Token']).toBe('t1c-js');
      return [200, makePayload()];
    });
    const conn = new LocalConnection(makeConfig());
    await conn.get(TEST_BASE_URL, SUFFIX);
  });

  it('rejects with T1CLibException code 112999 on 404', async () => {
    mock.onGet(FULL_URL).reply(404);
    const conn = new LocalConnection(makeConfig());
    await expect(conn.get(TEST_BASE_URL, SUFFIX)).rejects.toMatchObject({ code: '112999' });
  });

  it('rejects with T1CLibException code 104025 on 401', async () => {
    mock.onGet(FULL_URL).reply(401);
    const conn = new LocalConnection(makeConfig());
    await expect(conn.get(TEST_BASE_URL, SUFFIX)).rejects.toMatchObject({ code: '104025' });
  });

  it('rejects with T1CLibException on 500', async () => {
    mock.onGet(FULL_URL).reply(500, apiError('500001', 'Internal connector error'));
    const conn = new LocalConnection(makeConfig());
    await expect(conn.get(TEST_BASE_URL, SUFFIX)).rejects.toBeInstanceOf(T1CLibException);
  });

  it('rejects with default error on network failure', async () => {
    mock.onGet(FULL_URL).networkError();
    const conn = new LocalConnection(makeConfig());
    await expect(conn.get(TEST_BASE_URL, SUFFIX)).rejects.toBeInstanceOf(T1CLibException);
  });

  it('forwards custom query params', async () => {
    mock.onGet(FULL_URL).reply((config) => {
      expect(config.params).toEqual({ cardInserted: true });
      return [200, makePayload()];
    });
    const conn = new LocalConnection(makeConfig());
    // 3rd arg = queryParams, 4th = headers
    await conn.get(TEST_BASE_URL, SUFFIX, { cardInserted: true }, undefined);
  });

  it('calls back with data on success', async () => {
    const payload = makePayload();
    mock.onGet(FULL_URL).reply(200, payload);
    const conn = new LocalConnection(makeConfig());
    await new Promise<void>((resolve, reject) => {
      conn.get(TEST_BASE_URL, SUFFIX, undefined, undefined, (err, data) => {
        try {
          // Connection calls callback(undefined, data) on success (not null)
          expect(err).toBeFalsy();
          expect(data).toMatchObject(payload);
          resolve();
        } catch (e) { reject(e); }
      }).catch(() => {});
    });
  });

  it('calls back with error on 404 failure', async () => {
    mock.onGet(FULL_URL).reply(404);
    const conn = new LocalConnection(makeConfig());
    await new Promise<void>((resolve, reject) => {
      conn.get(TEST_BASE_URL, SUFFIX, undefined, undefined, (err, data) => {
        try {
          expect(err).toBeDefined();
          expect((err as T1CLibException).code).toBe('112999');
          expect(data).toBeNull();
          resolve();
        } catch (e) { reject(e); }
      }).catch(() => {});
    });
  });
});

describe('LocalConnection - POST', () => {
  it('resolves with response data on 200', async () => {
    const payload = makePayload();
    mock.onPost(FULL_URL).reply((config) => {
      const body = JSON.parse(config.data);
      expect(body.foo).toBe('bar');
      return [200, payload];
    });
    const conn = new LocalConnection(makeConfig());
    const result = await conn.post(TEST_BASE_URL, SUFFIX, { foo: 'bar' });
    expect(result).toMatchObject(payload);
  });

  it('rejects on POST 400', async () => {
    mock.onPost(FULL_URL).reply(400, apiError('400001', 'Bad request'));
    const conn = new LocalConnection(makeConfig());
    await expect(conn.post(TEST_BASE_URL, SUFFIX, {})).rejects.toBeInstanceOf(T1CLibException);
  });
});

describe('LocalConnection - DELETE', () => {
  it('resolves with response data on 200', async () => {
    const payload = { success: true, data: {} };
    mock.onDelete(FULL_URL).reply(200, payload);
    const conn = new LocalConnection(makeConfig());
    const result = await conn.delete(TEST_BASE_URL, SUFFIX);
    expect(result).toMatchObject(payload);
  });
});

describe('LocalConnection - PUT', () => {
  it('resolves with response data on 200', async () => {
    const payload = makePayload();
    mock.onPut(FULL_URL).reply((config) => {
      expect(config.method).toBe('put');
      return [200, payload];
    });
    const conn = new LocalConnection(makeConfig());
    const result = await conn.put(TEST_BASE_URL, SUFFIX, { update: true });
    expect(result).toMatchObject(payload);
  });

  it('rejects on 500', async () => {
    mock.onPut(FULL_URL).reply(500, apiError('500001', 'fail'));
    const conn = new LocalConnection(makeConfig());
    await expect(conn.put(TEST_BASE_URL, SUFFIX, {})).rejects.toBeInstanceOf(T1CLibException);
  });
});

describe('LocalConnection - no-JWT config', () => {
  it('does not set Authorization header when jwt is absent', async () => {
    const payload = makePayload();
    mock.onGet(FULL_URL).reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, payload];
    });
    const conn = new LocalConnection(makeConfigNoJwt());
    await conn.get(TEST_BASE_URL, SUFFIX);
  });

  it('resolves without jwt', async () => {
    const payload = makePayload();
    mock.onGet(FULL_URL).reply(200, payload);
    const conn = new LocalConnection(makeConfigNoJwt());
    const result = await conn.get(TEST_BASE_URL, SUFFIX);
    expect(result).toMatchObject(payload);
  });
});

describe('LocalConnection - getUrl via cfg', () => {
  it('t1cApiUrl getter contains the base hostname', () => {
    const conn = new LocalConnection(makeConfig());
    expect(conn.cfg.t1cApiUrl).toContain('t1c.t1t.io');
  });
});
