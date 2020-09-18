/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {Options} from '../../../Card';
import {LocalConnection} from '../../../../../core/client/Connection';
import {
    BoolDataResponse,
    TokenCertificateResponse,
    DataObjectResponse,
    T1CResponse, TokenAllCertsResponse
} from "../../../../../core/service/CoreModel";
import {AbstractIdemia} from "./IdemiaModel";
import {
    TokenAlgorithmReferencesResponse,
    TokenAuthenticateResponse,
    TokenSignResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from "../../TokenCard";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";

export class Idemia implements AbstractIdemia {
    static CONTAINER_PREFIX = 'idemia_cosmo_82';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static RESET_PIN = '/reset-pin';
    static INFO = '/info';
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
    static SUPPORTED_ALGOS = '/supported-algorithms'
    static RESET_BULK_PIN = "/reset-bulk-pin"

    constructor(protected baseUrl: string, protected containerUrl: string,protected connection: LocalConnection, protected reader_id: string) {}

    public allCertFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Idemia.CERT_ROOT,parseCerts, callback);
    }

    public issuerCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Idemia.CERT_ISSUER, parseCerts, callback);
    }

    public authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Idemia.CERT_AUTHENTICATION, parseCerts, callback);
    }

    public nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Idemia.CERT_NON_REPUDIATION, parseCerts, callback);
    }

    public encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Idemia.CERT_ENCRYPTION, parseCerts, callback);
    }

    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.VERIFY_PIN, true), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.SUPPORTED_ALGOS, true), undefined, undefined, callback);
    }

    allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.ALL_CERTIFICATES, true), filters).then((res: TokenAllCertsResponse) => {
            return CertParser.processTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.AUTHENTICATE, true), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.SIGN_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    protected getCertificate(certUrl: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public tokenData(callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.INFO, true), undefined);
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        // @ts-ignore
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.RESET_BULK_PIN, false), null, undefined, undefined, callback);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Idemia.PATH_TOKEN_APP
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Idemia.PATH_READERS + '/' + this.reader_id;
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
