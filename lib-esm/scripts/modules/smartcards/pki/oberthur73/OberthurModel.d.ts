import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { QueryParams } from '../../../../core/client/Connection';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { AuthenticateOrSignData, ResetPinData, VerifyPinData } from '../../Card';
export interface AbstractOberthur73 {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(queryParams: QueryParams, callback?: (error: T1CLibException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(queryParams: QueryParams, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    authenticate: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: TxResponse) => void) => Promise<TxResponse>;
    sign: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: TxResponse) => void) => Promise<TxResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}
export declare class AllCertsResponse extends DataObjectResponse {
    data: AllCerts;
    success: boolean;
    constructor(data: AllCerts, success: boolean);
}
export declare class TxResponse extends DataObjectResponse {
    data: String;
    success: boolean;
    constructor(data: String, success: boolean);
}
export declare class AllCerts {
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class AllDataResponse extends DataObjectResponse {
    data: AllData;
    success: boolean;
    constructor(data: AllData, success: boolean);
}
export declare class AllData {
    applet_info?: AppletInfo | undefined;
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(applet_info?: AppletInfo | undefined, authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class AppletInfo {
    change_counter?: number | undefined;
    name?: string | undefined;
    serial?: string | undefined;
    version?: string | undefined;
    constructor(change_counter?: number | undefined, name?: string | undefined, serial?: string | undefined, version?: string | undefined);
}
