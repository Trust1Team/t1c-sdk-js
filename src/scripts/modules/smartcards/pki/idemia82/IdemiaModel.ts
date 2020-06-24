/**
 * @author Michallis Pashidis
 * @since 2020
 */
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse} from '../../../../core/service/CoreModel';
import {Options, ResetPinData, VerifyPinData} from '../../Card';

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

    authenticate: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>
    authenticateWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>
    signData: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>
    signDataWithEncryptedPin: (body: any, callback?: (error: T1CLibException, data: IdemiaTxResponse) => void) => Promise<IdemiaTxResponse>

    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
}

export class IdemiaAllCertsResponse extends DataObjectResponse {
    constructor(public data: IdemiaAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class IdemiaTxResponse extends DataObjectResponse {
    constructor(public data: String, public success: boolean) {
        super(data, success);
    }
}

export class IdemiaAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate) {}
}

export class IdemiaAllDataResponse extends DataObjectResponse {
    constructor(public data: IdemiaAllData, public success: boolean) {
        super(data, success);
    }
}

export class IdemiaAllData {
    constructor(public applet_info?: IdemiaAppletInfo,
                public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate, public root_certificate?: T1CCertificate) {}
}

export class IdemiaAppletInfo {
    constructor(public change_counter?: number, public name?: string, public serial?: string, public version?: string) {}
}
