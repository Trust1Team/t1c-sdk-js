import {
  ensureLocalNetworkAccess,
  isLoopbackConnectorUrl,
  LOCAL_NETWORK_ACCESS_DENIED_CODE,
} from '../../../src/scripts/util/LocalNetworkAccess';

describe('Local Network Access helper', () => {
  const originalFetch = (globalThis as any).fetch;
  const originalNavigator = (globalThis as any).navigator;

  afterEach(() => {
    (globalThis as any).fetch = originalFetch;
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
  });

  it('recognizes IPv4, IPv6, and named loopback URLs only', () => {
    expect(isLoopbackConnectorUrl('https://localhost:51983')).toBe(true);
    expect(isLoopbackConnectorUrl('https://127.0.0.1:51983')).toBe(true);
    expect(isLoopbackConnectorUrl('https://[::1]:51983')).toBe(true);
    expect(isLoopbackConnectorUrl('https://t1c.t1t.io:51983')).toBe(false);
  });

  it('does not perform a permission probe for a non-loopback connector', async () => {
    const fetchMock = jest.fn();
    (globalThis as any).fetch = fetchMock;

    await expect(
      ensureLocalNetworkAccess('https://t1c.t1t.io:51983')
    ).resolves.toMatchObject({ state: 'not-required', prompted: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports an explicitly denied browser permission', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {
        permissions: {
          query: jest.fn().mockResolvedValue({ state: 'denied' }),
        },
      },
    });

    await expect(
      ensureLocalNetworkAccess('https://localhost:51983')
    ).rejects.toMatchObject({
      code: LOCAL_NETWORK_ACCESS_DENIED_CODE,
    });
  });

  it('triggers the browser decision before the connector API call', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ status: 401 });
    const query = jest
      .fn()
      .mockResolvedValueOnce({ state: 'prompt', permission: 'local-network-access' })
      .mockResolvedValueOnce({ state: 'granted', permission: 'local-network-access' });
    (globalThis as any).fetch = fetchMock;
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: { permissions: { query } },
    });
    await expect(
      ensureLocalNetworkAccess('https://localhost:51983')
    ).resolves.toMatchObject({ state: 'granted', prompted: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://localhost:51983/v3/system/loopback-access',
      expect.objectContaining({ credentials: 'include' })
    );
  });
});