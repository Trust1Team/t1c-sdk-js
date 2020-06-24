/**
 * @author Michallis Pashidis
 * @since 2020
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {ResetPinData, VerifyPinData, Options, OptionalPin, AuthenticateOrSignData} from '../../Card';
import {AbstractOberthur73} from './OberthurModel';
import {RequestHandler, RequestOptions} from '../../../../util/RequestHandler';
import {LocalConnection, RequestBody} from '../../../../core/client/Connection';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    DataResponse, T1CResponse
} from "../../../../core/service/CoreModel";

export class Oberthur implements AbstractOberthur73 {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static CONTAINER_PREFIX = 'oberthur_73';
    static RESET_PIN = '/reset-pin';
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
        return ['applet-info', 'root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }

    public allCertFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'encryption_certificate', 'issuer_certificate', 'nonRepudiationCertificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }

    public encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public verifyPinWithEncryptedPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.RESET_PIN), body, undefined, undefined, callback);
    }


    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allCerts(options: string[] | Options,
                    callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.ALL_CERTIFICATES), reqOptions.params)
    }

    public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public authenticateWithEncryptedPin(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.SIGN_DATA), body, undefined, undefined, callback);
    }

    public signDataWithEncryptedPin(body: AuthenticateOrSignData,
                                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.SIGN_DATA), body, undefined, undefined, callback);
    }

    protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined);
    }

    public allData(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(), requestOptions.params);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += Oberthur.PATH_TOKEN_APP + Oberthur.PATH_READERS
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
