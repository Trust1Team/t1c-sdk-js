import {LocalConnection} from '../../../../core/client/Connection';
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
    AbstractEidGeneric,
    AddressResponse, AllCertsResponse, AuthenticateResponse,
    BiometricDataResponse, PictureResponse, SignResponse,
    TokenDataResponse,
} from './EidGenericModel';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse,
} from '../../../../core/service/CoreModel';
import {RequestHandler} from '../../../../util/RequestHandler';
import {Options, AuthenticateOrSignData, VerifyPinData} from '../../TokenCard';

export class EidGeneric implements AbstractEidGeneric {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_MOD_DESC = '/desc';
    static PATH_READERS = '/readers';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ENCRYPTION = '/encryption-cert';
    static CERT_INTERMEDIATE = '/intermediate-certs';
    static BIOMETRIC = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static TOKEN = '/info';
    static VERIFY_PIN = '/verify-pin';
    static SIGN_DATA = '/sign';
    static AUTHENTICATE = '/authenticate';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';
    static SUPPORTED_ALGOS = '/supported-algorithms';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    public allData(module: string, options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        // @ts-ignore
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_DATA),
            requestOptions.params
        );
    }

    public biometric(module: string, callback?: (error: T1CLibException, data: BiometricDataResponse) => void): Promise<BiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.BIOMETRIC),
            undefined,
            undefined,
            callback
        );
    }

    public address(module: string, callback?: (error: T1CLibException, data: AddressResponse) => void): Promise<AddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ADDRESS),
            undefined,
            undefined,
            callback
        );
    }

    public tokenData(module: string, callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.TOKEN),
            undefined,
            undefined,
            callback
        );
    }

    public picture(module: string, callback?: (error: T1CLibException, data: PictureResponse) => void): Promise<PictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.PHOTO),
            undefined,
            undefined,
            callback
        );
    }

    public rootCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ROOT),
            undefined,
            undefined,
            callback
        );
    }

    public intermediateCertificates(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_INTERMEDIATE),
            undefined,
            undefined,
            callback
        );
    }

    public authenticationCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_AUTHENTICATION),
            undefined,
            undefined,
            callback
        );
    }

    public nonRepudiationCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_NON_REPUDIATION),
            undefined,
            undefined,
            callback
        );
    }

    public encryptionCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ENCRYPTION),
            undefined,
            undefined,
            callback
        );
    }

    public allAlgoRefs(module: string, callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SUPPORTED_ALGOS),
            undefined,
            undefined,
            callback
        );
    }

    public allCerts(module: string, options: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_CERTIFICATES),
            reqOptions.params
        );
    }

    public verifyPin(module: string, body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
    }

    public authenticate(module: string, body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: AuthenticateResponse) => void): Promise<AuthenticateResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.AUTHENTICATE),
            body,
            undefined,
            undefined,
            callback
        );
    }


    public sign(module: string, body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: SignResponse) => void): Promise<SignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SIGN_DATA),
            body,
            undefined,
            undefined,
            callback
        );
    }

    // resolves the reader_id in the base URL
    protected tokenApp(module: string, path?: string): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        suffix += EidGeneric.PATH_TOKEN_APP + EidGeneric.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    // resolves the modules base bath
    protected baseApp(module: string, path?: string): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(
            this.baseUrl,
            this.baseApp(module, EidGeneric.PATH_MOD_DESC),
            undefined,
            undefined,
            callback
        );
    }
}
