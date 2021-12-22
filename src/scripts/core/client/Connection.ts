import { T1CConfig } from "../T1CConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { T1CLibException } from "../exceptions/CoreExceptions";
import * as store from "store2";
import { DataArrayResponse } from "../../..";
import { UrlUtil } from "../../util/UrlUtil";

export interface Connection {
  get(
    basePath: string,
    suffix: string,
    queryParams?: any[],
    headers?: undefined,
    callback?:
      | ((error: T1CLibException, data: DataArrayResponse) => void)
      | undefined
  ): Promise<any>;

  post(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any>;

  put(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any>;

  delete(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any>;
}

export interface RequestBody {
  [key: string]: any;
}

export interface QueryParams {
  [key: string]: any;
}

export interface RequestHeaders {
  [key: string]: string;
}

export interface RequestCallback {
  (error: any, data: any): void;
}

export interface HeaderConfig {
  sendJWT: boolean;
  sendLabel: boolean;
}

/**
 * Base class for all connection types
 */
export abstract class GenericConnection implements Connection {
  // consent token = browser fingerprint
  static readonly AUTH_TOKEN_HEADER = "X-Authentication-Token";
  // key for localStorage for browser fingerprint
  static readonly BROWSER_AUTH_TOKEN = "t1c-js-browser-id-token";
  // whitelist application id prefix
  static readonly RELAY_STATE_HEADER_PREFIX = "X-Relay-State-";
  // language header
  static readonly HEADER_GCL_LANG = "X-Language-Code";
  // Transaction tag header
  static readonly DS_BILLING_TAG = "X-T1C-BILLING-TAG";

  constructor(public cfg: T1CConfig) {
  }

  /**
   * Helper function for GET requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {QueryParams} queryParams???
   * @param {RequestHeaders} headers???
   * @param {RequestCallback} callback???
   * @returns {Promise<any>}
   */
  public get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: any, callback?: RequestCallback): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "GET", this.cfg, securityConfig, undefined, queryParams, headers, callback);
  }

  /**
   * Helper function for POST requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestBody} body
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "POST", this.cfg, securityConfig, body, queryParams, headers, callback);
  }

  /**
   * Helper function for POST requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestBody} body
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public postFile(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleFileRequest(basePath, suffix, "POST", this.cfg, securityConfig, body, queryParams, headers, callback);
  }

  /**
   * Helper function for PUT requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestBody} body
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public put(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(
      basePath,
      suffix,
      "PUT",
      this.cfg,
      securityConfig,
      body,
      queryParams,
      headers,
      callback
    );
  }

  /**
   * Helper function for DELETE requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public delete(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    const securityConfig = this.getHeaderConfig();

    return this.handleRequest(
      basePath,
      suffix,
      "DELETE",
      this.cfg,
      securityConfig,
      undefined,
      queryParams,
      headers,
      callback
    );
  }

  /**
   * Sets provided headers + defaults, or default headers if no custom headers are provided
   * @param {RequestHeaders} headers: Headers to be set
   * @returns {RequestHeaders}
   */
  getRequestHeaders(headers?: RequestHeaders): RequestHeaders {
    const reqHeaders = headers || {};
    reqHeaders["Accept-Language"] = "en-US";
    reqHeaders["X-CSRF-Token"] = "t1c-js";
    return reqHeaders;
  }

