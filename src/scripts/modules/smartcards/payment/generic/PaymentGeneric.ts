import {
    AbstractPaymentGeneric,
    PaymentReadApplicationDataResponse, PaymentReadDataResponse, PaymentSignResponse, PaymentVerifyPinResponse
} from "./PaymentGenericModel";
import {
    BoolDataResponse,
    DataObjectResponse,
    LocalConnection, PaymentAllCertsResponse, PaymentCertificateResponse, PaymentSignData,
    PaymentVerifyPinData,
    T1CLibException, TokenAuthenticateOrSignData
} from "../../../../../index";
import {RequestHandler} from "../../../../util/RequestHandler";
import {Options} from "../../Card";


export class PaymentGeneric implements AbstractPaymentGeneric {
    static PATH_MOD_DESC = '/desc';
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


    allCerts(module: string, aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void): Promise<PaymentAllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.ALL_CERTIFICATES, aid),
            reqOptions.params
        );
    }

    iccPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ICC, aid),
            undefined,
            undefined,
            callback
        );
    }

    issuerPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ISSUER, aid),
            undefined,
            undefined,
            callback
        );
    }

    readApplicationData(module: string, callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_APPLICATION_DATA),
            undefined,
            undefined,
            callback
        );
    }

    readData(module: string, callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_DATA),
            undefined,
            undefined,
            callback
        );
    }

    verifyPin(module: string, body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse> {
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
    }

    resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        // @ts-ignore
        return this.connection.post(this.baseUrl, this.paymentApp(module, PaymentGeneric.RESET_BULK_PIN), null, undefined, undefined, callback);
    }

    sign(module: string, body: PaymentSignData, bulk?: boolean, callback?: (error: T1CLibException, data: PaymentSignResponse) => void): Promise<PaymentSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.SIGN),
            body,
            [this.getBulkSignQueryParams(bulk)],
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
    protected paymentApp(module: string, path?: string, aid?: string): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        suffix += PaymentGeneric.PATH_PAYMENT_APP;
        if(aid != undefined) {
            suffix += '/' + aid;
        }
        suffix += PaymentGeneric.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
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

    getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(
            this.baseUrl,
            this.baseApp(module, PaymentGeneric.PATH_MOD_DESC),
            undefined,
            undefined,
            callback
        );
    }
}
