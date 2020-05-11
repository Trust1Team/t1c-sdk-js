import { T1CLibException } from '../exceptions/CoreExceptions';
import { T1CClient } from '../T1CSdk';
export interface AbstractCore {
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: T1CLibException, data: InfoResponse) => void): void | Promise<InfoResponse>;
    infoBrowser(callback?: (error: T1CLibException | undefined, data: BrowserInfoResponse) => void): Promise<BrowserInfoResponse> | undefined;
    pollCardInserted(secondsToPollCard?: number, callback?: (error: T1CLibException, data: CardReader) => void, connectReader?: () => void, insertCard?: () => void, cardTimeout?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, callback?: (error: T1CLibException, data: CardReadersResponse) => void, connectReader?: () => void, insertCard?: () => void, cardTimeout?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, callback?: (error: T1CLibException, data: CardReadersResponse) => void, connectReader?: () => void, readerTimeout?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    getUrl(): string;
    infoBrowserSync(): BrowserInfoResponse;
    checkGclVersion(client: T1CClient, gclVersion?: string): Promise<CheckGclVersionResponse>;
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
export declare class InfoResponse extends T1CResponse {
    data: T1CInfo;
    success: boolean;
    constructor(data: T1CInfo, success: boolean);
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
    parsed?: any;
    constructor(base64: string, id?: string | undefined, parsed?: any);
}
export declare class SingleReaderResponse extends T1CResponse {
    data: CardReader;
    success: boolean;
    constructor(data: CardReader, success: boolean);
}
export declare class CheckGclVersion {
    outDated: boolean;
    downloadLink?: string | undefined;
    constructor(outDated: boolean, downloadLink?: string | undefined);
}
export declare class CheckGclVersionResponse extends T1CResponse {
    data: CheckGclVersion;
    success: boolean;
    constructor(data: CheckGclVersion, success: boolean);
}
