import {LocalConnection, T1CLibException} from "../../../..";
import {
    AbstractEmv,
    AllCertsResponse,
    EmvCertificateResponse,
    ReadApplicationDataResponse,
    ReadDataResponse, VerifyPinResponse
} from "./EmvModel";
import {Options, VerifyPinData} from "../../smartcards/PaymentCard";
import {RequestHandler} from "../../../util/RequestHandler";

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

    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.ALL_CERTIFICATES, aid),
            reqOptions.params
        );
    }

    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.CERT_ICC, aid),
            undefined,
            undefined,
            callback
        );
    }

    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.CERT_ISSUER, aid),
            undefined,
            undefined,
            callback
        );
    }

    readApplicationData(callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.READ_APPLICATION_DATA),
            undefined,
            undefined,
            callback
        );
    }

    readData(callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.paymentApp(Emv.READ_DATA),
            undefined,
            undefined,
            callback
        );
    }

    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse> {
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
