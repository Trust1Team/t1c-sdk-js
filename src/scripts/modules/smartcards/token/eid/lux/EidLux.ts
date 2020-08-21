import {LocalConnection, RequestHeaders} from '../../../../../core/client/Connection';
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    TokenAddressResponse, TokenAllCertsResponse, TokenAuthenticateResponse,
    TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
    TokenDataResponse, TokenAlgorithmReferencesResponse,
} from '../generic/EidGenericModel';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse,
} from '../../../../../core/service/CoreModel';
import {RequestHandler} from '../../../../../util/RequestHandler';
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from '../../TokenCard';
import {Options} from "../../../Card";
import {AbstractEidLux, PinType} from "./EidLuxModel";

export class EidLux implements AbstractEidLux {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
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
        protected reader_id: string,
        protected pin: string,
        protected pinType: PinType,
    ) {
        if (!pinType) {
            this.pinType = PinType.PIN;
        }
    }

    // by default using Pace-PIN
    private static EncryptedHeader(code: string, pinType: PinType): RequestHeaders {
        if (pinType === PinType.CAN) {
            return {'X-Can': code === undefined ? '' : code};
        } else {
            return {'X-Pin': code === undefined ? '' : code};
        }
    }

    public allData(
        options: string[] | Options,
        callback?: (error: T1CLibException, data: DataObjectResponse) => void
    ): Promise<DataObjectResponse> {
        // @ts-ignore
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.ALL_DATA),
            requestOptions.params,
            EidLux.EncryptedHeader(this.pin, this.pinType)
        );
    }

    public biometric(
        callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void
    ): Promise<TokenBiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.RN_DATA),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public address(
        callback?: (error: T1CLibException, data: TokenAddressResponse) => void
    ): Promise<TokenAddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.ADDRESS),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public tokenData(
        callback?: (error: T1CLibException, data: TokenDataResponse) => void
    ): Promise<TokenDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.TOKEN),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public picture(
        callback?: (error: T1CLibException, data: TokenPictureResponse) => void
    ): Promise<TokenPictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.PHOTO),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public rootCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.CERT_ROOT),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public authenticationCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.CERT_AUTHENTICATION),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public nonRepudiationCertificate(
        callback?: (error: T1CLibException, data: CertificateResponse) => void
    ): Promise<CertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.CERT_NON_REPUDIATION),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public allAlgoRefs(
        callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void
    ): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.SUPPORTED_ALGOS),
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public allCerts(
        options: string[] | Options,
        callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void
    ): Promise<TokenAllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(EidLux.ALL_CERTIFICATES),
            reqOptions.params,
            EidLux.EncryptedHeader(this.pin, this.pinType)
        );
    }

    public verifyPin(
        body: TokenVerifyPinData,
        callback?: (error: T1CLibException, data: T1CResponse) => void
    ): Promise<T1CResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidLux.VERIFY_PIN),
            body,
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public authenticate(
        body: TokenAuthenticateOrSignData,
        callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void
    ): Promise<TokenAuthenticateResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidLux.AUTHENTICATE),
            body,
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }


    public sign(
        body: TokenAuthenticateOrSignData,
        callback?: (error: T1CLibException, data: TokenSignResponse) => void
    ): Promise<TokenSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(EidLux.SIGN_DATA),
            body,
            undefined,
            EidLux.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += EidLux.PATH_TOKEN_APP + EidLux.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
