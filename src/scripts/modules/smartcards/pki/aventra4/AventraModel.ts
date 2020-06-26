/**
 * @author Trust1Team
 * @since 2020
 */
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse} from '../../../../core/service/CoreModel';
import {AuthenticateOrSignData, ResetPinData, VerifyPinData} from '../../Card';
import {QueryParams} from '../../../../core/client/Connection';

export interface AbstractAventra {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];

    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(queryParams:QueryParams, callback?: (error: T1CLibException, data: AllDataResponse) => void): Promise<AllDataResponse>;

    allCerts(queryParams:QueryParams, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;

    authenticate: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: TxResponse) => void) => Promise<TxResponse>
    sign: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: TxResponse) => void) => Promise<TxResponse>
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
}

export class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllCerts, public success: boolean) {
        super(data, success);
    }
}

export class TxResponse extends DataObjectResponse {
    constructor(public data: String, public success: boolean) {
        super(data, success);
    }
}

export class AllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate) {}
}

export class AllDataResponse extends DataObjectResponse {
    constructor(public data: AllData, public success: boolean) {
        super(data, success);
    }
}

export class AllData {
    constructor(public applet_info?: AppletInfo,
                public authentication_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate, public root_certificate?: T1CCertificate) {}
}

export class AppletInfo {constructor(public change_counter?: number, public name?: string, public serial?: string, public version?: string) {}}
