/**
 * Live E2E tests — only run when a real T1C connector is reachable.
 * Set T1C_API_URL (and optionally T1C_API_PORT) to enable.
 *
 * Example:
 *   T1C_API_URL=https://t1c.t1t.io T1C_API_PORT=51983 npm run test:e2e
 */
import { T1CConfig, T1CConfigOptions } from '../../src/scripts/core/T1CConfig';
import { CoreService } from '../../src/scripts/core/service/CoreService';
import { LocalConnection } from '../../src/scripts/core/client/Connection';

const LIVE_URL  = process.env.T1C_API_URL;
// Port must be string per T1CConfigOptions signature
const LIVE_PORT = process.env.T1C_API_PORT || '51983';
const RUN_E2E   = !!LIVE_URL;

const describeE2E = RUN_E2E ? describe : describe.skip;

function makeE2EConfig(): T1CConfig {
  const opts = new T1CConfigOptions(LIVE_URL!, LIVE_PORT);
  return new T1CConfig(opts);
}

describeE2E('Live Connector - Core', () => {
  let svc: CoreService;

  beforeAll(() => {
    const cfg  = makeE2EConfig();
    const conn = new LocalConnection(cfg);
    svc = new CoreService(LIVE_URL!, conn);
  });

  it('returns connector info', async () => {
    const result = await svc.info();
    expect(result).toBeDefined();
  }, 10000);

  it('lists card readers', async () => {
    const result = await svc.readers();
    expect(result).toBeDefined();
  }, 10000);

  it('returns readers with inserted card', async () => {
    // SDK method: readersCardAvailable()
    const result = await svc.readersCardAvailable();
    expect(result).toBeDefined();
  }, 10000);

  it('returns readers without a card', async () => {
    // SDK method: readersCardsUnavailable()
    const result = await svc.readersCardsUnavailable();
    expect(result).toBeDefined();
  }, 10000);

  it('returns connector version', async () => {
    const result = await svc.version();
    expect(result).toBeDefined();
  }, 10000);

  it('returns ATR list', async () => {
    // getAtrList() takes no arguments
    const result = await svc.getAtrList();
    expect(result).toBeDefined();
  }, 10000);

  it('returns the configured URL', () => {
    expect(svc.getUrl()).toBe(LIVE_URL);
  });
});
