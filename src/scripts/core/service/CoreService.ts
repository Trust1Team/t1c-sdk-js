import {LocalConnection} from '../client/Connection';
import {
  AbstractCore,
  AgentsResponse,
  CardReadersResponse,
  InfoResponse,
  SingleReaderResponse,
} from './CoreModel';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {T1CClient} from '../../..';
import {ResponseHandler} from '../../util/ResponseHandler';
import {ConnectorKeyUtil} from '../../util/ConnectorKeyUtil';
import {ConsentUtil} from '../../util/ConsentUtil';

const semver = require('semver');

const CORE_CONSENT = '/consent';
const CORE_VALIDATE = '/validate';
const CORE_INFO = '/info';
const CORE_VERSION = '/v3';
const CORE_DS_AGENTS = '/agents';
const CORE_READERS = '/readers';
const CORE_PUSH_LOGS = '/logs/push';

declare let VERSION: string;

/**
 * Core service functions: GCL information, reader detection, consent, etc.
 */
export class CoreService implements AbstractCore {
  // constructor
  constructor(
    private url: string,
    private connection: LocalConnection
  ) {}

  pushLogs(): Promise<boolean> {
    return new Promise(
      (
        resolve: (value: PromiseLike<boolean> | boolean) => void,
        reject: (reason?: any) => void
      ) => {
        this.connection
          .get(
            this.connection.cfg.t1cApiUrl,
            CORE_PUSH_LOGS,
            undefined,
            undefined
          )
          .then(
            res => {
              resolve(true);
            },
            err => {
              resolve(false);
            }
          );
      }
    );
  }

  /**
   * Function that will force the T1C API to synchronise the CORS list with its connected DS
   * If no DS is connected it will not do anything
   */
  dsCorsSync(): Promise<boolean> {
    return new Promise(
      (
        resolve: (value: PromiseLike<boolean> | boolean) => void,
        reject: (reason?: any) => void
      ) => {
        this.connection
          .get(
            this.connection.cfg.t1cApiUrl,
            CORE_VERSION + CORE_DS_AGENTS,
            undefined,
            undefined
          )
          .then(
            res => {
              resolve(true);
            },
            err => {
              reject(
                new T1CLibException(
                  '112001',
                  err.description ? err.description : 'Could not sync cors'
                )
              );
            }
          );
      }
    );
  }

  /**
   * This function is only available for the registry
   */
  getAgents(): Promise<AgentsResponse> {
    return this.connection.get(
      this.connection.cfg.t1cApiUrl,
      CORE_VERSION + CORE_DS_AGENTS,
      undefined,
      undefined
    );
  }

  getDevicePublicKey(): void {
    this.connection
      .get(this.connection.cfg.t1cApiUrl, '/device-key', undefined, undefined, undefined, 1000)
      .then(
        res => {
          ConnectorKeyUtil.setPubKey(res.data);
        },
        err => {
          // do nothing just output to the console
          console.error(err);
        }
      );
  }

