/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {AbstractAventra} from './AventraModel';
import {LocalConnection, QueryParams} from '../../../../../core/client/Connection';
import {
    CertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    DataResponse, T1CResponse
} from "../../../../../core/service/CoreModel";
import {
    TokenAllCertsResponse,
    TokenAuthenticateResponse,
    TokenSignResponse,
    TokenDataResponse, TokenVerifyPinResponse, TokenAlgorithmReferencesResponse, TokenResetPinResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenResetPinData, TokenVerifyPinData} from "../../TokenCard";
import {Options} from "../../../Card";

export class Aventra implements AbstractAventra {
    static CONTAINER_PREFIX = 'aventra_myid_4';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';

    static INFO = '/info';

    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ENCRYPTION = '/encryption-cert';

    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static AUTHENTICATE = '/authenticate';
    static RESET_PIN = '/reset-pin';

    static SUPPORTED_ALGOS = '/supported-algorithms'

    constructor(protected baseUrl: string, protected containerUrl: string,protected connection: LocalConnection, protected reader_id: string) {}

    // filters

    public allCertFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ROOT,callback);
    }

    public issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_NON_REPUDIATION, callback);
    }

    public encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    }

    public resetPin(body: TokenResetPinData, callback?: (error: T1CLibException, data: TokenResetPinResponse) => void): Promise<TokenResetPinResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS), undefined, undefined, callback);
    }

    public allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES), filters)
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    }

    protected getCertificate(certUrl: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback);
    }

    tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.INFO), undefined);
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
