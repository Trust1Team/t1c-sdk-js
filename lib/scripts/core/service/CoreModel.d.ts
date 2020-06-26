import { T1CLibException } from '../exceptions/CoreExceptions';
import { T1CClient } from '../T1CSdk';
export interface AbstractCore {
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: T1CLibException, data: InfoResponse) => void): void | Promise<InfoResponse>;
    reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    getUrl(): string;
    checkT1cApiVersion(client: T1CClient, t1cVersion?: string): Promise<CheckT1CVersionResponse>;
    version(): Promise<string>;
}
export declare class T1CResponse {
    success: boolean;
    data: any;
    constructor(success: boolean, data: any);
}
export declare class BoolDataResponse extends T1CResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class DataResponse extends T1CResponse {
    data: string;
    success: boolean;
    constructor(data: string, success: boolean);
}
export declare class DataArrayResponse extends T1CResponse {
    data: any[];
    success: boolean;
    constructor(data: any[], success: boolean);
}
export declare class DataObjectResponse extends T1CResponse {
    data: {
        [key: string]: any;
    };
    success: boolean;
    constructor(data: {
        [key: string]: any;
    }, success: boolean);
}
export declare class InfoOS {
    architecture: String;
    os: String;
    version: String;
    constructor(architecture: String, os: String, version: String);
}
export declare class InfoJava {
    runtime: String;
    spec: String;
    java: String;
    constructor(runtime: String, spec: String, java: String);
}
export declare class InfoUser {
    timezone: String;
    country: String;
    language: String;
    home: String;
    tempDir: String;
    constructor(timezone: String, country: String, language: String, home: String, tempDir: String);
}
export declare class InfoService {
    url: String;
    apiPort: String;
    gRpcPort: String;
    constructor(url: String, apiPort: String, gRpcPort: String);
}
export declare class InfoApi {
    service: InfoService;
    activated: boolean;
    citrix: boolean;
    uid: String;
    modules: Array<String>;
    version: String;
    logLevel: String;
    constructor(service: InfoService, activated: boolean, citrix: boolean, uid: String, modules: Array<String>, version: String, logLevel: String);
}
export declare class InfoResponse {
    t1CinfoOS: InfoOS;
    t1CInfoJava: InfoJava;
    t1CInfoUser: InfoUser;
    t1CInfoAPI: InfoApi;
    constructor(t1CinfoOS: InfoOS, t1CInfoJava: InfoJava, t1CInfoUser: InfoUser, t1CInfoAPI: InfoApi);
}
export declare class T1CInfo {
    activated: boolean;
    citrix: boolean;
    managed: boolean;
    arch: string;
    os: string;
    uid: string;
    containers: T1CContainer[];
    version: string;
    constructor(activated: boolean, citrix: boolean, managed: boolean, arch: string, os: string, uid: string, containers: T1CContainer[], version: string);
}
export declare class T1CContainer {
    name: string;
    version: string;
    status: string;
    constructor(name: string, version: string, status: string);
}
export declare class T1CContainerid {
    name: string;
    constructor(name: string);
}
export declare class BrowserInfoResponse extends T1CResponse {
    data: BrowserInfo;
    success: boolean;
    constructor(data: BrowserInfo, success: boolean);
}
export declare class BrowserInfo {
    browser: {
        name: string;
        version: string;
    };
    manufacturer: string;
    os: {
        name: string;
        version: string;
        architecture: string;
    };
    ua: string;
    constructor(browser: {
        name: string;
        version: string;
    }, manufacturer: string, os: {
        name: string;
        version: string;
        architecture: string;
    }, ua: string);
}
export declare class SmartCard {
    atr?: string | undefined;
    description?: string[] | undefined;
    constructor(atr?: string | undefined, description?: string[] | undefined);
}
export declare class CardReader {
    id: string;
    name: string;
    pinpad: boolean;
    card?: SmartCard | undefined;
    constructor(id: string, name: string, pinpad: boolean, card?: SmartCard | undefined);
}
export declare class CardReadersResponse extends T1CResponse {
    data: CardReader[];
    success: boolean;
    constructor(data: CardReader[], success: boolean);
}
export declare class CertificateResponse extends T1CResponse {
    data: T1CCertificate;
    success: boolean;
    constructor(data: T1CCertificate, success: boolean);
}
export declare class CertificatesResponse extends T1CResponse {
    data: T1CCertificate[];
    success: boolean;
    constructor(data: T1CCertificate[], success: boolean);
}
export declare class T1CCertificate {
    base64: string;
    id?: string | undefined;
    constructor(base64: string, id?: string | undefined);
}
export declare class SingleReaderResponse extends T1CResponse {
    data: CardReader;
    success: boolean;
    constructor(data: CardReader, success: boolean);
}
export declare class CheckT1CVersion {
    outDated: boolean;
    downloadLink?: string | undefined;
    constructor(outDated: boolean, downloadLink?: string | undefined);
}
export declare class CheckT1CVersionResponse extends T1CResponse {
    data: CheckT1CVersion;
    success: boolean;
    constructor(data: CheckT1CVersion, success: boolean);
}
