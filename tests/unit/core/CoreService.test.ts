import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CoreService } from '../../../src/scripts/core/service/CoreService';
import { makeConnection, TEST_BASE_URL } from '../../__fixtures__/mockConfig';
import {
  mockCoreInfoResponse,
  mockCardReadersResponse,
  mockReadersNoCardResponse,
} from '../../__fixtures__/mockResponses';

let mock: MockAdapter;
beforeEach(() => { mock = new MockAdapter(axios); });
afterEach(() => { mock.restore(); });

function makeService(): CoreService {
  return new CoreService(TEST_BASE_URL, makeConnection());
}

function callbackTest<T>(
  fn: (cb: (err: any, data: T) => void) => void,
  assertions: (err: any, data: T) => void,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fn((err, data) => {
      try { assertions(err, data); resolve(); } catch (e) { reject(e); }
    });
  });
}

// CoreService.info() uses ._get(this.url, '/info', ...) so the request goes to:
//   TEST_BASE_URL + '/info'  =  'https://t1c.t1t.io/info'
// (In real usage T1CClient passes url:port, giving 'https://t1c.t1t.io:51983/info')
//
// info() then unwraps one data layer:
//   _get resolves with HTTP body = {success, data:{...}}
//   info() does ResponseHandler.response(res.data) → resolves with inner data object

const INFO_URL = `${TEST_BASE_URL}/info`;

describe('CoreService - info', () => {
  it('calls the /info endpoint specifically', async () => {
    mock.onGet(INFO_URL).reply(200, mockCoreInfoResponse);
    const result = await makeService().info();
    expect(result).toMatchObject(mockCoreInfoResponse.data);
    // Confirm the /info path was the one hit, not some other endpoint
    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    expect(calledUrls).toContain(INFO_URL);
  });

  it('resolves with connector info inner data', async () => {
    mock.onGet(INFO_URL).reply(200, mockCoreInfoResponse);
    const result = await makeService().info();
    expect(result).toMatchObject(mockCoreInfoResponse.data);
  });

  it('resolves info via callback', async () => {
    mock.onGet(INFO_URL).reply(200, mockCoreInfoResponse);
    await callbackTest<any>(
      (cb) => { makeService().info(cb).catch(() => {}); },
      (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toMatchObject(mockCoreInfoResponse);
      },
    );
  });

  it('does NOT call any endpoint other than /info for the info() method', async () => {
    mock.onGet(INFO_URL).reply(200, mockCoreInfoResponse);
    await makeService().info();
    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    // Every GET that happened should be the /info URL
    calledUrls.forEach(url => expect(url).toBe(INFO_URL));
  });
});

// readers/readersCardAvailable/readersCardsUnavailable use connection.get() directly
// so they resolve with the full {success, data:[...]} body.

describe('CoreService - readers', () => {
  it('resolves all card readers', async () => {
    mock.onAny().reply(200, mockCardReadersResponse);
    const result = await makeService().readers();
    expect(result).toMatchObject(mockCardReadersResponse);
  });

  it('resolves readers via callback', async () => {
    mock.onAny().reply(200, mockCardReadersResponse);
    await callbackTest<any>(
      (cb) => { makeService().readers(cb).catch(() => {}); },
      (err) => { expect(err).toBeFalsy(); },
    );
  });

  it('resolves readersCardAvailable', async () => {
    mock.onAny().reply(200, mockCardReadersResponse);
    const result = await makeService().readersCardAvailable();
    expect(result).toMatchObject(mockCardReadersResponse);
  });

  it('resolves readersCardsUnavailable', async () => {
    mock.onAny().reply(200, mockReadersNoCardResponse);
    const result = await makeService().readersCardsUnavailable();
    expect(result).toMatchObject(mockReadersNoCardResponse);
  });
});

describe('CoreService - getUrl', () => {
  it('returns the configured API base URL', () => {
    expect(makeService().getUrl()).toBe(TEST_BASE_URL);
  });
});

describe('CoreService - version', () => {
  it('resolves version from info endpoint', async () => {
    mock.onGet(INFO_URL).reply(200, mockCoreInfoResponse);
    const result = await makeService().version();
    expect(result).toBeDefined();
  });
});

describe('CoreService - getAtrList', () => {
  it('resolves with ATR list response', async () => {
    const atrResp = { success: true, data: { atrList: ['3B9F9680', '3B6B0000'] } };
    mock.onAny().reply(200, atrResp);
    const result = await makeService().getAtrList();
    expect(result).toMatchObject(atrResp);
  });
});

describe('CoreService - error handling', () => {
  it('rejects readers on 404', async () => {
    mock.onAny().reply(404);
    await expect(makeService().readers()).rejects.toMatchObject({ code: '112999' });
  });

  it('rejects readers on 401', async () => {
    mock.onAny().reply(401);
    await expect(makeService().readers()).rejects.toMatchObject({ code: '104025' });
  });

  it('calls back with error on 404', async () => {
    mock.onAny().reply(404);
    await callbackTest<any>(
      (cb) => { makeService().readers(cb).catch(() => {}); },
      (err) => { expect(err).toBeDefined(); },
    );
  });
});
