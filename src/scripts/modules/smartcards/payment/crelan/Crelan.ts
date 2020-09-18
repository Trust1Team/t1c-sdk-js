import {
    BoolDataResponse,
    LocalConnection, PaymentAllCertsResponse, PaymentCertificateResponse, PaymentReadApplicationDataResponse,
    PaymentReadDataResponse, PaymentSignData, PaymentSignResponse,
    PaymentVerifyPinResponse,
    T1CLibException, TokenAuthenticateOrSignData
} from "../../../../../index";
import {
    AbstractCrelan
} from "./CrelanModel";
import {PaymentVerifyPinData} from "../PaymentCard";
import {RequestHandler} from "../../../../util/RequestHandler";
import {Options} from "../../Card";

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

    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void): Promise<PaymentAllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Crelan.ALL_CERTIFICATES, aid, true),
            reqOptions.params
        );
    }

    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Crelan.CERT_ICC, aid, true),
            undefined,
            undefined,
            callback
        );
    }

    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Crelan.CERT_ISSUER, aid, true),
            undefined,
            undefined,
            callback
        );
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
        // @ts-ignore
        return this.connection.post(this.baseUrl, this.paymentApp(Crelan.RESET_BULK_PIN, undefined, false), null, undefined, undefined, callback);
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
