import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {T1CLibException} from './exceptions/CoreExceptions';
import {T1CContainerid} from './service/CoreModel';
import {Pkcs11ModuleConfig} from "../modules/pkcs11/generic/Pkcs11GenericModel";

export class T1CConfigOptions {
  constructor(
    public t1cApiUrl?: string,
    public t1cApiPort?: string,
    public t1cRpcPort?: string,
    public dsUrl?: string,
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
    public t1cDownloadLink?: string,
    public t1cVersion?: string,
    public pkcs11Config?: Pkcs11ModuleConfig,
  ) {}
}

/**
 * GCL Configuration object. Represents the GCL Library configuration state.
 * Most settings are configurable by the user; some are set by the library itself.
 */
export class T1CConfig {
  private _dsUrl = 'https://apim.t1t.be';
  private _t1cApiUrl = 'https://t1c.t1t.io';
  private _t1cApiPort = '51983';
  private _t1cRpcPort = '50051';
  private _dsContextPath = '';
  private _apiKey = 'PROVIDE APIKEY';
  private _gwJwt = 'PROVIDE DS JWT';
  private _t1cJwt = 'PROVIDE GCL JWT';
  private _citrix = false;
  private _agentPort = -1;
  private _forceHardwarePinpad = false;
  private _defaultSessionTimeout = 5;
  private _tokenCompatible = true;
  private _defaultConsentDuration = 1; //TODO specify unit
  private _defaultConsentTimeout = 10; //TODO specify unit
  private _osPinDialog = false;
  private _contextToken = '';
  private _lang = 'en';
  private _t1cDownloadLink = '';
  private _t1cVersion = 'NOT SPECIFIED';
  private _pkcs11Config: Pkcs11ModuleConfig | undefined;

  // constructor for DTO
  public constructor(options: T1CConfigOptions) {
    if (options) {
      if (options.t1cVersion) {
        this._t1cVersion = options.t1cVersion;
      }
      if (options.t1cApiUrl) {
        this._t1cApiUrl = options.t1cApiUrl;
      }
      if (options.t1cApiPort) {
        this._t1cApiPort = options.t1cApiPort;
      }
      if (options.t1cRpcPort) {
        this._t1cRpcPort = options.t1cRpcPort;
      }
      if (options.t1cDownloadLink) {
        this._t1cDownloadLink = options.t1cDownloadLink;
      }
      if (options.dsUrl) {
        this._dsUrl = options.dsUrl;
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
      if (options.pkcs11Config) {
        this._pkcs11Config = options.pkcs11Config;
      } else {
        this._pkcs11Config = undefined;
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
      if (this.dsUrl) {
        if (options.dsContextPath) {
          this._dsContextPath = options.dsContextPath;
        }
      }
    }
  }


  get pkcs11Config(): Pkcs11ModuleConfig | undefined {
    return this._pkcs11Config;
  }

  set pkcs11Config(value: Pkcs11ModuleConfig | undefined) {
    this._pkcs11Config = value;
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
    return this._dsUrl + this._dsContextPath;
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

  set dsUrl(value: string) {
    this._dsUrl = value;
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

  get t1cJwt(): string {
    return this._t1cJwt;
  }
  set t1cJwt(value: string) {
    this._t1cJwt = value;
  }

  get lang(): string {
    return this._lang;
  }
  set lang(value: string) {
    this._lang = value;
  }

  get t1cDownloadLink(): string {
    return this._t1cDownloadLink;
  }
  set t1cDownloadLink(value: string) {
    this._t1cDownloadLink = value;
  }

  get t1cVersion(): string {
    return this._t1cVersion;
  }
  set t1cVersion(value: string) {
    this._t1cVersion = value;
  }
}
