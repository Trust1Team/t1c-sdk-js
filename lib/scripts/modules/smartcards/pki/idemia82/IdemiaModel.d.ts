import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { Options, ResetPinData, VerifyPinData } from '../../Card';
export interface AbstractIdemia {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: T1CLibException, data: IdemiaAllDataResponse) => void): Promise<IdemiaAllDataResponse>;
    allCerts(filters: string[], callback?: (error: T1CLibException, data: IdemiaAllCertsResponse) => void): Promise<IdemiaAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    authenticate: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>;
    authenticateWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>;
    signData: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>;
    signDataWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}
export declare class IdemiaAllCertsResponse extends DataObjectResponse {
    data: IdemiaAllCerts;
    success: boolean;
    constructor(data: IdemiaAllCerts, success: boolean);
}
export declare class IdemiaTxResponse extends DataObjectResponse {
    data: String;
    success: boolean;
    constructor(data: String, success: boolean);
}
export declare class IdemiaAllCerts {
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class IdemiaAllDataResponse extends DataObjectResponse {
    data: IdemiaAllData;
    success: boolean;
    constructor(data: IdemiaAllData, success: boolean);
}
export declare class IdemiaAllData {
    applet_info?: IdemiaAppletInfo | undefined;
    authentication_certificate?: T1CCertificate | undefined;
    encryption_certificate?: T1CCertificate | undefined;
    issuer_certificate?: T1CCertificate | undefined;
    signing_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    constructor(applet_info?: IdemiaAppletInfo | undefined, authentication_certificate?: T1CCertificate | undefined, encryption_certificate?: T1CCertificate | undefined, issuer_certificate?: T1CCertificate | undefined, signing_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined);
}
export declare class IdemiaAppletInfo {
    change_counter?: number | undefined;
    name?: string | undefined;
    serial?: string | undefined;
    version?: string | undefined;
    constructor(change_counter?: number | undefined, name?: string | undefined, serial?: string | undefined, version?: string | undefined);
}
