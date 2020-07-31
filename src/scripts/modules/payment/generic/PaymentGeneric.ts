import {AbstractPaymentGeneric} from "./PaymentGenericModel";
import {Options, VerifyPinData} from "../../smartcards/PaymentCard";
import {DataObjectResponse, LocalConnection, T1CLibException} from "../../../..";
import {RequestHandler} from "../../../util/RequestHandler";
import {
    AllCertsResponse,
    EmvCertificateResponse,
    ReadApplicationDataResponse,
    ReadDataResponse,
    VerifyPinResponse
} from "../emv/EmvModel";


export class PaymentGeneric implements AbstractPaymentGeneric {
    static PATH_MOD_DESC = '/desc';
    static PATH_READERS = '/readers';
    static PATH_PAYMENT_APP = '/apps/payment';
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


    allCerts(module: string, aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.ALL_CERTIFICATES, aid),
            reqOptions.params
        );
    }

    iccPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ICC, aid),
            undefined,
            undefined,
            callback
        );
    }

    issuerPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.CERT_ISSUER, aid),
            undefined,
            undefined,
            callback
        );
    }

    readApplicationData(module: string, callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_APPLICATION_DATA),
            undefined,
            undefined,
            callback
        );
    }

    readData(module: string, callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.READ_DATA),
            undefined,
            undefined,
            callback
        );
    }

    verifyPin(module: string, body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse> {
        return this.connection.post(
            this.baseUrl,
            this.paymentApp(module, PaymentGeneric.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
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
