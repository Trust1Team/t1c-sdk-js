import {
    AbstractPaymentGeneric,
    PaymentReadApplicationDataResponse, PaymentReadDataResponse, PaymentSignResponse, PaymentVerifyPinResponse
} from "./PaymentGenericModel";
import {
    BoolDataResponse,
    DataObjectResponse,
    LocalConnection, PaymentAllCertsResponse, PaymentCertificateResponse, PaymentSignData,
    PaymentVerifyPinData, Pinutil,
    T1CLibException, TokenAllCertsExtendedResponse, TokenAuthenticateOrSignData, TokenCertificateExtendedResponse
} from "../../../../../index";
import {RequestHandler} from "../../../../util/RequestHandler";
import {Options} from "../../Card";
import { CertParser } from "../../../../util/CertParser";
import { ResponseHandler } from "../../../../util/ResponseHandler";

const semver = require('semver');

export class PaymentGeneric implements AbstractPaymentGeneric {
    static PATH_READERS = '/readers';
    static PATH_PAYMENT_APP = '/apps/payment';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ICC = '/icc-cert';
    static READ_DATA = '/data';
    static RESET_BULK_PIN = '/reset-bulk-pin';
    static READ_APPLICATION_DATA = '/application-data';
    static VERIFY_PIN = '/verify-pin';
    static SIGN = '/sign';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    allCertsExtended(module: string, aid: string, parseCerts: boolean, filters: string[] | Options, callback?: ((error: T1CLibException, data: TokenAllCertsExtendedResponse) => void) | undefined): Promise<TokenAllCertsExtendedResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(module, PaymentGeneric.ALL_CERTIFICATES, aid, true),
          reqOptions.params,
          callback
        ).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    issuerPublicCertificateExtended(module: string, aid: string, parseCerts: boolean, callback?: ((error: T1CLibException, data: TokenCertificateExtendedResponse) => void) | undefined): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(module, PaymentGeneric.CERT_ISSUER, aid, true),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }
    iccPublicCertificateExtended(module: string, aid: string, parseCerts: boolean, callback?: ((error: T1CLibException, data: TokenCertificateExtendedResponse) => void) | undefined): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(module, PaymentGeneric.CERT_ICC, aid, true),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
                return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }


    allCerts(module: string, aid: string, parseCerts: boolean, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void): Promise<PaymentAllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.ALL_CERTIFICATES, aid, true),
            reqOptions.params,
            callback
        ).then((res: PaymentAllCertsResponse | TokenAllCertsExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentAllCertificates(<PaymentAllCertsResponse>res, parseCerts, callback)
            } else {
                return CertParser.processPaymentAllCertificates36(<TokenAllCertsExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    iccPublicCertificate(module: string, aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ICC, aid, true),
            undefined,
            undefined,
            callback
        ).then((res: PaymentCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentCertificate(<PaymentCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processPaymentCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    issuerPublicCertificate(module: string, aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ISSUER, aid, true),
            undefined,
            undefined,
            callback
        ).then((res: PaymentCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentCertificate(<PaymentCertificateResponse>res, parseCerts, callback)
            } else {
                return CertParser.processPaymentCertificate36(<TokenCertificateExtendedResponse>res, parseCerts, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    readApplicationData(module: string, callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_APPLICATION_DATA, undefined, true),
            undefined,
            undefined,
            callback
        );
    }

    readData(module: string, callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_DATA, undefined, true),
            undefined,
            undefined,
            callback
        );
    }

    verifyPin(module: string, body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.VERIFY_PIN, undefined, true),
            body,
            undefined,
            undefined,
            callback
        );
    }

    resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.paymentApp(module, PaymentGeneric.RESET_BULK_PIN, undefined, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.paymentApp(module, PaymentGeneric.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    sign(module: string, body: PaymentSignData, bulk?: boolean, callback?: (error: T1CLibException, data: PaymentSignResponse) => void): Promise<PaymentSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.SIGN, undefined, true),
            body,
             this.getBulkSignQueryParams(bulk),
            undefined,
            callback
        );
    }

     protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }

    // resolves the reader_id in the base URL
    protected paymentApp(module: string, path?: string, aid?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        suffix += PaymentGeneric.PATH_PAYMENT_APP;
        if(aid != undefined) {
            suffix += '/' + aid;
        }
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += PaymentGeneric.PATH_READERS + '/' + this.reader_id;
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
}
