export class T1CConfigOptions {
  constructor(
    public t1cApiUrl?: string,
    public t1cApiPort?: string,
    public t1cProxyUrl?: string,
    public t1cProxyPort?: string,
    public dsUrl?: string,
    public jwt?: string
  ) {}
}

/**
 * T1C SDK Configuration object.
 */
export class T1CConfig {
  private _dsUrl = 'https://acc-ds.t1t.io/';
  private _t1cApiUrl = 'https://t1c.t1t.io';
  private _t1cApiPort = '51983';
  private _t1cProxyUrl = 'https://t1c.t1t.io';
  private _t1cProxyPort = '51983';
  private _jwt = '';

  // constructor for DTO
  public constructor(options: T1CConfigOptions) {
    if (options) {
      if (options.t1cApiUrl) {
        this._t1cApiUrl = options.t1cApiUrl;
      }
      if (options.t1cApiPort) {
        this._t1cApiPort = options.t1cApiPort;
      }
      if (options.dsUrl) {
        this._dsUrl = options.dsUrl;
      }
      if (options.t1cProxyUrl) {
        this._t1cProxyUrl = options.t1cProxyUrl;
      }
      if (options.t1cProxyPort) {
        this._t1cProxyPort = options.t1cProxyPort;
      }
      if (options.jwt) {
        this._jwt = options.jwt;
      }
    }
  }

  set t1cApiPort(value: string) {
    this._t1cApiPort = value
  }

  get t1cApiUrl(): string {
    return this._t1cApiUrl + ":" + this._t1cApiPort;
  }

  set t1cApiUrl(value: string) {
    this._t1cApiUrl = value;
  }

  get dsUrl(): string {
    return this._dsUrl;
  }

  set dsUrl(value: string) {
    this._dsUrl = value;
  }

  get t1cProxyUrl(): string {
    return this._t1cProxyUrl + ":" + this._t1cProxyPort;
  }

  get t1cJwt(): string {
    return this._jwt;
  }
  set t1cJwt(value: string) {
    this._jwt = value;
  }

}
