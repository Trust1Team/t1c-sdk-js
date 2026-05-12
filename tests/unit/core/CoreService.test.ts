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

// CoreService.info() unwraps one data layer:
//   _get() resolves with response.data = {success, data:{...}}
//   info() then does: ResponseHandler.response(res.data) => resolves with inner data object
// So result is mockCoreInfoResponse.data (not the {success,data} wrapper).

describe('CoreService - info', () => {
  it('resolves with connector info inner data', async () => {
    mock.onAny().reply(200, mockCoreInfoResponse);
    const result = await makeService().info();
    expect(result).toMatchObject(mockCoreInfoResponse.data);
  });

  it('resolves info via callback', async () => {
    mock.onAny().reply(200, mockCoreInfoResponse);
    await callbackTest<any>(
      (cb) => { makeService().info(cb).catch(() => {}); },
      (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toMatchObject(mockCoreInfoResponse);
      },
    );
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
    mock.onAny().reply(200, mockCoreInfoResponse);
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