  /**
   * Returns the header configuration for the current connection type
   * @returns {HeaderConfig}
   */
  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }

  /**
   * Function to send the actual request. Used by all request types. Uses axios to make call.
   * @param {string} basePath: base URL path of the request
   * @param {string} suffix: path suffix of the request
   * @param {string} method: HTTP method to be used
   * @param {T1CConfig} t1cConfig: T1CConfig to be used
   * @param {HeaderConfig} securityConfig: Security configuration, varies with connection subtype
   * @param {RequestBody} body: Body to be sent, for POST/PUT/...
   * @param {QueryParams} params: Query parameters to be sent with request
   * @param {RequestHeaders} headers: Headers to be sent with request
   * @param {RequestCallback} callback: Optional callback function if not using Promises
   * @returns {Promise<any>}
   */
  protected handleRequest(basePath: string, suffix: string, method: string, t1cConfig: T1CConfig, securityConfig: HeaderConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }
    let config: AxiosRequestConfig = {};
    config.withCredentials = true;
    config.url = UrlUtil.create(basePath, suffix);
    // @ts-ignore
    config.method = method;
    config.headers = this.getRequestHeaders(headers);
    config.responseType = "json";

    if (body) {
      config.data = body;
    }
    if (params) {
      config.params = params;
    }
    if (securityConfig.sendJWT) {
      config.headers.Authorization = "Bearer " + t1cConfig.t1cJwt;
    }
    if (securityConfig.sendLabel) {
      config.headers[GenericConnection.DS_BILLING_TAG] = t1cConfig.applicationDomain;
    }

    return new Promise((resolve, reject) => {
      axios.request(config)
        .then((response: AxiosResponse) => {
          // call callback function
          // @ts-ignore
          callback(undefined, response.data);
          // and resolve the promise
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          // check for generic network error
          if (!error.code && !error.response) {
            const thrownError = new T1CLibException(
              "112999",
              "Internal error"
            );
            // @ts-ignore
            callback(thrownError, null);
            return reject(thrownError);
          } else {
            // @ts-ignore
            callback(
              new T1CLibException(
                error.response?.data.code,
                error.response?.data.description
              ),
              null
            );
            return reject(
              new T1CLibException(
                error.response?.data.code,
                error.response?.data.description
              )
            );
          }
        });
    });
  }

  protected handleFileRequest(basePath: string, suffix: string, method: string, t1cConfig: T1CConfig, securityConfig: HeaderConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }

    let config: AxiosRequestConfig = {};
    config.withCredentials = true;
    config.url = UrlUtil.create(basePath, suffix);
    // @ts-ignore
    config.method = method;
    config.headers = this.getRequestHeaders(headers);
    config.responseType = "blob";

    if (body) {
      config.data = body;
    }
    if (params) {
      config.params = params;
    }
    if (securityConfig.sendJWT) {
      config.headers.Authorization = "Bearer " + t1cConfig.t1cJwt;
    }
    if (securityConfig.sendLabel) {
      config.headers[GenericConnection.DS_BILLING_TAG] = t1cConfig.applicationDomain;
    }

    return new Promise((resolve, reject) => {
      axios.request(config)
        .then((response: AxiosResponse) => {
          // call callback function
          // @ts-ignore
          callback(undefined, response.data);
          // and resolve the promise
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          // check for generic network error
          if (!error.code && !error.response) {
            const thrownError = new T1CLibException(
              "112999",
              "Internal error"
            );
            // @ts-ignore
            callback(thrownError, null);
            return reject(thrownError);
          } else {
            // @ts-ignore
            callback(
              new T1CLibException(
                error.response?.data.code,
                error.response?.data.description
              ),
              null
            );
            return reject(
              new T1CLibException(
                error.response?.data.code,
                error.response?.data.description
              )
            );
          }
        });
    });
  }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAdminConnection extends GenericConnection
  implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAuthAdminConnection extends GenericConnection
  implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getRequestHeaders(headers: RequestHeaders): RequestHeaders {
    const reqHeaders: RequestHeaders = super.getRequestHeaders(headers);
    //reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
    reqHeaders.Authorization = "Bearer " + this.cfg.t1cJwt;
    /*        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
                        reqHeaders[
                            GenericConnection.AUTH_TOKEN_HEADER
                            ] = BrowserFingerprint.get();
                    }*/
    return reqHeaders;
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }

  /**
   * Helper method for requesting log files. These are sent as arraybuffers and require special handling.
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public requestLogFile(
    basePath: string,
    suffix: string,
    callback?: RequestCallback
  ): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }
    const headers = this.getRequestHeaders({});
    return new Promise((resolve, reject) => {
      axios
        .get(UrlUtil.create(basePath, suffix), {
          responseType: "blob",
          headers
        })
        .then(
          response => {
            // @ts-ignore
            callback(null, response);
            return resolve(response);
          },
          error => {
            if (error.response) {
              if (error.response.data) {
                // @ts-ignore
                callback(error.response.data, null);
                return reject(error.response.data);
              } else {
                // @ts-ignore
                callback(error.response, null);
                return reject(error.response);
              }
            } else {
              // @ts-ignore
              callback(error, null);
              return reject(error);
            }
          }
        );
    });
  }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAuthConnection extends GenericConnection
  implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }

  /**
   * Helper method for GET requests; will ignore Citrix environment and not sent agent URL prefix,
   * even if an agent port is present in T1CConfig
   * @param {string} basePath
   * @param {string} suffix
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(
      basePath,
      suffix,
      "GET",
      this.cfg,
      securityConfig,
      undefined,
      queryParams,
      this.getRequestHeaders(headers),
      callback
    );
  }

  public postSkipCitrix(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    body?: RequestBody,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(
      basePath,
      suffix,
      "POST",
      this.cfg,
      securityConfig,
      body,
      queryParams,
      this.getRequestHeaders(headers),
      callback
    );
  }

  /**
   * Helper method for requesting log files. These are sent as arraybuffers and require special handling.
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public requestLogFile(
    basePath: string,
    suffix: string,
    callback?: RequestCallback
  ): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }

    return new Promise((resolve, reject) => {
      const headers: RequestHeaders = this.getRequestHeaders({});
      axios
        .get(UrlUtil.create(basePath, suffix), {
          responseType: "blob",
          headers
        })
        .then(
          response => {
            // @ts-ignore
            callback(null, response);
            return resolve(response);
          },
          error => {
            if (error.response) {
              if (error.response.data) {
                // @ts-ignore
                callback(error.response.data, null);
                return reject(error.response.data);
              } else {
                // @ts-ignore
                callback(error.response, null);
                return reject(error.response);
              }
            } else {
              // @ts-ignore
              callback(error, null);
              return reject(error);
            }
          }
        );
    });
  }
}

/**
 * Local connection without security token or keys
 */
