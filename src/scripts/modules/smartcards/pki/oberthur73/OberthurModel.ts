/**
 * @author Michallis Pashidis
 * @since 2020
 */
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import {QueryParams} from '../../../../core/client/Connection';
import {CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse} from '../../../../core/service/CoreModel';
import {AuthenticateOrSignData, ResetPinData, VerifyPinData} from '../../Card';

export interface AbstractOberthur73 {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];

    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(queryParams:QueryParams, callback?: (error: T1CLibException, data: AventraAllDataResponse) => void): Promise<AventraAllDataResponse>;

    allCerts(queryParams:QueryParams, callback?: (error: T1CLibException, data: AventraAllCertsResponse) => void): Promise<AventraAllCertsResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;

    authenticate: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>
    sign: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: AventraTxResponse) => void) => Promise<AventraTxResponse>
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
}

export class AventraAllCertsResponse extends DataObjectResponse {
    constructor(public data: AventraAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class AventraTxResponse extends DataObjectResponse {
    constructor(public data: String, public success: boolean) {
        super(data, success);
    }
}

export class AventraAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate) {}
}

export class AventraAllDataResponse extends DataObjectResponse {
    constructor(public data: AventraAllData, public success: boolean) {
        super(data, success);
    }
}

export class AventraAllData {
    constructor(public applet_info?: AventraAppletInfo,
                public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate, public root_certificate?: T1CCertificate) {}
}

export class AventraAppletInfo {
    constructor(public change_counter?: number, public name?: string, public serial?: string, public version?: string) {}
}
