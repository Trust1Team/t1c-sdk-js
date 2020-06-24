import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { Options, ResetPinData, VerifyPinData } from '../../Card';
export interface AbstractOberthur73 {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: T1CLibException, data: AventraAllDataResponse) => void): Promise<AventraAllDataResponse>;
    allCerts(filters: string[], callback?: (error: T1CLibException, data: AventraAllCertsResponse) => void): Promise<AventraAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    authenticate: (body: any, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>;
    authenticateWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>;
    signData: (body: any, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>;
    signDataWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}
export declare class AventraAllCertsResponse extends DataObjectResponse {
    data: AventraAllCerts;
    success: boolean;
    constructor(data: AventraAllCerts, success: boolean);
}
export declare class AventraTxResponse extends DataObjectResponse {
    data: String;
    success: boolean;
    constructor(data: String, success: boolean);
}
export declare class AventraAllCerts {
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class AventraAllDataResponse extends DataObjectResponse {
    data: AventraAllData;
    success: boolean;
    constructor(data: AventraAllData, success: boolean);
}
export declare class AventraAllData {
    applet_info?: AventraAppletInfo | undefined;
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(applet_info?: AventraAppletInfo | undefined, authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class AventraAppletInfo {
    change_counter?: number | undefined;
    name?: string | undefined;
    serial?: string | undefined;
    version?: string | undefined;
    constructor(change_counter?: number | undefined, name?: string | undefined, serial?: string | undefined, version?: string | undefined);
}
