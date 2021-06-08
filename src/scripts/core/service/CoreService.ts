import {LocalAuthConnection} from '../client/Connection';
import {
    AbstractCore,
    CardReadersResponse,
    DataResponse,
    InfoResponse,
    SingleReaderResponse,
} from './CoreModel';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {T1CClient} from '../../..';
import {ResponseHandler} from "../../util/ResponseHandler";
import {Pinutil} from "../../util/PinUtil";
import {ConsentUtil} from "../../util/ConsentUtil";
const semver = require('semver');

const CORE_CONSENT = '/consent';
const CORE_VALIDATE = '/validate';
const CORE_INFO = '/info';
const CORE_VERSION = '/v3';
const CORE_READERS = '/readers';
const CORE_CONSENT_IMPLICIT = '/agents/consent';



declare let VERSION: string;

/**
 * Core service functions: GCL information, reader detection, consent, etc.
 */
export class CoreService implements AbstractCore {
    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {
    }

    getDevicePublicKey(callback?: (error?: T1CLibException, data?: string) => void): void {
        this.connection.get(
            this.connection.cfg.t1cApiUrl,
            "/device-key",
            undefined,
            undefined
        ).then(res => {
            Pinutil.setPubKey(res.data);
        }, err => {
            // do nothing
        });
    }

    validateConsent(consent: string, callback?: (error?: T1CLibException, data?: T1CClient) => void): Promise<T1CClient> {
        return new Promise((resolve, reject) => {
            return this.connection.post(
                this.connection.cfg.t1cApiUrl,
                CORE_VERSION + CORE_VALIDATE,
                {
                    data: consent
                },
                undefined
            ).then(res => {
                ConsentUtil.setConsent(res.data, this.connection.cfg.t1cApiUrl)
                const parsed_response = ConsentUtil.getConsent(this.connection.cfg.t1cApiUrl)
                if (parsed_response != null) {
                    this.connection.cfg.t1cApiPort = parsed_response?.agent.apiPort;
                    const newClient = new T1CClient(this.connection.cfg)
                    if (!callback || typeof callback !== 'function') { callback = function () {}; }
                    callback(undefined, newClient)
                    resolve(newClient)
                } else  {
                    console.error("Unable to parse consent")
                    if (!callback || typeof callback !== 'function') { callback = function () {}; }
                    callback(new T1CLibException("814501", "No valid consent", undefined), undefined)
                    reject(new T1CLibException("814501", "No valid consent", undefined));
                }
            }, err => {
                if (!callback || typeof callback !== 'function') { callback = function () {}; }
                callback(err, undefined)
                reject(err);
            })
        });
    }


    /*NOTE: The application is responsible to copy the codeWord on the clipboard BEFORE calling this function*/
    public getImplicitConsent(
        codeWord: string,
        durationInDays?: number,
        callback?: (error?: T1CLibException, data?: T1CClient) => void
    ): Promise<T1CClient> {
        return new Promise((resolve: (value?: (PromiseLike<T1CClient> | T1CClient)) => void, reject: (reason?: any) => void) => {
            let days: number = 365;
            if (durationInDays) {
                days = durationInDays;
            }
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
                return this._getImplicitConsent(resolve, reject, codeWord, days, callback)
            } else {
                return this.connection.post(
                    this.connection.cfg.t1cApiUrl,
                    CORE_VERSION + CORE_CONSENT,
                    {
                        codeWord: codeWord,
                        durationInDays: days
                    },
                    undefined
                ).then(res => {
                    ConsentUtil.setConsent(res.data, this.connection.cfg.t1cApiUrl)
                    const parsed_response = ConsentUtil.getConsent(this.connection.cfg.t1cApiUrl)
                    if (parsed_response != null) {
                        this.connection.cfg.t1cApiPort = parsed_response.agent.apiPort;
                    } else {
                        if (!callback || typeof callback !== 'function') { callback = function () {}; }
                        callback(new T1CLibException("814501", "No valid consent", new T1CClient(this.connection.cfg)), undefined)
                        reject(new T1CLibException("814501", "No valid consent", new T1CClient(this.connection.cfg)));
                    }
                    const newClient = new T1CClient(this.connection.cfg)
                    if (!callback || typeof callback !== 'function') {callback = function () {};}
                    callback(undefined, newClient)
                    resolve(newClient)
                }, err => {
                    if (!callback || typeof callback !== 'function') {callback = function () {};}
                    callback(new T1CLibException("814500", err.description ? err.description : "No valid consent", new T1CClient(this.connection.cfg)), undefined)
                    reject(new T1CLibException("814500", err.description ? err.description : "No valid consent", new T1CClient(this.connection.cfg)));
                })
            }
        });
    }

    /**
     * Deprecated
     */
    private _getImplicitConsent(
        resolve: (value?: (PromiseLike<T1CClient> | T1CClient)) => void, reject: (reason?: any) => void,
        codeWord: string,
        durationInDays: number,
        callback?: (error?: T1CLibException, data?: T1CClient) => void
    ) {
        return this.connection.get(
            this.connection.cfg.t1cProxyUrl,
            CORE_CONSENT_IMPLICIT + "/" + codeWord,
            {ttl: durationInDays * 24 * 60 * 60},
            undefined
        ).then(res => {
            this.connection.cfg.t1cApiPort = res.data.apiPort;
            const newClient = new T1CClient(this.connection.cfg)
            if (!callback || typeof callback !== 'function') {callback = function () {};}
            callback(undefined, newClient)
            resolve(newClient)
        }, err => {
            if (!callback || typeof callback !== 'function') {callback = function () {};}
            callback(err, undefined)
            reject(err);
        })
    }

    public updateJWT(
        jwt: string,
        callback?: (error: T1CLibException, data?: T1CClient) => void
    ): Promise<T1CClient> {
        if (jwt.length <= 0) return ResponseHandler.error(new T1CLibException('121', 'JWT may not be empty'), callback)
        this.connection.cfg.t1cJwt = jwt;
        const newClient = new T1CClient(this.connection.cfg)
        return ResponseHandler.response(newClient, callback)
    }

    public info(callback?: (error: T1CLibException, data: InfoResponse) => void): Promise<InfoResponse> {
        return this.connection.get(
            this.url,
            CORE_INFO,
            undefined,
            undefined,
            callback
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

    public readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, undefined, undefined, callback);
    }

    public readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, {'cardInserted': true}, undefined, callback);
    }

    public readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, {'cardInserted': false}, undefined, callback);
    }

    public getUrl(): string {
        return this.url;
    }

    // get Lib version
    public version(): Promise<string> {
        return Promise.resolve(VERSION);
    }
}
