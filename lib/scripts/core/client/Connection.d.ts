import { T1CConfig } from '../T1CConfig';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { DataArrayResponse, SingleReaderResponse } from '../../..';
export interface Connection {
    get(basePath: string | undefined, suffix: string, queryParams?: any[], headers?: undefined, callback?: ((error: T1CLibException, data: DataArrayResponse) => void) | undefined): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
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
export interface SecurityConfig {
    sendGwJwt: boolean;
    sendGclJwt: boolean;
    sendApiKey: boolean;
    sendToken: boolean;
    skipCitrixCheck: boolean;
}
export declare abstract class GenericConnection implements Connection {
    cfg: T1CConfig;
    static readonly AUTH_TOKEN_HEADER = "X-Authentication-Token";
    static readonly BROWSER_AUTH_TOKEN = "t1c-js-browser-id-token";
    static readonly RELAY_STATE_HEADER_PREFIX = "X-Relay-State-";
    static readonly HEADER_GCL_LANG = "X-Language-Code";
    constructor(cfg: T1CConfig);
    private static disabledWithoutApiKey;
    private static extractAccessToken;
    get(basePath: string, suffix: string, queryParams?: any[], headers?: any, callback?: ((error: T1CLibException, data: DataArrayResponse) => void) | ((error: T1CLibException, data: SingleReaderResponse) => void) | undefined): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers?: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    protected handleRequest(basePath: string, suffix: string, method: string, gclConfig: T1CConfig, securityConfig: SecurityConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
export declare class LocalAdminConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class LocalAuthAdminConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any>;
}
export declare class LocalAuthConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getRequestHeaders(headers?: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    postSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, body?: RequestBody, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any>;
}
export declare class LocalConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
export declare class RemoteApiKeyConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class RemoteJwtConnection extends GenericConnection implements Connection {
    cfg: T1CConfig;
    constructor(cfg: T1CConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class LocalTestConnection extends GenericConnection implements Connection {
    config: undefined;
    get(basePath: string, suffix: string, queryParams?: any[], headers?: undefined, callback?: ((error: T1CLibException, data: DataArrayResponse) => void) | undefined): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    private handleTestRequest;
}
