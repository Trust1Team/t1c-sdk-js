import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { EidBe } from '../../../../src/scripts/modules/smartcards/token/eid/be/EidBe';
import { makeConnection, TEST_BASE_URL } from '../../../__fixtures__/mockConfig';
import {
  mockBiographicDataResponse,
  mockAddressResponse,
  mockRnCertificateResponse,
  mockVerifyPinResponse,
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

const READER_ID = 'reader-unit-test-1';
const CONTAINER_URL = '/modules/beid';

function makeEid(): EidBe {
  return new EidBe(TEST_BASE_URL, CONTAINER_URL, makeConnection(), READER_ID);
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

describe('EidBe - biometric data', () => {
  it('resolves with biometric data', async () => {
    mock.onAny().reply(200, mockBiographicDataResponse);
    const result = await makeEid().biometric();
    expect(result).toMatchObject(mockBiographicDataResponse);
  });

  it('includes reader_id in the request URL', async () => {
    mock.onAny().reply((config) => {
      expect(config.url).toContain(READER_ID);
      return [200, mockBiographicDataResponse];
    });
    await makeEid().biometric();
  });

  it('resolves biometric via callback', async () => {
    mock.onAny().reply(200, mockBiographicDataResponse);
    // Connection success path calls callback(undefined, data) — undefined is falsy
    await callbackTest<any>(
      (cb) => { makeEid().biometric(cb).catch(() => {}); },
      (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toMatchObject(mockBiographicDataResponse);
      },
    );
  });
});

describe('EidBe - address', () => {
  it('resolves with address data', async () => {
    mock.onAny().reply(200, mockAddressResponse);
    const result = await makeEid().address();
    expect(result).toMatchObject(mockAddressResponse);
  });

  it('resolves address via callback', async () => {
    mock.onAny().reply(200, mockAddressResponse);
    await callbackTest<any>(
      (cb) => { makeEid().address(cb).catch(() => {}); },
      (err) => { expect(err).toBeFalsy(); },
    );
  });
});

describe('EidBe - certificates', () => {
  it('resolves root certificate', async () => {
    mock.onAny().reply(200, mockRnCertificateResponse);
    const result = await makeEid().rootCertificate();
    expect(result).toBeDefined();
  });

  it('resolves authentication certificate', async () => {
    mock.onAny().reply(200, mockRnCertificateResponse);
    const result = await makeEid().authenticationCertificate();
    expect(result).toBeDefined();
  });

  it('resolves non-repudiation certificate', async () => {
    mock.onAny().reply(200, mockRnCertificateResponse);
    const result = await makeEid().nonRepudiationCertificate();
    expect(result).toBeDefined();
  });

  it('resolves all certs', async () => {
    const allCertsResp = {
      success: true,
      data: {
        rootCertificate:           { base64: 'cmZjZXJ0' },
        authenticationCertificate: { base64: 'YXV0aA==' },
        nonRepudiationCertificate: { base64: 'bm9ucmVw' },
        encryptionCertificate:     { base64: 'ZW5jcnlwdA==' },
      },
    };
    mock.onAny().reply(200, allCertsResp);
    const result = await makeEid().allCerts();
    expect(result).toBeDefined();
  });
});

describe('EidBe - PIN operations', () => {
  it('verifyPin resolves on success', async () => {
    mock.onAny().reply(200, mockVerifyPinResponse);
    const result = await makeEid().verifyPin({ pin: '1234', osDialog: false });
    expect(result).toMatchObject(mockVerifyPinResponse);
  });

  it('verifyPin rejects on wrong PIN (HTTP 400)', async () => {
    mock.onAny().reply(400, { success: false, code: '103006', description: 'Wrong PIN' });
    await expect(makeEid().verifyPin({ pin: '0000', osDialog: false })).rejects.toBeDefined();
  });

  it('sign posts body with algorithm field', async () => {
    const signResp = { success: true, data: { signedData: 'c2lnbmVk' } };
    mock.onAny().reply((config) => {
      const body = JSON.parse(config.data);
      expect(body.algorithm).toBeDefined();
      return [200, signResp];
    });
    const result = await makeEid().sign({
      algorithm: 'sha256WithRSAEncryption',
      data: 'dGVzdA==',
      pin: '1234',
      osDialog: false,
    });
    expect(result).toMatchObject(signResp);
  });
});

describe('EidBe - error handling', () => {
  it('rejects on 404', async () => {
    mock.onAny().reply(404);
    await expect(makeEid().biometric()).rejects.toMatchObject({ code: '112999' });
  });

  it('rejects on 401', async () => {
    mock.onAny().reply(401);
    await expect(makeEid().biometric()).rejects.toMatchObject({ code: '104025' });
  });

  it('calls back with error on 404', async () => {
    mock.onAny().reply(404);
    await callbackTest<any>(
      (cb) => { makeEid().biometric(cb).catch(() => {}); },
      (err) => {
        expect(err).toBeDefined();
        expect(err.code).toBe('112999');
      },
    );
  });
});
