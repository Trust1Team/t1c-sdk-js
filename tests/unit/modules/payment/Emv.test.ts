import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Emv } from '../../../../src/scripts/modules/smartcards/payment/emv/Emv';
import { makeConnection, TEST_BASE_URL } from '../../../__fixtures__/mockConfig';
import {
  mockEmvApplicationDataResponse,
  mockVerifyPinResponse,
  mockRnCertificateResponse,
} from '../../../__fixtures__/mockResponses';

jest.mock('../../../../src/scripts/util/CertParser', () => ({
  CertParser: {
    process: (_c: unknown, _p: unknown, cb: (r: unknown) => void) => cb(_c),
    processTokenCertificate:             jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processTokenCertificate36:           jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processTokenAllCertificates:         jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processTokenAllCertificates36:       jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processExtendedTokenCertificate:     jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processExtendedTokenAllCertificates: jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processPaymentCertificate:           jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
    processPaymentCertificate36:         jest.fn().mockImplementation((res: any) => Promise.resolve(res)),
  },
}));

const READER_ID = 'emv-reader-1';
const CONTAINER_URL = '/modules/emv';
const TEST_AID = 'A000000003101001';

function makeEmv(): Emv {
  return new Emv(TEST_BASE_URL, CONTAINER_URL, makeConnection(), READER_ID);
}

let mock: MockAdapter;
beforeEach(() => { mock = new MockAdapter(axios); });
afterEach(() => { mock.restore(); });

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

describe('Emv - read data', () => {
  it('resolves application data', async () => {
    mock.onAny().reply(200, mockEmvApplicationDataResponse);
    const result = await makeEmv().readApplicationData();
    expect(result).toMatchObject(mockEmvApplicationDataResponse);
  });

  it('resolves application data via callback', async () => {
    mock.onAny().reply(200, mockEmvApplicationDataResponse);
    await callbackTest<any>(
      (cb) => { makeEmv().readApplicationData(cb).catch(() => {}); },
      (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toMatchObject(mockEmvApplicationDataResponse);
      },
    );
  });

  it('resolves icc public certificate', async () => {
    mock.onAny().reply(200, mockRnCertificateResponse);
    const result = await makeEmv().iccPublicCertificate(TEST_AID);
    expect(result).toBeDefined();
  });

  it('resolves issuer public certificate', async () => {
    mock.onAny().reply(200, mockRnCertificateResponse);
    const result = await makeEmv().issuerPublicCertificate(TEST_AID);
    expect(result).toBeDefined();
  });

  it('resolves all certs extended', async () => {
    const allCertsResp = {
      success: true,
      data: {
        iccPublicKeyCertificate:    { base64: 'aWNj' },
        issuerPublicKeyCertificate: { base64: 'aXNzdWVy' },
      },
    };
    mock.onAny().reply(200, allCertsResp);
    const result = await makeEmv().allCertsExtended(TEST_AID, []);
    expect(result).toBeDefined();
  });
});

describe('Emv - PIN operations', () => {
  it('verifyPin resolves on success', async () => {
    mock.onAny().reply(200, mockVerifyPinResponse);
    const result = await makeEmv().verifyPin({ pin: '1234' });
    expect(result).toMatchObject(mockVerifyPinResponse);
  });

  it('verifyPin rejects on wrong PIN', async () => {
    mock.onAny().reply(400, { success: false, code: '103006', description: 'Wrong PIN' });
    await expect(makeEmv().verifyPin({ pin: '9999' })).rejects.toBeDefined();
  });
});

describe('Emv - URL routing', () => {
  it('includes reader_id in the request URL', async () => {
    mock.onAny().reply((config) => {
      expect(config.url).toContain(READER_ID);
      return [200, mockEmvApplicationDataResponse];
    });
    await makeEmv().readApplicationData();
  });

  it('includes emv container path in the request URL', async () => {
    mock.onAny().reply((config) => {
      expect(config.url).toContain('emv');
      return [200, mockEmvApplicationDataResponse];
    });
    await makeEmv().readApplicationData();
  });
});

describe('Emv - error handling', () => {
  it('rejects on 404', async () => {
    mock.onAny().reply(404);
    await expect(makeEmv().readApplicationData()).rejects.toMatchObject({ code: '112999' });
  });

  it('rejects on 401', async () => {
    mock.onAny().reply(401);
    await expect(makeEmv().readApplicationData()).rejects.toMatchObject({ code: '104025' });
  });

  it('calls back with error on 404', async () => {
    mock.onAny().reply(404);
    await callbackTest<any>(
      (cb) => { makeEmv().readApplicationData(cb).catch(() => {}); },
      (err) => {
        expect(err).toBeDefined();
        expect(err.code).toBe('112999');
      },
    );
  });
});
