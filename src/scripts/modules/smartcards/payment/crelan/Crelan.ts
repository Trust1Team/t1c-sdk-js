import {
    BoolDataResponse,
    LocalConnection, PaymentAllCertsResponse, PaymentCertificateResponse, PaymentReadApplicationDataResponse,
    PaymentReadDataResponse, PaymentSignData, PaymentSignResponse,
    PaymentVerifyPinResponse, Pinutil,
    T1CLibException, TokenAllCertsExtendedResponse, TokenAuthenticateOrSignData, TokenCertificateExtendedResponse
} from "../../../../../index";
import {
    AbstractCrelan
} from "./CrelanModel";
import {PaymentVerifyPinData} from "../PaymentCard";
import {RequestHandler} from "../../../../util/RequestHandler";
import {Options} from "../../Card";
import { CertParser } from "../../../../util/CertParser";
import { ResponseHandler } from "../../../../util/ResponseHandler";

const semver = require('semver');

export class Crelan implements AbstractCrelan {
    static PATH_PAYMENT_APP = '/apps/payment';
    static PATH_READERS = '/readers';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ICC = '/icc-cert';
    static READ_DATA = '/data';
    static READ_APPLICATION_DATA = '/application-data';
    static VERIFY_PIN = '/verify-pin';
    static SIGN = '/sign';
    static RESET_BULK_PIN = '/reset-bulk-pin';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    allCertsExtended(aid: string, filters: string[] | Options, callback?: ((error: T1CLibException, data: TokenAllCertsExtendedResponse) => void) | undefined): Promise<TokenAllCertsExtendedResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.ALL_CERTIFICATES, aid),
          reqOptions.params,
          callback
        ).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, false, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse | TokenAllCertsExtendedResponse) => void): Promise<PaymentAllCertsResponse | TokenAllCertsExtendedResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.ALL_CERTIFICATES, aid),
          reqOptions.params,
          callback
        ).then((res: PaymentAllCertsResponse | TokenAllCertsExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentAllCertificates(<PaymentAllCertsResponse>res, false, callback)
            } else {
                return CertParser.processPaymentAllCertificates36(<TokenAllCertsExtendedResponse>res, false, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.CERT_ICC, aid),
          undefined,
          undefined,
          callback
        ).then((res: PaymentCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentCertificate(<PaymentCertificateResponse>res, false, callback)
            } else {
                return CertParser.processPaymentCertificate36(<TokenCertificateExtendedResponse>res, false, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.CERT_ISSUER, aid),
          undefined,
          undefined,
          callback
        ).then((res: PaymentCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processPaymentCertificate(<PaymentCertificateResponse>res, false, callback)
            } else {
                return CertParser.processPaymentCertificate36(<TokenCertificateExtendedResponse>res, false, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    iccPublicCertificateExtended(aid: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.CERT_ICC, aid),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, false, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    issuerPublicCertificateExtended(aid: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Crelan.CERT_ISSUER, aid),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, false, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    readApplicationData(callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Crelan.READ_APPLICATION_DATA, undefined, true),
            undefined,
            undefined,
            callback
        );
    }

    readData(callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Crelan.READ_DATA, undefined, true),
            undefined,
            undefined,
            callback
        );
    }

    verifyPin(body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse> {
        body.pin = Pinutil.encryptPin(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(Crelan.VERIFY_PIN, undefined, true),
            body,
            undefined,
            undefined,
            callback
        );
    }

    sign(body: PaymentSignData, bulk?: boolean, callback?: (error: T1CLibException, data: PaymentSignResponse) => void): Promise<PaymentSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(Crelan.SIGN, undefined, true),
            body,
             this.getBulkSignQueryParams(bulk),
            undefined,
            callback
        );
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.gte(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.paymentApp(Crelan.RESET_BULK_PIN, undefined, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.paymentApp(Crelan.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

     protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }



    // resolves the reader_id in the base URL
    protected paymentApp(path?: string, aid?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Crelan.PATH_PAYMENT_APP;
        if(aid != undefined) {
            suffix += '/' + aid;
        }
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Crelan.PATH_READERS + '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