export class LocalConnection extends GenericConnection implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getRequestHeaders(headers: RequestHeaders): RequestHeaders {
    const reqHeaders = super.getRequestHeaders(headers);
    return reqHeaders;
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }

  /**
   * Helper method for GET requests; will ignore Citrix environment and not sent agent URL prefix,
   * even if an agent port is present in T1CConfig
   * @param {string} basePath
   * @param {string} suffix
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public getSkipCitrix(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(
      basePath,
      suffix,
      "GET",
      this.cfg,
      securityConfig,
      undefined,
      queryParams,
      headers,
      callback
    );
  }
}

/**
 * Remote connection which will set API key header
 */
export class RemoteApiKeyConnection extends GenericConnection
  implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }
}

/**
 * Remote connection which will set Authorization: Bearer token
 */
export class RemoteJwtConnection extends GenericConnection
  implements Connection {
  constructor(public cfg: T1CConfig) {
    super(cfg);
  }

  getHeaderConfig(): HeaderConfig {
    return {
      sendLabel: !!this.cfg.applicationDomain,
      sendJWT: !!this.cfg.t1cJwt
    };
  }
}

// TODO remove?
/**
 * Local testing connection
 */
export class LocalTestConnection extends GenericConnection
  implements Connection {
  config = undefined;

  public get(
    basePath: string,
    suffix: string,
    queryParams?: any[],
    headers?: undefined,
    callback?:
      | ((error: T1CLibException, data: DataArrayResponse) => void)
      | undefined
  ): Promise<any> {
    return this.handleTestRequest(
      basePath,
      suffix,
      "GET",
      // @ts-ignore
      this.config,
      undefined,
      queryParams,
      headers,
      callback
    );
  }

  public post(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    return this.handleTestRequest(
      basePath,
      suffix,
      "POST",
      // @ts-ignore
      this.config,
      body,
      queryParams,
      headers,
      callback
    );
  }

  public put(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    return this.handleTestRequest(
      basePath,
      suffix,
      "PUT",
      // @ts-ignore
      this.config,
      body,
      queryParams,
      headers,
      callback
    );
  }

  public delete(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<any> {
    return this.handleTestRequest(
      basePath,
      suffix,
      "DELETE",
      // @ts-ignore
      this.config,
      undefined,
      queryParams,
      headers,
      callback
    );
  }

  getRequestHeaders(headers?: RequestHeaders) {
    const reqHeaders = headers? headers : {};
    reqHeaders["Accept-Language"] = "en-US";
    reqHeaders["X-Consumer-Username"] = "testorg.testapp.v1";
    reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = store.get(
      GenericConnection.BROWSER_AUTH_TOKEN
    );
    return reqHeaders;
  }

  private handleTestRequest(
    basePath: string,
    suffix: string,
    method: string,
    gclConfig: T1CConfig,
    body?: any,
    params?: any,
    headers?: RequestHeaders,
    callback?: (error: any, data: any) => void
  ): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }

    let config: AxiosRequestConfig = {};
    config.url = UrlUtil.create(basePath, suffix);
    // @ts-ignore
    config.method = method;
    config.headers = this.getRequestHeaders(headers);
    config.responseType = "json";
    if (body) {
      config.data = body;
    }
    if (params) {
      config.params = params;
    }
    if (gclConfig.t1cJwt) {
      config.headers.Authorization = "Bearer " + gclConfig.t1cJwt;
    }
    if (gclConfig.applicationDomain) {
      config.headers[GenericConnection.DS_BILLING_TAG] = gclConfig.applicationDomain;
    }

    return new Promise((resolve, reject) => {
      axios.request(config)
        .then((response: AxiosResponse) => {
          // @ts-ignore
          callback(null, response.data);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            // @ts-ignore
            callback(error.response, null);
            return reject(error.response);
          } else {
            // @ts-ignore
            callback(error, null);
            return reject(error);
          }
        });
    });
  }
}
