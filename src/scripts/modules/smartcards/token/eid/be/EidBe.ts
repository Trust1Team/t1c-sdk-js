import {LocalConnection} from '../../../../../core/client/Connection';
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    TokenAddressResponse, TokenAuthenticateResponse,
    TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
    TokenDataResponse, TokenAlgorithmReferencesResponse,
} from '../generic/EidGenericModel';
import {
    BoolDataResponse,
    TokenCertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse, TokenAllCertsResponse,
} from '../../../../../core/service/CoreModel';
import {RequestHandler} from '../../../../../util/RequestHandler';
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from '../../TokenCard';
import {AbstractEidBE} from "./EidBeModel";
import {Options} from "../../../Card";
import {ResponseHandler} from "../../../../../util/ResponseHandler";
import {CertParser} from "../../../../../util/CertParser";

export class EidBe implements AbstractEidBE {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ENCRYPTION = '/encryption-cert';
    static CERT_INTERMEDIATE = '/intermediate-certs';
    static RN_DATA = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static TOKEN = '/info';
    static VERIFY_PIN = '/verify-pin';
    static SIGN_DATA = '/sign';
    static AUTHENTICATE = '/authenticate';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';
    static SUPPORTED_ALGOS = '/supported-algorithms';
    static RESET_BULK_PIN = "/reset-bulk-pin"

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    public allData(
        options: string[] | Options,
        callback?: (error: T1CLibException, data: DataObjectResponse) => void
    ): Promise<DataObjectResponse> {
        // @ts-ignore
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.ALL_DATA, true),
            requestOptions.params,
            callback
        );
    }

    public biometric(
        callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void
    ): Promise<TokenBiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.RN_DATA, true),
            undefined,
            undefined,
            callback
        );
    }

    public address(
        callback?: (error: T1CLibException, data: TokenAddressResponse) => void
    ): Promise<TokenAddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.ADDRESS, true),
            undefined,
            undefined,
            callback
        );
    }

    public tokenData(
        callback?: (error: T1CLibException, data: TokenDataResponse) => void
    ): Promise<TokenDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.TOKEN, true),
            undefined,
            undefined,
            callback
        );
    }

    public picture(
        callback?: (error: T1CLibException, data: TokenPictureResponse) => void
    ): Promise<TokenPictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.PHOTO, true),
            undefined,
            undefined,
            callback
        );
    }

    public rootCertificate(
        parseCerts?: boolean,
        callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
    ): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.CERT_ROOT, true),
            undefined,
            undefined,
            callback
        );
    }

    public intermediateCertificates(
        parseCerts?: boolean,
        callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
    ): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.CERT_INTERMEDIATE, true),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticationCertificate(
        parseCerts?: boolean,
        callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
    ): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.CERT_AUTHENTICATION, true),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public nonRepudiationCertificate(
        parseCerts?: boolean,
        callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
    ): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.CERT_NON_REPUDIATION, true),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public encryptionCertificate(
        parseCerts?: boolean,
        callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
    ): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.CERT_ENCRYPTION, true),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public allAlgoRefs(
        callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void
    ): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.SUPPORTED_ALGOS, true),
            undefined,
            undefined,
            callback
        );
    }

    public allCerts(
        parseCerts?: boolean,
        options?: string[] | Options,
        callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void
    ): Promise<TokenAllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidBe.ALL_CERTIFICATES, true),
            reqOptions.params,
            callback
        ).then((res: TokenAllCertsResponse) => {
            return CertParser.processTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public verifyPin(
        body: TokenVerifyPinData,
        callback?: (error: T1CLibException, data: T1CResponse) => void
    ): Promise<T1CResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidBe.VERIFY_PIN, true),
            body,
            undefined,
            undefined,
            callback
        );
    }

    public authenticate(
        body: TokenAuthenticateOrSignData,
        callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void
    ): Promise<TokenAuthenticateResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidBe.AUTHENTICATE, true),
            body,
            undefined,
            undefined,
            callback
        );
    }


    public sign(
        body: TokenAuthenticateOrSignData,
        bulk?: boolean,
        callback?: (error: T1CLibException, data: TokenSignResponse) => void
    ): Promise<TokenSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidBe.SIGN_DATA, true),
            body,
             this.getBulkSignQueryParams(bulk),
            undefined,
            callback
        );
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        // @ts-ignore
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.RESET_BULK_PIN, false), null, undefined, undefined, callback);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += EidBe.PATH_TOKEN_APP;
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += EidBe.PATH_READERS + '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }
}
