import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { T1CClient } from '../../../src/scripts/core/T1CSdk';
import { T1CConfig, T1CConfigOptions, LOCALHOST_FALLBACK_URL } from '../../../src/scripts/core/T1CConfig';
import { makeConfig, TEST_BASE_URL, TEST_PORT } from '../../__fixtures__/mockConfig';
import { mockCoreInfoResponse } from '../../__fixtures__/mockResponses';

let mock: MockAdapter;
beforeEach(() => { mock = new MockAdapter(axios); });
afterEach(() => { mock.restore(); });

// The URL probed to test connectivity is always <url>:<port>/info
// In real use T1CClient constructs CoreService with t1cApiUrl getter = url:port
const PRIMARY_INFO_URL  = `${TEST_BASE_URL}:${TEST_PORT}/info`;
const LOCALHOST_INFO_URL = `${LOCALHOST_FALLBACK_URL}:${TEST_PORT}/info`;

// Silence fire-and-forget /device-key fetches so they don't cause noise
function mockDeviceKey() {
  mock.onGet(/\/device-key/).reply(200, { data: null });
}

describe('T1CClient.initialize - connectivity check URL', () => {
  it('probes <primary-url>:<port>/info to test the connection', async () => {
    mock.onGet(PRIMARY_INFO_URL).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    await T1CClient.initialize(makeConfig());

    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    expect(calledUrls.some(u => u === PRIMARY_INFO_URL)).toBe(true);
  });

  it('does NOT contact https://localhost when primary URL responds', async () => {
    mock.onGet(PRIMARY_INFO_URL).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    await T1CClient.initialize(makeConfig());

    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    const localhostInfoCalls = calledUrls.filter(
      u => u?.includes('localhost') && u?.includes('/info')
    );
    expect(localhostInfoCalls).toHaveLength(0);
  });
});

describe('T1CClient.initialize - localhost fallback', () => {
  it('falls back to https://localhost:<port>/info when primary is unreachable', async () => {
    mock.onGet(PRIMARY_INFO_URL).networkError();
    mock.onGet(LOCALHOST_INFO_URL).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    const client = await T1CClient.initialize(makeConfig());

    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    expect(calledUrls.some(u => u === PRIMARY_INFO_URL)).toBe(true);
    expect(calledUrls.some(u => u === LOCALHOST_INFO_URL)).toBe(true);
    expect(client.config().t1cApiUrl).toContain('localhost');
  });

  it('active config URL is localhost after successful fallback', async () => {
    mock.onGet(PRIMARY_INFO_URL).networkError();
    mock.onGet(LOCALHOST_INFO_URL).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    const client = await T1CClient.initialize(makeConfig());

    expect(client.config().t1cApiUrl).toBe(`${LOCALHOST_FALLBACK_URL}:${TEST_PORT}`);
  });

  it('localhost fallback carries the same port as the primary connection', async () => {
    const customPort = '54383';
    const primaryUrl  = `${TEST_BASE_URL}:${customPort}/info`;
    const fallbackUrl = `${LOCALHOST_FALLBACK_URL}:${customPort}/info`;

    mock.onGet(primaryUrl).networkError();
    mock.onGet(fallbackUrl).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    const cfg = new T1CConfig(new T1CConfigOptions(TEST_BASE_URL, customPort));
    const client = await T1CClient.initialize(cfg);

    const calledUrls = (mock.history.get ?? []).map(r => r.url);
    expect(calledUrls.some(u => u === fallbackUrl)).toBe(true);
    expect(client.config().t1cApiUrl).toBe(`${LOCALHOST_FALLBACK_URL}:${customPort}`);
  });

  it('rejects when both primary and localhost are unreachable', async () => {
    mock.onGet(PRIMARY_INFO_URL).networkError();
    mock.onGet(LOCALHOST_INFO_URL).networkError();
    mockDeviceKey();

    await expect(T1CClient.initialize(makeConfig())).rejects.toMatchObject({
      code: '112999',
    });
  });

  it('probes primary then localhost in that order', async () => {
    mock.onGet(PRIMARY_INFO_URL).networkError();
    mock.onGet(LOCALHOST_INFO_URL).reply(200, mockCoreInfoResponse);
    mockDeviceKey();

    await T1CClient.initialize(makeConfig());

    const infoRequests = (mock.history.get ?? [])
      .map(r => r.url)
      .filter(u => u?.endsWith('/info'));

    // Primary must have been tried before localhost
    const primaryIndex  = infoRequests.findIndex(u => u === PRIMARY_INFO_URL);
    const localhostIndex = infoRequests.findIndex(u => u === LOCALHOST_INFO_URL);
    expect(primaryIndex).toBeGreaterThanOrEqual(0);
    expect(localhostIndex).toBeGreaterThan(primaryIndex);
  });
});
