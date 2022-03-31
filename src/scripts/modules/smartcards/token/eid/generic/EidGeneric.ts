import {LocalConnection, RequestHeaders} from '../../../../../core/client/Connection';
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    AbstractEidGeneric,
    TokenAddressResponse, TokenAuthenticateResponse,
    TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
    TokenDataResponse, TokenAlgorithmReferencesResponse,
} from './EidGenericModel';
import {
    BoolDataResponse,
    TokenCertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse, TokenAllCertsResponse, TokenAllCertsExtendedResponse, TokenCertificateExtendedResponse
} from "../../../../../core/service/CoreModel";
import {RequestHandler} from '../../../../../util/RequestHandler';
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from '../../TokenCard';
import {Options} from "../../../Card";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";
import {PinType, Pinutil} from "../../../../../..";

const semver = require('semver');

export class EidGeneric implements AbstractEidGeneric {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ISSUER = '/issuer-cert';
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
    static RESET_BULK_PIN = "/reset-bulk-pin"

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string,
        protected pin?: string,
        protected pinType?: PinType
    ) {
    }

    // by default using Pace-PIN
    private static EncryptedHeader(code?: string, pinType?: PinType): RequestHeaders | undefined {
        if (code && pinType) {
            if (pinType === PinType.CAN) {
                // @ts-ignore
                return {'X-Pace-Can': Pinutil.encryptPin(code)};
            } else {
                // @ts-ignore
                return {'X-Pace-Pin': Pinutil.encryptPin(code)};
            }
        } else {
            return undefined;
        }
    }

    public allData(module: string, options?: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        // @ts-ignore
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_DATA, true),
            requestOptions.params,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public biometric(module: string, callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.BIOMETRIC, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public address(module: string, callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ADDRESS, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public tokenData(module: string, callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.TOKEN, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public picture(module: string, callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.PHOTO, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public rootCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ROOT, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public intermediateCertificates(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_INTERMEDIATE, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticationCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_AUTHENTICATION, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public nonRepudiationCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_NON_REPUDIATION, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public issuerCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ISSUER, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public encryptionCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ENCRYPTION, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }



    public rootCertificateExtended(
      module: string,
      parseCerts?: boolean,
      callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
    ): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_ROOT, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public intermediateCertificatesExtended(
      module: string,
      parseCerts?: boolean,
      callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
    ): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_INTERMEDIATE, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticationCertificateExtended(
      module: string,
      parseCerts?: boolean,
      callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
    ): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_AUTHENTICATION, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public nonRepudiationCertificateExtended(
      module: string,
      parseCerts?: boolean,
      callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
    ): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_NON_REPUDIATION, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public encryptionCertificateExtended(
      module: string,
      parseCerts?: boolean,
      callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
    ): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_ENCRYPTION, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public issuerCertificateExtended(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.CERT_ISSUER, true),
          undefined,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public allCertsExtended(
      module: string,
      parseCerts?: boolean,
      options?: string[] | Options,
      callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void
    ): Promise<TokenAllCertsExtendedResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
          this.baseUrl,
          this.tokenApp(module, EidGeneric.ALL_CERTIFICATES, true),
          reqOptions.params,
          EidGeneric.EncryptedHeader(this.pin, this.pinType),
          callback
        ).then((res: TokenAllCertsExtendedResponse ) => {
            return CertParser.processExtendedTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }


    public allAlgoRefs(module: string, callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SUPPORTED_ALGOS, true),
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public allCerts(module: string, parseCerts?: boolean, options?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_CERTIFICATES, true),
            reqOptions.params,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        ).then((res: TokenAllCertsResponse | TokenAllCertsExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenAllCertificates(<TokenAllCertsResponse>res, parseCerts, callback)
            } else {
                return CertParser.processTokenAllCertificates36(<TokenAllCertsExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public verifyPin(module: string, body: TokenVerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.VERIFY_PIN, true),
            body,
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }

    public authenticate(module: string, body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.AUTHENTICATE, true),
            body,
            undefined,
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }


    public sign(module: string, body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SIGN_DATA, true),
            body,
             this.getBulkSignQueryParams(bulk),
            EidGeneric.EncryptedHeader(this.pin, this.pinType),
            callback
        );
    }


    resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.RESET_BULK_PIN, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.tokenApp(module, EidGeneric.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    // resolves the reader_id in the base URL
    protected tokenApp(module: string, path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        suffix += EidGeneric.PATH_TOKEN_APP;
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += EidGeneric.PATH_READERS + '/' + this.reader_id;
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


     protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }

}
