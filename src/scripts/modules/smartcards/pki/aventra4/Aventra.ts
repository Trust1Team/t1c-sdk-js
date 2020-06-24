/**
 * @author Michallis Pashidis
 * @since 2020
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {ResetPinData, VerifyPinData, Options, OptionalPin, AuthenticateOrSignData} from '../../Card';
import {AbstractAventra} from './AventraModel';
import {RequestHandler, RequestOptions} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    DataResponse, T1CResponse
} from "../../../../core/service/CoreModel";

export class Aventra implements AbstractAventra {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static CONTAINER_PREFIX = 'aventra4';
    static RESET_PIN = '/reset-pin';
    static ALL_CERTIFICATES = '/cert-list';
    static AUTHENTICATE = '/authenticate';
    static CERT_ROOT = '/root';
    static CERT_AUTHENTICATION = '/authentication';
    static CERT_NON_REPUDIATION = '/non-repudiation';
    static CERT_ISSUER = '/issuer';
    static CERT_SIGNING = '/signing';
    static CERT_ENCRYPTION = '/encryption';
    static CERT_CITIZEN = '/citizen';
    static CERT_RRN = '/enc-cert';
    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static SUPPORTED_ALGOS = '/supported-algoritms'

    constructor(protected baseUrl: string, protected containerUrl: string,protected connection: LocalConnection, protected reader_id: string) {}

// filters
    public allDataFilters() {
        return ['applet-info', 'root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }

    public allCertFilters() {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }

    public encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public verifyPinWithEncryptedPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN), body, undefined, undefined, callback);
    }


    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allCerts(options: string[] | Options,
                    callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES), reqOptions.params)
    }

    public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public authenticateWithEncryptedPin(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    }

    public signDataWithEncryptedPin(body: AuthenticateOrSignData,
                                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    }

    protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES + certUrl), undefined);
    }

    public allData(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(), requestOptions.params);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += Aventra.PATH_TOKEN_APP + Aventra.PATH_READERS
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
