/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {AbstractCertigna} from './CertignaModel';
import {LocalConnection} from '../../../../../core/client/Connection';
import {
    TokenCertificateResponse,
    TokenInfoResponse,
    BoolDataResponse,
    TokenAllCertsExtendedResponse,
    TokenAllCertsResponse,
    TokenCertificateExtendedResponse,
    TokenValidateSignatureRequest, TokenValidateSignatureResponse
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
import {Pinutil} from "../../../../../../index";

const semver = require('semver');

export class Certigna implements AbstractCertigna {
    static CONTAINER_PREFIX = 'certigna';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';

    static INFO = '/info';

    static ALL_CERTIFICATES = '/cert-list';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';

    static VALIDATE_SIGNATURE = '/validate';

    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static AUTHENTICATE = '/authenticate';
    static RESET_PIN = '/reset-pin';

    static TOKEN_INFO = '/info'

    static RESET_BULK_PIN = "/reset-bulk-pin"

    static SUPPORTED_ALGOS = '/supported-algorithms'

    constructor(protected baseUrl: string, protected containerUrl: string, protected connection: LocalConnection, protected reader_id: string) {
    }

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        return this.connection.post(this.baseUrl, this.tokenApp(Certigna.VALIDATE_SIGNATURE, true), body,  undefined, undefined, callback);
    }

    public tokenData(callback?: ((error: T1CLibException, data: TokenInfoResponse) => void) | undefined): Promise<TokenInfoResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(Certigna.TOKEN_INFO, true),
          undefined,
          undefined,
          callback
        );
    }

    public authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Certigna.CERT_AUTHENTICATION, parseCerts, callback);
    }

    public nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Certigna.CERT_NON_REPUDIATION, parseCerts, callback);
    }


    public authenticationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Certigna.CERT_AUTHENTICATION, parseCerts, callback);
    }

    public nonRepudiationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Certigna.CERT_NON_REPUDIATION, parseCerts, callback);
    }

    public allCertsExtended(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Certigna.ALL_CERTIFICATES, true), filters, undefined, callback).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }


    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Certigna.VERIFY_PIN, true), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Certigna.SUPPORTED_ALGOS, true), undefined, undefined, callback);
    }

    public allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Certigna.ALL_CERTIFICATES, true), filters, undefined, callback)
          .then((res: TokenAllCertsResponse | TokenAllCertsExtendedResponse) => {
              if (res instanceof TokenAllCertsResponse) {
                  return CertParser.processTokenAllCertificates(res, parseCerts, callback)
              } else {
                  return CertParser.processTokenAllCertificates36(res, parseCerts, callback)
              }
          }).catch(error => {
              return ResponseHandler.error(error, callback);
          });
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Certigna.AUTHENTICATE, true), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Certigna.SIGN_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

protected getCertificate(certUrl: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    protected getCertificateExtended(certUrl: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.gte(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.tokenApp(Certigna.RESET_BULK_PIN, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.tokenApp(Certigna.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Certigna.PATH_TOKEN_APP
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Certigna.PATH_READERS + '/' + this.reader_id;
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
