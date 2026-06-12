import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {LocalConnection} from '../../../../../core/client/Connection';
import {
    TokenCertificateResponse,
    TokenInfoResponse,
    BoolDataResponse,
    TokenAllCertsExtendedResponse,
    TokenAllCertsResponse,
    TokenCertificateExtendedResponse,
    TokenValidateSignatureRequest, TokenValidateSignatureResponse, GenericT1CResponse
} from "../../../../../core/service/CoreModel";
import {
    TokenAuthenticateResponse,
    TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from "../../TokenCard";
import {Options} from "../../../Card";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";
import {ConnectorKeyUtil} from "../../../../../../index";
import {AbstractPkcs11, Pkcs11Configruation } from "./Pkcs11Model";

const semver = require('semver');

export class Pkcs11 implements AbstractPkcs11 {
    static CONTAINER_PREFIX = 'pkcs11';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';

    static INFO = '/info';

    static GET_CONFIG = '/config';
    static SET_CONFIG = '/config';
    static RESET_CONFIG = '/config/reset';

    static ALL_CERTIFICATES = '/cert-list';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';

    static TOKEN_INFO = '/info'

    static VALIDATE_SIGNATURE = '/validate';

    static SIGN_DATA = '/sign';
    static SIGN_RAW_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static AUTHENTICATE = '/authenticate';
    static RESET_PIN = '/reset-pin';

    static RESET_BULK_PIN = "/reset-bulk-pin"

    static SUPPORTED_ALGOS = '/supported-algorithms'

    constructor(protected baseUrl: string, protected containerUrl: string, protected connection: LocalConnection, protected reader_id: string) {
    }

    getConfig(callback?: (error: T1CLibException, data: Pkcs11Configruation) => void): Promise<GenericT1CResponse<Pkcs11Configruation>> {
        return this.connection.get(this.baseUrl, this.tokenApp(Pkcs11.GET_CONFIG, false), undefined, undefined, callback);
    }

    setConfig(config: Pkcs11Configruation, callback?: (error: T1CLibException, data: Pkcs11Configruation) => void): Promise<GenericT1CResponse<Pkcs11Configruation>>{
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.SET_CONFIG, false), config, undefined, undefined, callback);
    }

    resetConfig(callback?: (error: T1CLibException, data: boolean)=> void): Promise<GenericT1CResponse<boolean>> {
        return this.connection.patch(this.baseUrl, this.tokenApp(Pkcs11.RESET_CONFIG, false), undefined, undefined, undefined, callback);
    }

    sign_raw(body: TokenAuthenticateOrSignData, bulk?: boolean | undefined, callback?: ((error: T1CLibException, data: TokenSignResponse) => void) | undefined): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.SIGN_RAW_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.VALIDATE_SIGNATURE, true), body,  undefined, undefined, callback);
    }

    public tokenData(callback?: ((error: T1CLibException, data: TokenInfoResponse) => void) | undefined): Promise<TokenInfoResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(Pkcs11.TOKEN_INFO, true),
          undefined,
          undefined,
          callback
        );
    }


    public authenticationCertificate( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificate(Pkcs11.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificate(Pkcs11.CERT_NON_REPUDIATION, callback);
    }

    public allCerts( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Pkcs11.ALL_CERTIFICATES, true), filters, undefined, callback).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse> {
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.VERIFY_PIN, true), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Pkcs11.SUPPORTED_ALGOS, true), undefined, undefined, callback);
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.AUTHENTICATE, true), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.SIGN_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    protected getCertificate(certUrl: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        // @ts-ignore
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateExtendedResponse) => {
                // @ts-ignore
                return CertParser.processTokenCertificate36(res, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.gte(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.tokenApp(Pkcs11.RESET_BULK_PIN, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.tokenApp(Pkcs11.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Pkcs11.PATH_TOKEN_APP
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Pkcs11.PATH_READERS + '/' + this.reader_id;
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
