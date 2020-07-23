import {LocalConnection} from '../../../../core/client/Connection';
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
    AddressResponse, AllCertsResponse, AuthenticateResponse,
    BiometricDataResponse, PictureResponse, SignResponse,
    TokenDataResponse,
} from './EidDipladModel';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse,
} from '../../../../core/service/CoreModel';
import {RequestHandler} from '../../../../util/RequestHandler';
import {Options, AuthenticateOrSignData, VerifyPinData} from '../../TokenCard';
import {AbstractEidDiplad} from "./EidDipladModel";

export class EidDiplad implements AbstractEidDiplad {
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
            this.tokenApp(EidDiplad.ALL_DATA),
            requestOptions.params
        );
    }

    public biometric(
        callback?: (error: T1CLibException, data: BiometricDataResponse) => void
    ): Promise<BiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.RN_DATA),
            undefined,
            undefined,
            callback
        );
    }

    public address(
        callback?: (error: T1CLibException, data: AddressResponse) => void
    ): Promise<AddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.ADDRESS),
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
            this.tokenApp(EidDiplad.TOKEN),
            undefined,
            undefined,
            callback
        );
    }

    public picture(
        callback?: (error: T1CLibException, data: PictureResponse) => void
    ): Promise<PictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.PHOTO),
            undefined,
            undefined,
            callback
        );
    }

    public rootCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.CERT_ROOT),
            undefined,
            undefined,
            callback
        );
    }

    public intermediateCertificates(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.CERT_INTERMEDIATE),
            undefined,
            undefined,
            callback
        );
    }

    public authenticationCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.CERT_AUTHENTICATION),
            undefined,
            undefined,
            callback
        );
    }

    public nonRepudiationCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.CERT_NON_REPUDIATION),
            undefined,
            undefined,
            callback
        );
    }

    public encryptionCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.CERT_ENCRYPTION),
            undefined,
            undefined,
            callback
        );
    }

    public allAlgoRefs(
        callback?: (error: T1CLibException, data: DataArrayResponse) => void
    ): Promise<DataArrayResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.SUPPORTED_ALGOS),
            undefined,
            undefined,
            callback
        );
    }

    public allCerts(
        options: string[] | Options,
        callback?: (error: T1CLibException, data: AllCertsResponse) => void
    ): Promise<AllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidDiplad.ALL_CERTIFICATES),
            reqOptions.params
        );
    }

    public verifyPin(
        body: VerifyPinData,
        callback?: (error: T1CLibException, data: T1CResponse) => void
    ): Promise<T1CResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidDiplad.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
    }

    public authenticate(
        body: AuthenticateOrSignData,
        callback?: (error: T1CLibException, data: AuthenticateResponse) => void
    ): Promise<AuthenticateResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidDiplad.AUTHENTICATE),
            body,
            undefined,
            undefined,
            callback
        );
    }


    public sign(
        body: AuthenticateOrSignData,
        callback?: (error: T1CLibException, data: SignResponse) => void
    ): Promise<SignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidDiplad.SIGN_DATA),
            body,
            undefined,
            undefined,
            callback
        );
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += EidDiplad.PATH_TOKEN_APP + EidDiplad.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
