import {
    PaymentAllCertsResponse, PaymentCertificateResponse,
    PaymentReadApplicationDataResponse,
    PaymentReadDataResponse,
    PaymentVerifyPinData, PaymentVerifyPinResponse,
    T1CLibException
} from "../../../../../index";
import {Options} from "../../Card";


export interface AbstractEmv {
    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void): Promise<PaymentAllCertsResponse>;
    readApplicationData(callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse>;
    readData(callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse>;
    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
    verifyPin(body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse>;
}
