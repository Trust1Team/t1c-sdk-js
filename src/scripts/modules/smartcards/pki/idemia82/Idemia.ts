/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {ResetPinData, VerifyPinData, AuthenticateOrSignData} from '../../Card';
import {LocalConnection, QueryParams} from '../../../../core/client/Connection';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    DataResponse, T1CResponse
} from "../../../../core/service/CoreModel";
import {AbstractIdemia} from "./IdemiaModel";

export class Idemia implements AbstractIdemia {
    static CONTAINER_PREFIX = 'idemia_cosmo_82';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static RESET_PIN = '/reset-pin';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static AUTHENTICATE = '/authenticate';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ENCRYPTION = '/encryption-cert';
    static CERT_RRN = '/encryption-cert';
    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static SUPPORTED_ALGOS = '/supported-algoritms'

    constructor(protected baseUrl: string, protected containerUrl: string,protected connection: LocalConnection, protected reader_id: string) {}

// filters
    public allDataFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    }

    public allCertFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia.CERT_ROOT,callback);
    }

    public issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia.CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia.CERT_NON_REPUDIATION, callback);
    }

    public encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia.CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.RESET_PIN), body, undefined, undefined, callback);
    }


    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allCerts(queryParams: QueryParams, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.ALL_CERTIFICATES), queryParams)
    }

    public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public sign(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.SIGN_DATA), body, undefined, undefined, callback);
    }

    protected getCertificate(certUrl: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback);
    }

    public allData(queryParams: QueryParams, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.ALL_DATA), queryParams);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += Idemia.PATH_TOKEN_APP + Idemia.PATH_READERS
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