  validateConsent(
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient> {
    return new Promise(
      (
        resolve: (value: PromiseLike<T1CClient> | T1CClient) => void,
        reject: (reason?: any) => void
      ) => {
        this._validateConsent(0, resolve, reject, callback);
      }
    );
  }

  // Recursive retry of consent for 3 times then it will fail.
  private _validateConsent(
    retries: number,
    resolve: (value: PromiseLike<T1CClient> | T1CClient) => void,
    reject: (reason?: any) => void,
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ) {
    if (retries < 3) {
      let url = this.connection.cfg.t1cApiUrl;
      if (
        semver.lt(semver.coerce(this.connection.cfg.version).version, '3.5.10')
      ) {
        const currentConsent = ConsentUtil.getRawConsent(
          this.connection.cfg.applicationDomain +
            '::' +
            this.connection.cfg.t1cApiUrl
        );
        let url = this.connection.cfg.t1cApiUrl;
        let suffixValue = CORE_VERSION;
        if (this.connection.cfg.dsUrl) {
          url = this.connection.cfg.dsUrl;
          suffixValue = CORE_DS_AGENTS;
        }
        return this.connection
          .post(
            url,
            suffixValue + CORE_VALIDATE,
            {
              data: currentConsent,
            },
            undefined
          )
          .then(
            res => {
              ConsentUtil.setConsent(
                res.data,
                this.connection.cfg.applicationDomain +
                  '::' +
                  this.connection.cfg.t1cApiUrl
              );
              const parsed_response = ConsentUtil.getConsent(
                this.connection.cfg.applicationDomain +
                  '::' +
                  this.connection.cfg.t1cApiUrl
              );
              if (parsed_response != null) {
                this.connection.cfg.t1cApiPort = parsed_response?.agent.apiPort;
                const newClient = new T1CClient(this.connection.cfg);
                newClient.core().getDevicePublicKey();
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(undefined, newClient);
                resolve(newClient);
              } else {
                ConsentUtil.removeConsent(
                  this.connection.cfg.applicationDomain +
                    '::' +
                    this.connection.cfg.t1cApiUrl
                );
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(
                  new T1CLibException(
                    '814501',
                    'No valid consent',
                    new T1CClient(this.connection.cfg)
                  ),
                  undefined
                );
                reject(
                  new T1CLibException(
                    '814501',
                    'No valid consent',
                    new T1CClient(this.connection.cfg)
                  )
                );
              }
            },
            _ => {
              setTimeout(() => {
                this._validateConsent(retries + 1, resolve, reject, callback);
              }, 1000);
            }
          );
      } else {
        let consent = ConsentUtil.getConsents(
          this.connection.cfg.applicationDomain +
            '::' +
            this.connection.cfg.t1cApiUrl
        );
        if (consent != null) {
          return this.connection
            .post(
              url,
              CORE_VERSION + CORE_VALIDATE,
              {
                consents: consent,
              },
              undefined
            )
            .then(
              res => {
                ConsentUtil.setConsents(
                  res.data.consents,
                  this.connection.cfg.applicationDomain +
                    '::' +
                    this.connection.cfg.t1cApiUrl
                );
                if (res.data.consentState === 'USE_DS_CENTRAL_REG') {
                  // use central registry for validation
                  this.handleValidateConsentCentral(
                    consent,
                    resolve,
                    reject,
                    callback,
                    1
                  );
                } else {
                  // use local registry for validation
                  this.handleValidateConsent(res, resolve, reject, callback);
                }
              },
              _ => {
                setTimeout(() => {
                  this._validateConsent(retries + 1, resolve, reject, callback);
                }, 1000);
              }
            );
        } else {
          ConsentUtil.removeConsent(
            this.connection.cfg.applicationDomain +
              '::' +
              this.connection.cfg.t1cApiUrl
          );
          if (!callback || typeof callback !== 'function') {
            callback = function () {};
          }
          callback(
            new T1CLibException(
              '814501',
              'No valid consent',
              new T1CClient(this.connection.cfg)
            ),
            undefined
          );
          return reject(
            new T1CLibException(
              '814501',
              'No valid consent',
              new T1CClient(this.connection.cfg)
            )
          );
        }
      }
    } else {
      if (!callback || typeof callback !== 'function') {
        callback = function () {};
      }
      callback(
        new T1CLibException(
          '814501',
          'No valid consent',
          new T1CClient(this.connection.cfg)
        ),
        undefined
      );
      return reject(
        new T1CLibException(
          '814501',
          'No valid consent',
          new T1CClient(this.connection.cfg)
        )
      );
    }
  }

  // Handler for contacting the central DS registry for a valid consent
  // after 4 retries when he gets back OUTDATED from the Central ds it will stop and require a new consent
  // This error case is probably because there is no agent running for that user thus returning 814500
  private handleValidateConsentCentral(
    consent,
    resolve,
    reject,
    callback,
    timeout
  ) {
    const url = this.connection.cfg.dsUrl;
    const suffixValue = CORE_DS_AGENTS;
    setTimeout(() => {
      return this.connection
        .post(
          url,
          suffixValue + CORE_VALIDATE,
          {
            consents: consent,
            hostname: this.connection.cfg.deviceHostName,
          },
          undefined
        )
        .then(
          dsRes => {
            if (dsRes.data.consentState === 'REQUIRED') {
              ConsentUtil.setConsent(
                dsRes.data.consents,
                this.connection.cfg.applicationDomain +
                  '::' +
                  this.connection.cfg.t1cApiUrl
              );
              if (!callback || typeof callback !== 'function') {
                callback = function () {};
              }
              callback(
                new T1CLibException(
                  '814501',
                  'Invalid consent value, new consent is required',
                  new T1CClient(this.connection.cfg)
                ),
                undefined
              );
              return reject(
                new T1CLibException(
                  '814501',
                  'Invalid consent value, new consent is required',
                  new T1CClient(this.connection.cfg)
                )
              );
            } else if (dsRes.data.consentState === 'OUTDATED') {
              if (timeout >= 16) {
                ConsentUtil.setConsent(
                  dsRes.data.consents,
                  this.connection.cfg.applicationDomain +
                    '::' +
                    this.connection.cfg.t1cApiUrl
                );
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(
                  new T1CLibException(
                    '814500',
                    'Invalid consent, no agent found',
                    new T1CClient(this.connection.cfg)
                  ),
                  undefined
                );
                return reject(
                  new T1CLibException(
                    '814500',
                    'Invalid consent, no agent found',
                    new T1CClient(this.connection.cfg)
                  )
                );
              } else {
                return this.handleValidateConsentCentral(
                  consent,
                  resolve,
                  reject,
                  callback,
                  timeout * 2
                );
              }
            } else {
              return this.handleValidateConsent(
                dsRes,
                resolve,
                reject,
                callback
              );
            }
          },
          dsErr => {
            if (!callback || typeof callback !== 'function') {
              callback = function () {};
            }
            callback(
              new T1CLibException(
                '814501',
                dsErr.description ? dsErr.description : 'Invalid Consent',
                new T1CClient(this.connection.cfg)
              ),
              undefined
            );
            return reject(
              new T1CLibException(
                '814501',
                dsErr.description ? dsErr.description : 'Invalid Consent',
                new T1CClient(this.connection.cfg)
              )
            );
          }
        );
    }, timeout);
  }

  // consent validation handler, check if the consent is approved and updates the active consent and returns an updated
  // client when the consent is valid. when the consent is invalid it returns 814501 with a new required consent error
  private handleValidateConsent(res, resolve, reject, callback) {
    if (res.data.consentState != 'APPROVED') {
      if (!callback || typeof callback !== 'function') {
        callback = function () {};
      }
      callback(
        new T1CLibException(
          '814501',
          'Invalid consent value, new consent is required',
          new T1CClient(this.connection.cfg)
        ),
        undefined
      );
      return reject(
        new T1CLibException(
          '814501',
          'Invalid consent value, new consent is required',
          new T1CClient(this.connection.cfg)
        )
      );
    } else {
      const activeConsent = ConsentUtil.parseConsent(res.data.consent);
      if (activeConsent != null) {
        this.connection.cfg.t1cApiPort = activeConsent.agent.apiPort;
        const newClient = new T1CClient(this.connection.cfg);
        newClient.core().getDevicePublicKey();
        if (!callback || typeof callback !== 'function') {
          callback = function () {};
        }
        callback(undefined, newClient);
        return resolve(newClient);
      } else {
        ConsentUtil.removeConsent(
          this.connection.cfg.applicationDomain +
            '::' +
            this.connection.cfg.t1cApiUrl
        );
        if (!callback || typeof callback !== 'function') {
          callback = function () {};
        }
        callback(
          new T1CLibException(
            '814501',
            'No valid consent',
            new T1CClient(this.connection.cfg)
          ),
          undefined
        );
        return reject(
          new T1CLibException(
            '814501',
            'No valid consent',
            new T1CClient(this.connection.cfg)
          )
        );
      }
    }
  }

  /*NOTE: The application is responsible to copy the codeWord on the clipboard BEFORE calling this function*/
  public getImplicitConsent(
    codeWord: string,
    durationInDays?: number,
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient> {
    let url = this.connection.cfg.t1cApiUrl;
    let suffixValue = CORE_VERSION;
    return new Promise(
      (
        resolve: (value: PromiseLike<T1CClient> | T1CClient) => void,
        reject: (reason?: any) => void
      ) => {
        this.getImplicitConsentHandler(
          0,
          codeWord,
          resolve,
          reject,
          durationInDays,
          callback
        );
      }
    );
  }

  private getImplicitConsentHandler(
    retries: number,
    codeWord: string,
    resolve: (value: PromiseLike<T1CClient> | T1CClient) => void,
    reject: (reason?: any) => void,
    durationInDays?: number,
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ) {
    if (retries < 3) {
      let url = this.connection.cfg.t1cApiUrl;
      let suffixValue = CORE_VERSION;
      let days: number = 365;
      if (durationInDays) {
        days = durationInDays;
      }
      if (
        semver.lt(semver.coerce(this.connection.cfg.version).version, '3.5.10')
      ) {
        let version = CORE_VERSION;
        if (this.connection.cfg.dsUrl) {
          url = this.connection.cfg.dsUrl;
          version = CORE_DS_AGENTS;
        }
        return this.connection
          .post(
            url,
            version + CORE_CONSENT,
            {
              codeWord: codeWord,
              durationInDays: days,
            },
            undefined,
            undefined,
            undefined,
            2000
          )
          .then(
            res => {
              ConsentUtil.setConsent(
                res.data,
                this.connection.cfg.applicationDomain +
                  '::' +
                  this.connection.cfg.t1cApiUrl
              );
              const parsed_response = ConsentUtil.getConsent(
                this.connection.cfg.applicationDomain +
                  '::' +
                  this.connection.cfg.t1cApiUrl
              );
              if (parsed_response != null) {
                this.connection.cfg.t1cApiPort = parsed_response.agent.apiPort;
              } else {
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(
                  new T1CLibException(
                    '814501',
                    'No valid consent',
                    new T1CClient(this.connection.cfg)
                  ),
                  undefined
                );
                reject(
                  new T1CLibException(
                    '814501',
                    'No valid consent',
                    new T1CClient(this.connection.cfg)
                  )
                );
              }
              const newClient = new T1CClient(this.connection.cfg);
              newClient.core().getDevicePublicKey();
              if (!callback || typeof callback !== 'function') {
                callback = function () {};
              }
              callback(undefined, newClient);
              resolve(newClient);
            },
            err => {
              this.getImplicitConsentHandler(
                retries + 1,
                codeWord,
                resolve,
                reject,
                durationInDays,
                callback
              );
            }
          );
      } else {
        const consents = ConsentUtil.getConsents(
          this.connection.cfg.applicationDomain +
            '::' +
            this.connection.cfg.t1cApiUrl
        );
        return this.connection
          .post(
            url,
            suffixValue + CORE_CONSENT,
            {
              codeWord: codeWord,
              durationInDays: days,
              consents: consents ? consents : undefined,
            },
            undefined
          )
          .then(
            res => {
              // Check if we get back from the registry that we need to consent towards the DS
              if (res.data.consentState === 'USE_DS_CENTRAL_REG') {
                if (this.connection.cfg.dsUrl) {
                  url = this.connection.cfg.dsUrl;
                  suffixValue = CORE_DS_AGENTS;
                }
                // Try to consent with the DS for 4 times, with each time an increasing timeout (x2)
                return this.connection
                  .post(
                    url,
                    suffixValue + CORE_CONSENT,
                    {
                      codeWord: codeWord,
                      durationInDays: days,
                      consents: consents ? consents : undefined,
                    },
                    undefined
                  )
                  .then(
                    dsRes => {
                      if (dsRes.data.consentState != 'APPROVED') {
                        if (!callback || typeof callback !== 'function') {
                          callback = function () {};
                        }
                        callback(
                          new T1CLibException(
                            '814501',
                            'Invalid consent, new consent is required',
                            new T1CClient(this.connection.cfg)
                          ),
                          undefined
                        );
                        return reject(
                          new T1CLibException(
                            '814501',
                            'Invalid consent, new consent is required',
                            new T1CClient(this.connection.cfg)
                          )
                        );
                      }
                      ConsentUtil.setConsents(
                        dsRes.data.consents,
                        this.connection.cfg.applicationDomain +
                          '::' +
                          this.connection.cfg.t1cApiUrl
                      );
                      const activeConsent = ConsentUtil.parseConsent(
                        dsRes.data.consent
                      );
                      if (activeConsent != null) {
                        this.connection.cfg.t1cApiPort =
                          activeConsent.agent.apiPort;
                        const newClient = new T1CClient(this.connection.cfg);
                        newClient.core().getDevicePublicKey();
                        if (!callback || typeof callback !== 'function') {
                          callback = function () {};
                        }
                        callback(undefined, newClient);
                        resolve(newClient);
                      } else {
                        if (!callback || typeof callback !== 'function') {
                          callback = function () {};
                        }
                        callback(
                          new T1CLibException(
                            '814501',
                            'Invalid consent, new consent is required',
                            new T1CClient(this.connection.cfg)
                          ),
                          undefined
                        );
                        return reject(
                          new T1CLibException(
                            '814501',
                            'Invalid consent, new consent is required',
                            new T1CClient(this.connection.cfg)
                          )
                        );
                      }
                    },
                    dsErr => {
                      if (dsErr.code === 1013) {
                        this.DsVerifyAgent(
                          codeWord,
                          days,
                          consents,
                          2,
                          resolve,
                          reject,
                          callback
                        );
                      } else {
                        if (!callback || typeof callback !== 'function') {
                          callback = function () {};
                        }
                        callback(
                          new T1CLibException(
                            '814501',
                            dsErr.description
                              ? dsErr.description
                              : 'Invalid Consent',
                            new T1CClient(this.connection.cfg)
                          ),
                          undefined
                        );
                        return reject(
                          new T1CLibException(
                            '814501',
                            dsErr.description
                              ? dsErr.description
                              : 'Invalid Consent',
                            new T1CClient(this.connection.cfg)
                          )
                        );
                      }
                    }
                  );
              } else {
                ConsentUtil.setConsents(
                  res.data.consents,
                  this.connection.cfg.applicationDomain +
                    '::' +
                    this.connection.cfg.t1cApiUrl
                );
                if (res.data.consentState != 'APPROVED') {
                  if (!callback || typeof callback !== 'function') {
                    callback = function () {};
                  }
                  callback(
                    new T1CLibException(
                      '814501',
                      'Invalid consent, new consent is required',
                      new T1CClient(this.connection.cfg)
                    ),
                    undefined
                  );
                  return reject(
                    new T1CLibException(
                      '814501',
                      'Invalid consent, new consent is required',
                      new T1CClient(this.connection.cfg)
                    )
                  );
                }
                const activeConsent = ConsentUtil.parseConsent(
                  res.data.consent
                );
                if (activeConsent != null) {
                  this.connection.cfg.t1cApiPort = activeConsent.agent.apiPort;
                  const newClient = new T1CClient(this.connection.cfg);
                  newClient.core().getDevicePublicKey();
                  if (!callback || typeof callback !== 'function') {
                    callback = function () {};
                  }
                  callback(undefined, newClient);
                  return resolve(newClient);
                } else {
                  if (!callback || typeof callback !== 'function') {
                    callback = function () {};
                  }
                  callback(
                    new T1CLibException(
                      '814501',
                      'Invalid consent, new consent is required',
                      new T1CClient(this.connection.cfg)
                    ),
                    undefined
                  );
                  return reject(
                    new T1CLibException(
                      '814501',
                      'Invalid consent, new consent is required',
                      new T1CClient(this.connection.cfg)
                    )
                  );
                }
              }
            },
            err => {
              this.getImplicitConsentHandler(
                retries + 1,
                codeWord,
                resolve,
                reject,
                durationInDays,
                callback
              );
            }
          );
      }
    } else {
      ConsentUtil.removeConsent(
        this.connection.cfg.applicationDomain +
          '::' +
          this.connection.cfg.t1cApiUrl
      );
      if (!callback || typeof callback !== 'function') {
        callback = function () {};
      }
      callback(
        new T1CLibException(
          '814501',
          'Invalid consent, new consent is required',
          new T1CClient(this.connection.cfg)
        ),
        undefined
      );
      return reject(
        new T1CLibException(
          '814501',
          'Invalid consent, new consent is required',
          new T1CClient(this.connection.cfg)
        )
      );
    }
  }

  // Recursive staggering function that will check the DS if a valid consent can be verified. After 4 tries it will stop and provide an invalid consent error
  private DsVerifyAgent(
    codeword,
    days,
    consents,
    timeout,
    resolve,
    reject,
    callback
  ) {
    setTimeout(() => {
      const url = this.connection.cfg.dsUrl;
      const version = CORE_DS_AGENTS;
      return this.connection
        .post(
          url,
          version + CORE_CONSENT,
          {
            codeWord: codeword,
            durationInDays: days,
            consents: consents ? consents : undefined,
          },
          undefined
        )
        .then(
          dsRes => {
            ConsentUtil.setConsents(
              dsRes.data.consents,
              this.connection.cfg.applicationDomain +
                '::' +
                this.connection.cfg.t1cApiUrl
            );
            if (dsRes.data.consentState != 'APPROVED') {
              this.DsVerifyAgent(
                codeword,
                days,
                consents,
                timeout * 2,
                resolve,
                reject,
                callback
              );
            } else {
              const activeConsent = ConsentUtil.parseConsent(
                dsRes.data.consent
              );
              if (activeConsent != null) {
                this.connection.cfg.t1cApiPort = activeConsent.agent.apiPort;
                const newClient = new T1CClient(this.connection.cfg);
                newClient.core().getDevicePublicKey();
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(undefined, newClient);
                return resolve(newClient);
              } else {
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(
                  new T1CLibException(
                    '814501',
                    'Invalid consent, new consent is required',
                    new T1CClient(this.connection.cfg)
                  ),
                  undefined
                );
                return reject(
                  new T1CLibException(
                    '814501',
                    'Invalid consent, new consent is required',
                    new T1CClient(this.connection.cfg)
                  )
                );
              }
            }
          },
          dsErr => {
            if (dsErr.code === 1013) {
              if (timeout >= 16) {
                if (!callback || typeof callback !== 'function') {
                  callback = function () {};
                }
                callback(
                  new T1CLibException(
                    '814500',
                    'Invalid consent, no agent found',
                    new T1CClient(this.connection.cfg)
                  ),
                  undefined
                );
                return reject(
                  new T1CLibException(
                    '814500',
                    'Invalid consent, no agent found',
                    new T1CClient(this.connection.cfg)
                  )
                );
              } else {
                this.DsVerifyAgent(
                  codeword,
                  days,
                  consents,
                  timeout * 2,
                  resolve,
                  reject,
                  callback
                );
              }
            } else {
              if (!callback || typeof callback !== 'function') {
                callback = function () {};
              }
              callback(
                new T1CLibException(
                  '814501',
                  dsErr.description ? dsErr.description : 'Invalid Consent',
                  new T1CClient(this.connection.cfg)
                ),
                undefined
              );
              return reject(
                new T1CLibException(
                  '814501',
                  dsErr.description ? dsErr.description : 'Invalid Consent',
                  new T1CClient(this.connection.cfg)
                )
              );
            }
          }
        );
    }, timeout * 1000);
  }

  public updateJWT(
    jwt: string,
    callback?: (error: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient> {
    if (jwt.length <= 0)
      return ResponseHandler.error(
        new T1CLibException('121', 'JWT may not be empty'),
        callback
      );
    this.connection.cfg.t1cJwt = jwt;
    const newClient = new T1CClient(this.connection.cfg);
    return ResponseHandler.response(newClient, callback);
  }

  public info(
    callback?: (error: T1CLibException, data: InfoResponse) => void
  ): Promise<InfoResponse> {
    return this.connection
      ._get(this.url, CORE_INFO, undefined, undefined, callback, 1000)
      .then(
        (res: any) => {
          if (res.data) {
            return ResponseHandler.response(res.data);
          } else {
            return ResponseHandler.response(res);
          }
        },
        err => {
          let error = new T1CLibException(
            err.response?.data.code,
            err.response?.data.description
          );
          return ResponseHandler.error(error, callback);
        }
      );
  }

  public reader(
    reader_id: string,
    callback?: (error: T1CLibException, data: SingleReaderResponse) => void
  ): Promise<SingleReaderResponse> {
    return this.connection.get(
      this.url,
      CORE_VERSION + CORE_READERS + '/' + reader_id,
      undefined,
      undefined,
      callback
    );
  }

  public readers(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse> {
    return this.connection.get(
      this.url,
      CORE_VERSION + CORE_READERS,
      undefined,
      undefined,
      callback
    );
  }

  public readersCardAvailable(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse> {
    return this.connection.get(
      this.url,
      CORE_VERSION + CORE_READERS,
      {cardInserted: true},
      undefined,
      callback
    );
  }

  public readersCardsUnavailable(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse> {
    return this.connection.get(
      this.url,
      CORE_VERSION + CORE_READERS,
      {cardInserted: false},
      undefined,
      callback
    );
  }

  public getUrl(): string {
    return this.url;
  }

  // get Lib version
  public version(): Promise<string> {
    return Promise.resolve(VERSION);
  }
}
