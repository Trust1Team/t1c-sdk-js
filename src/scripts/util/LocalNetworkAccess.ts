import { T1CLibException } from '../core/exceptions/CoreExceptions';

/**
 * Chrome/Edge have used both names while Local Network Access has evolved.
 * Query the current name first and retain the legacy alias for older builds.
 */
export const LOCAL_NETWORK_PERMISSION_NAMES = [
  'local-network-access',
  'loopback-network',
] as const;

export const LOCAL_NETWORK_ACCESS_DENIED_CODE = '113001';

export type LocalNetworkAccessState =
  | 'granted'
  | 'prompt'
  | 'denied'
  | 'unsupported'
  | 'not-required'
  | 'unknown';

export interface LocalNetworkAccessResult {
  state: LocalNetworkAccessState;
  permission?: string;
  prompted: boolean;
}

export function isLoopbackConnectorUrl(targetUrl: string): boolean {
  try {
    const hostname = new URL(targetUrl).hostname.toLowerCase();
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname === '[::1]'
    );
  } catch (_) {
    return false;
  }
}

async function queryLocalNetworkAccess(): Promise<{
  state: LocalNetworkAccessState;
  permission?: string;
}> {
  const permissions = (globalThis as any).navigator?.permissions;
  if (!permissions || typeof permissions.query !== 'function') {
    return { state: 'unsupported' };
  }

  for (const permission of LOCAL_NETWORK_PERMISSION_NAMES) {
    try {
      const status = await permissions.query({
        name: permission,
      } as PermissionDescriptor);
      return {
        state: status.state as LocalNetworkAccessState,
        permission,
      };
    } catch (_) {
      // The browser does not know this permission name; try its alias.
    }
  }

  return { state: 'unsupported' };
}

function deniedPermissionError(permission?: string): T1CLibException {
  const permissionLabel = permission
    ? ` (${permission})`
    : '';
  return new T1CLibException(
    LOCAL_NETWORK_ACCESS_DENIED_CODE,
    `Trust1Connector needs Local Network Access${permissionLabel}. Allow local network access for this website in the browser site settings, then retry. This is separate from CORS.`
  );
}

/**
 * Trigger the browser's Local Network Access decision before the SDK's first
 * localhost API call. A successful HTTP response is not required here:
 * authentication or CORS may reject the diagnostic request after the browser
 * has made its network decision. Explicit permission denial is surfaced as a
 * typed SDK error; unsupported browsers preserve the existing request flow.
 */
export async function ensureLocalNetworkAccess(
  targetUrl: string
): Promise<LocalNetworkAccessResult> {
  if (!isLoopbackConnectorUrl(targetUrl)) {
    return { state: 'not-required', prompted: false };
  }

  const pageOrigin = (globalThis as any).location?.origin;
  if (pageOrigin && pageOrigin === new URL(targetUrl).origin) {
    return { state: 'not-required', prompted: false };
  }

  const before = await queryLocalNetworkAccess();
  if (before.state === 'denied') {
    throw deniedPermissionError(before.permission);
  }

  const fetchImpl = (globalThis as any).fetch as
    | ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>)
    | undefined;
  if (typeof fetchImpl !== 'function') {
    return { ...before, prompted: false };
  }

  try {
    await fetchImpl(`${targetUrl.replace(/\/+$/, '')}/v3/system/loopback-access`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
  } catch (_) {
    // A failed fetch can be TLS, CORS, connector availability, or LNA. Query
    // again so only an explicit LNA denial becomes the dedicated SDK error.
  }

  const after = await queryLocalNetworkAccess();
  if (after.state === 'denied') {
    throw deniedPermissionError(after.permission);
  }

  return { ...after, prompted: true };
}