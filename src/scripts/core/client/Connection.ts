import { T1CConfig } from "../T1CConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { T1CLibException } from "../exceptions/CoreExceptions";
import { ConnectorKeyUtil, DataArrayResponse, T1CResponse } from "../../..";
import { UrlUtil } from "../../util/UrlUtil";
const md5 = require('md5');
const semver = require('semver');

export interface Connection {
  get<T extends T1CResponse>(
    basePath: string,
    suffix: string,
    queryParams?: any[],
    headers?: undefined,
    callback?:
      | ((error: T1CLibException, data: DataArrayResponse) => void)
      | undefined
  ): Promise<T>;

  post<T extends T1CResponse>(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<T>;

  put<T extends T1CResponse>(
    basePath: string,
    suffix: string,
    body: RequestBody,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<T>;

  delete<T extends T1CResponse>(
    basePath: string,
    suffix: string,
    queryParams?: QueryParams,
    headers?: RequestHeaders,
    callback?: RequestCallback
  ): Promise<T>;
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
  public _get<T>(basePath: string, suffix: string, queryParams?: QueryParams, headers?: any, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "GET", this.cfg, securityConfig, undefined, queryParams, headers, callback, timeout);
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
  public get<T extends T1CResponse>(basePath: string, suffix: string, queryParams?: QueryParams, headers?: any, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "GET", this.cfg, securityConfig, undefined, queryParams, headers, callback, timeout);
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
  public post<T extends T1CResponse>(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "POST", this.cfg, securityConfig, body, queryParams, headers, callback, timeout);
  }

  /**
   * Helper function for PATCH requests
   * @param {string} basePath
   * @param {string} suffix
   * @param {RequestBody} body
   * @param {QueryParams} queryParams
   * @param {RequestHeaders} headers
   * @param {RequestCallback} callback
   * @returns {Promise<any>}
   */
  public patch<T extends T1CResponse>(basePath: string, suffix: string, body?: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "PATCH", this.cfg, securityConfig, body, queryParams, headers, callback, timeout);
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
  public put<T extends T1CResponse>(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "PUT", this.cfg, securityConfig, body, queryParams, headers, callback, timeout);
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
  public delete<T extends T1CResponse>(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback, timeout?: number): Promise<T> {
    const securityConfig = this.getHeaderConfig();
    return this.handleRequest(basePath, suffix, "DELETE", this.cfg, securityConfig, undefined, queryParams, headers, callback, timeout);
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
  protected handleRequest(basePath: string, suffix: string, method: string, t1cConfig: T1CConfig, securityConfig: HeaderConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback, timeout?: number): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") {
      callback = function() {
        /* no-op */
      };
    }
    let config: AxiosRequestConfig = {};
    if (timeout) {
      config.timeout = timeout;
    }
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
          // When no version known, skip signature validation
          if (!this.cfg.version) {
            // call callback function
            // @ts-ignore
            callback(undefined, response.data);
            return resolve(response.data);
          }

          // When version is lower than 3.7.11 and greater than 3.7.6, skip signature validation (issue in older version when the packaging enables reg response signatures)
          if (this.cfg.version && semver.lt(semver.coerce(this.cfg.version).version, '3.7.11') && semver.gt(semver.coerce(this.cfg.version).version, '3.7.6')) {
            // call callback function
            // @ts-ignore
            callback(undefined, response.data);
            return resolve(response.data);
          }

          // When skipped by the client application, push validation to web ctx
          if (this.cfg.skipResponseValidation) {
            // call callback function
            // @ts-ignore
            callback(undefined, response.data);
            return resolve(response.data);
          } else if (response.data && response.data.signature && ConnectorKeyUtil.getPubKey() != undefined && !ConnectorKeyUtil.keyReset()) {
            let verification = ConnectorKeyUtil.verifySignature(JSON.stringify(response.data.data), response.data.signature)

            if (verification) {
              // call callback function
              // @ts-ignore
              callback(undefined, response.data);
              // and resolve the promise
              return resolve(response.data);
            } else {
              const thrownError = new T1CLibException(
                  "904300",
                  "Signature data does not equal the expected data"
              );
              // @ts-ignore
              callback(thrownError, null);
              return reject(thrownError);
            }

          } else { // just return when all previous cases are handled
            // call callback function
            // @ts-ignore
            callback(undefined, response.data);
            // and resolve the promise
            return resolve(response.data);
          }


        })
        .catch((error: AxiosError) => {
          // check for generic network error
          return this.handleError(error, reject, callback)
        });
    });
  }

  private handleError(error, reject, callback) {
    const defaultCode = '000000';
    const defaultDescription = 'Unknown error occured';
    const code = error.response?.data?.code ? error.response.data.code : defaultCode;
    const description = error.response?.data?.description ? error.response.data.description : defaultDescription;
    if (!error.response) {
      // @ts-ignore
      callback(
        new T1CLibException(
          code,
          description
        ),
        null
      );
      return reject(
        new T1CLibException(
          code,
          description
        )
      );
    } else {
      switch (error.response?.status) {
        case 404: {
          const thrownError = new T1CLibException(
            "112999",
            "Functionality not found"
          );
          // @ts-ignore
          callback(thrownError, null);
          return reject(thrownError);
        }
        case 401: {
          const thrownError = new T1CLibException(
            "104025",
            "Unauthorized to do this action"
          );
          // @ts-ignore
          callback(thrownError, null);
          return reject(thrownError);
        }
        default: {
          // @ts-ignore
          callback(
            new T1CLibException(
              code,
              description
            ),
            null
          );
          return reject(
            new T1CLibException(
              code,
              description
            )
          );
        }
      }
    }

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
          if (error.response?.status === 404) {
            const thrownError = new T1CLibException(
              "112999",
              "Functionality not found"
            );
            // @ts-ignore
            callback(thrownError, null);
            return reject(thrownError);
          }
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
                // @ts-ignore
                new T1CLibException(error.response?.data.code, error.response?.data.description),
              null
            );
            return reject(
                // @ts-ignore
                new T1CLibException(error.response?.data.code, error.response?.data.description)
            );
          }
        });
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
}
