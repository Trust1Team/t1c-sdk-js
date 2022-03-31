import {
    LocalConnection,
    PaymentAllCertsResponse,
    PaymentCertificateResponse,
    PaymentReadApplicationDataResponse,
    PaymentReadDataResponse,
    PaymentVerifyPinResponse,
    Pinutil,
    T1CLibException,
    TokenAllCertsExtendedResponse,
    TokenAllCertsResponse,
    TokenCertificateExtendedResponse,
    TokenCertificateResponse
} from "../../../../../index";
import {
    AbstractEmv,
} from "./EmvModel";
import {PaymentVerifyPinData} from "../PaymentCard";
import {RequestHandler} from "../../../../util/RequestHandler";
import {Options} from "../../Card";
import { CertParser } from "../../../../util/CertParser";
import { ResponseHandler } from "../../../../util/ResponseHandler";

const semver = require('semver');

export class Emv implements AbstractEmv {
    static PATH_PAYMENT_APP = '/apps/payment';
    static PATH_READERS = '/readers';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ICC = '/icc-cert';
    static READ_DATA = '/data';
    static READ_APPLICATION_DATA = '/application-data';
    static VERIFY_PIN = '/verify-pin';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    allCertsExtended(aid: string, parseCerts: boolean, filters: string[] | Options, callback?: ((error: T1CLibException, data: TokenAllCertsExtendedResponse) => void) | undefined): Promise<TokenAllCertsExtendedResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Emv.ALL_CERTIFICATES, aid),
          reqOptions.params,
          callback
        ).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    allCerts(aid: string, parseCerts: boolean, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse | TokenAllCertsExtendedResponse) => void): Promise<PaymentAllCertsResponse | TokenAllCertsExtendedResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.ALL_CERTIFICATES, aid),
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

    iccPublicCertificate(aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.CERT_ICC, aid),
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

    issuerPublicCertificate(aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.CERT_ISSUER, aid),
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

    iccPublicCertificateExtended(aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Emv.CERT_ICC, aid),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    issuerPublicCertificateExtended(aid: string, parseCerts: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(
          this.baseUrl,
          this.paymentApp(Emv.CERT_ISSUER, aid),
          undefined,
          undefined,
          callback
        ).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }


    readApplicationData(callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.READ_APPLICATION_DATA),
            undefined,
            undefined,
            callback
        );
    }

    readData(callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.READ_DATA),
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
            this.paymentApp(Emv.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
    }


    // resolves the reader_id in the base URL
    protected paymentApp(path?: string, aid?: string): string {
        let suffix = this.containerUrl;
        suffix += Emv.PATH_PAYMENT_APP;
        if(aid != undefined) {
            suffix += '/' + aid;
        }
        suffix += Emv.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
