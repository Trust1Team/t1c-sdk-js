export class T1CConfigOptions {
  constructor(
    public t1cApiUrl?: string,
    public t1cApiPort?: string,
    public jwt?: string,
    public applicationDomain?: string, // "rmc.t1t.be"
    public skipResponseValidation?: boolean,
    public t1cApiPorts?: Array<ApiPort>
  ) {}
}
// if api url and port are defined, also insert them in the api ports list first port we find we use
// guard, minimum 1 port
// resolution of port is the first one we can find that works
// TODO: taking in account the version of the SDK will be implemented in a later stage
// TODO gitbook documentation
/* logic:
 * run trough the list of api ports if you find one then replace the apiurl and port from the config to be used trough the rest of the SDK
 */
export interface ApiPort {
  url: string;
  port: string;
}

/**
 * T1C SDK Configuration object.
 */
export class T1CConfig {
  private _t1cApiUrl = 'https://t1c.t1t.io';
  private _t1cApiPort = '51983';
  private _t1cProxyUrl = 'https://t1c.t1t.io';
  private _t1cProxyPort = '51983';
  private _jwt: string | undefined = undefined;
  private _applicationDomain: string | undefined = undefined; // "rmc.t1t.be" -> free field which correlates in dashboard
  private _version;
  private _dsUrl;
  private _deviceHostName;
  private _skipResponseValidation = false;

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
      if (options.skipResponseValidation) {
        this._skipResponseValidation = options.skipResponseValidation;
      }
    }
  }

  get applicationDomain(): string | undefined {
    return this._applicationDomain;
  }

  set applicationDomain(value: string | undefined) {
    this._applicationDomain = value;
  }

  set t1cApiPort(value: string) {
    this._t1cApiPort = value;
  }

  get t1cApiUrl(): string {
    return this._t1cApiUrl + ':' + this._t1cApiPort;
  }

  set t1cApiUrl(value: string) {
    this._t1cApiUrl = value;
  }

  get t1cProxyUrl(): string {
    return this._t1cProxyUrl + ':' + this._t1cProxyPort;
  }

  get t1cJwt(): string | undefined {
    return this._jwt;
  }
  set t1cJwt(value: string | undefined) {
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

  get deviceHostName() {
    return this._deviceHostName;
  }

  set deviceHostName(value) {
    this._deviceHostName = value;
  }

  get skipResponseValidation(): boolean {
    return this._skipResponseValidation;
  }

  set skipResponseValidation(value: boolean) {
    this._skipResponseValidation = value;
  }
}
