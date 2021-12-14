export class T1CConfigOptions {
  constructor(
    public t1cApiUrl?: string,
    public t1cApiPort?: string,
    public t1cProxyUrl?: string, // deprecated
    public t1cProxyPort?: string, // deprecated
    public jwt?: string,
    public applicationDomain?: string, // "rmc.t1t.be"
  ) {}
}

/**
 * T1C SDK Configuration object.
 */
export class T1CConfig {
  private _t1cApiUrl = 'https://t1c.t1t.io';
  private _t1cApiPort = '51983';
  private _t1cProxyUrl = 'https://t1c.t1t.io';
  private _t1cProxyPort = '51983';
  private _jwt = '';
  private _applicationDomain = window.location.host; // will return the host of the current loaded web-page eg; rmc.t1t.io
  private _version;
  private _dsUrl;

  // constructor for DTO
  public constructor(options: T1CConfigOptions) {
    if (options) {
      if (options.t1cApiUrl) {
        this._t1cApiUrl = options.t1cApiUrl;
      }
      if (options.t1cApiPort) {
        this._t1cApiPort = options.t1cApiPort;
      }
      if (options.t1cProxyUrl) {
        this._t1cProxyUrl = options.t1cProxyUrl;
      }
      if (options.t1cProxyPort) {
        this._t1cProxyPort = options.t1cProxyPort;
      }
      if (options.applicationDomain) {
        this._applicationDomain = options.applicationDomain;
      }
      if (options.jwt) {
        this._jwt = options.jwt;
      }
    }
  }


  get applicationDomain(): string {
    return this._applicationDomain;
  }

  set applicationDomain(value: string) {
    this._applicationDomain = value;
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

  get t1cProxyUrl(): string {
    return this._t1cProxyUrl + ":" + this._t1cProxyPort;
  }

  get t1cJwt(): string {
    return this._jwt;
  }
  set t1cJwt(value: string) {
    this._jwt = value;
  }


  get version() {
    return this._version;
  }

  set version(value) {
    this._version = value;
  }


  get dsUrl() {
    return this._dsUrl;
  }

  set dsUrl(value) {
    this._dsUrl = value;
  }
}
