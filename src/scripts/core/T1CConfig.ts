import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {T1CLibException} from './exceptions/CoreExceptions';
import {T1CContainerid} from './service/CoreModel';

export class GCLConfigOptions {
  constructor(
    public gclUrl?: string,
    public gwOrProxyUrl?: string,
    public apiKey?: string,
    public gwJwt?: string,
    public dsContextPath?: string,
    public agentPort?: number,
    public forceHardwarePinpad?: boolean,
    public sessionTimeout?: number,
    public consentDuration?: number,
    public consentTimeout?: number,
    public osPinDialog?: boolean,
    public lang?: string,
    public gclDownloadLink?: string,
    public gclVersion?: string
  ) {}
}

/**
 * GCL Configuration object. Represents the GCL Library configuration state.
 * Most settings are configurable by the user; some are set by the library itself.
 */
export class T1CConfig {
  private _gwUrl = 'https://apim.t1t.be';
  private _gclUrl = 'https://t1c.t1t.io';
  private _dsContextPath = '';
  private _apiKey = 'PROVIDE APIKEY';
  private _gwJwt = 'PROVIDE DS JWT';
  private _gclJwt = 'PROVIDE GCL JWT';
  private _citrix = false;
  private _agentPort = -1;
  private _forceHardwarePinpad = false;
  private _defaultSessionTimeout = 5;
  private _tokenCompatible = true;
  private _defaultConsentDuration = 1; //TODO specify unit
  private _defaultConsentTimeout = 10; //TODO specifi unit
  private _osPinDialog = false;
  private _contextToken = '';
  private _lang = 'en';
  private _gclDownloadLink = '';
  private _gclVersion = 'NOT SPECIFIED';

  // constructor for DTO
  public constructor(options: GCLConfigOptions) {
    if (options) {
      if (options.gclVersion) {
        this.gclVersion = options.gclVersion;
      }
      if (options.gclUrl) {
        this._gclUrl = options.gclUrl;
      }
      if (options.gclDownloadLink) {
        this._gclDownloadLink = options.gclDownloadLink;
      }
      if (options.gwOrProxyUrl) {
        this._gwUrl = options.gwOrProxyUrl;
      }
      if (options.apiKey) {
        this._apiKey = options.apiKey;
      } // no default
      if (options.gwJwt) {
        this._gwJwt = options.gwJwt;
      }
      if (options.agentPort) {
        this._agentPort = options.agentPort;
      }

      if (options.forceHardwarePinpad) {
        this._forceHardwarePinpad = options.forceHardwarePinpad;
      }
      if (options.sessionTimeout) {
        this._defaultSessionTimeout = options.sessionTimeout;
      }
      if (options.consentDuration) {
        this._defaultConsentDuration = options.consentDuration;
      }
      if (options.consentTimeout) {
        this._defaultConsentTimeout = options.consentTimeout;
      }
      if (options.osPinDialog) {
        this._osPinDialog = options.osPinDialog;
      }

      if (options.lang) {
        this._lang = options.lang;
      }

      // resolve DS context path
      if (this.gwUrl) {
        if (options.dsContextPath) {
          this._dsContextPath = options.dsContextPath;
        }
      }
    }
  }

  get gclUrl(): string {
    return this._gclUrl;
  }
  set gclUrl(value: string) {
    this._gclUrl = value;
  }
  get dsUrl(): string {
    return this.gwUrl + this.dsContextPath;
  }

  get dsContextPath(): string {
    return this._dsContextPath;
  }
  set dsContextPath(value: string) {
    this._dsContextPath = value;
  }

  get apiKey(): string {
    return this._apiKey;
  }
  set apiKey(value: string) {
    this._apiKey = value;
  }

  get citrix(): boolean {
    return this._citrix;
  }
  set citrix(value: boolean) {
    this._citrix = value;
  }

  get agentPort(): number {
    return this._agentPort;
  }
  set agentPort(value: number) {
    this._agentPort = value;
  }

  get gwUrl(): string {
    return this._gwUrl;
  }
  set gwUrl(value: string) {
    this._gwUrl = value;
  }

  get forceHardwarePinpad(): boolean {
    return this._forceHardwarePinpad;
  }
  set forceHardwarePinpad(value: boolean) {
    this._forceHardwarePinpad = value;
  }

  get tokenCompatible(): boolean {
    return this._tokenCompatible;
  }
  set tokenCompatible(value: boolean) {
    this._tokenCompatible = value;
  }

  get defaultConsentDuration(): number {
    return this._defaultConsentDuration;
  }
  set defaultConsentDuration(value: number) {
    this._defaultConsentDuration = value;
  }

  get defaultConsentTimeout(): number {
    return this._defaultConsentTimeout;
  }
  set defaultConsentTimeout(value: number) {
    this._defaultConsentTimeout = value;
  }

  get osPinDialog(): boolean {
    return this._osPinDialog;
  }
  set osPinDialog(value: boolean) {
    this._osPinDialog = value;
  }

  get contextToken(): string {
    return this._contextToken;
  }
  set contextToken(value: string) {
    this._contextToken = value;
  }

  get gclJwt(): string {
    return this._gclJwt;
  }
  set gclJwt(value: string) {
    this._gclJwt = value;
  }

  get lang(): string {
    return this._lang;
  }
  set lang(value: string) {
    this._lang = value;
  }

  get gclDownloadLink(): string {
    return this._gclDownloadLink;
  }
  set gclDownloadLink(value: string) {
    this._gclDownloadLink = value;
  }

  get gclVersion(): string {
    return this._gclVersion;
  }
  set gclVersion(value: string) {
    this._gclVersion = value;
  }
}
