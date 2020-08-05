export class T1CConfigOptions {
  constructor(
    public t1cApiUrl?: string,
    public t1cApiPort?: string,
    public t1cRpcPort?: string,
    public dsUrl?: string,
    public jwt?: string,
    public osPinDialog?: boolean
  ) {}
}

/**
 * T1C SDK Configuration object.
 */
export class T1CConfig {
  private _dsUrl = 'https://acc-ds.t1t.io/';
  private _t1cApiUrl = 'https://t1c.t1t.io';
  private _t1cApiPort = '51983';
  private _t1cRpcPort = '50051';
  private _jwt = '';
  private _osPinDialog = false;

  // constructor for DTO
  public constructor(options: T1CConfigOptions) {
    if (options) {
      if (options.t1cApiUrl) {
        this._t1cApiUrl = options.t1cApiUrl;
      }
      if (options.t1cApiPort) {
        this._t1cApiPort = options.t1cApiPort;
      }
      if (options.t1cRpcPort) {
        this._t1cRpcPort = options.t1cRpcPort;
      }
      if (options.dsUrl) {
        this._dsUrl = options.dsUrl;
      }
      if (options.osPinDialog) {
        this._osPinDialog = options.osPinDialog;
      }
    }
  }

  set t1cRpcPort(value: string) {
    this._t1cRpcPort = value;
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

  get osPinDialog(): boolean {
    return this._osPinDialog;
  }
  set osPinDialog(value: boolean) {
    this._osPinDialog = value;
  }

  get t1cJwt(): string {
    return this._jwt;
  }
  set t1cJwt(value: string) {
    this._jwt = value;
  }

}
