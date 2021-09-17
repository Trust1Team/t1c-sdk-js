/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {AbstractAventra} from './AventraModel';
import {LocalConnection} from '../../../../../core/client/Connection';
import {
    BoolDataResponse, TokenAllCertsResponse,
    TokenCertificateResponse,
} from "../../../../../core/service/CoreModel";
import {
    TokenAuthenticateResponse,
    TokenSignResponse,
    TokenDataResponse, TokenVerifyPinResponse, TokenAlgorithmReferencesResponse, TokenResetPinResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenResetPinData, TokenVerifyPinData} from "../../TokenCard";
import {Options} from "../../../Card";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";
import {Pinutil} from "../../../../../..";

const semver = require('semver');

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

    static RESET_BULK_PIN = "/reset-bulk-pin"

    static SUPPORTED_ALGOS = '/supported-algorithms'

    constructor(protected baseUrl: string, protected containerUrl: string, protected connection: LocalConnection, protected reader_id: string) {
    }

    // filters

    public allCertFilters() {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ROOT, parseCerts, callback);
    }

    public issuerCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ISSUER, parseCerts, callback);
    }

    public authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, parseCerts, callback);
    }

    public nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_NON_REPUDIATION, parseCerts, callback);
    }

    public encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, parseCerts, callback);
    }

    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN, true), body, undefined, undefined, callback);
    }

    public resetPin(body: TokenResetPinData, callback?: (error: T1CLibException, data: TokenResetPinResponse) => void): Promise<TokenResetPinResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        // @ts-ignore
        body.puk = Pinutil.encryptPin(body.puk)
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN, true), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS, true), undefined, undefined, callback);
    }

    public allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES, true), filters, undefined, callback).then((res: TokenAllCertsResponse) => {
            return CertParser.processTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE, true), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    protected getCertificate(certUrl: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.INFO, true), undefined, undefined, callback);
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.gte(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.tokenApp(Aventra.RESET_BULK_PIN, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Aventra.PATH_TOKEN_APP
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Aventra.PATH_READERS + '/' + this.reader_id;
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
