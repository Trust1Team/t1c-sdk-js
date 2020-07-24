import { Options, VerifyPinData } from "../../smartcards/PaymentCard";
import { DataObjectResponse, T1CLibException } from "../../../..";
export interface AbstractEmv {
    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    readApplicationData(callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse>;
    readData(callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse>;
    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
}
export declare class VerifyPinResponse extends DataObjectResponse {
    data: VerifyPinResponseData;
    success: boolean;
    constructor(data: VerifyPinResponseData, success: boolean);
}
export declare class VerifyPinResponseData {
    verified: boolean;
    constructor(verified: boolean);
}
export declare class AllCertsResponse extends DataObjectResponse {
    data: AllCerts;
    success: boolean;
    constructor(data: AllCerts, success: boolean);
}
export declare class AllCerts {
    issuerPublicCertificate?: EmvCertificate | undefined;
    iccPublicCertificate?: EmvCertificate | undefined;
    constructor(issuerPublicCertificate?: EmvCertificate | undefined, iccPublicCertificate?: EmvCertificate | undefined);
}
export declare class ReadData {
    applications: Array<Application>;
    constructor(applications: Array<Application>);
}
export declare class Application {
    aid?: string | undefined;
    name?: string | undefined;
    priority?: number | undefined;
    constructor(aid?: string | undefined, name?: string | undefined, priority?: number | undefined);
}
export declare class ReadDataResponse extends DataObjectResponse {
    data: ReadData;
    success: boolean;
    constructor(data: ReadData, success: boolean);
}
export declare class ReadApplicationData {
    constructor(country?: string, countryCode?: string, effectiveDate?: string, expirationDate?: string, language?: string, name?: string, pan?: string);
}
export declare class ReadApplicationDataResponse extends DataObjectResponse {
    data: ReadApplicationData;
    success: boolean;
    constructor(data: ReadApplicationData, success: boolean);
}
export declare class EmvCertificateResponse extends DataObjectResponse {
    data: EmvCertificate;
    success: boolean;
    constructor(data: EmvCertificate, success: boolean);
}
export declare class EmvCertificate {
    constructor(certificate?: string, exponent?: string, remainder?: string);
}
