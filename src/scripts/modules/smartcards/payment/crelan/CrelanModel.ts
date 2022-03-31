import {
    BoolDataResponse,
    PaymentAllCertsResponse, PaymentCertificateResponse,
    PaymentReadApplicationDataResponse,
    PaymentReadDataResponse, PaymentSignData, PaymentSignResponse,
    PaymentVerifyPinData, PaymentVerifyPinResponse,
    T1CLibException, TokenAllCertsExtendedResponse, TokenCertificateExtendedResponse
} from "../../../../../index";
import {Options} from "../../Card";


export interface AbstractCrelan {
    readApplicationData(callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse>;
    readData(callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse>;

    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse | TokenAllCertsExtendedResponse) => void): Promise<PaymentAllCertsResponse | TokenAllCertsExtendedResponse>;
    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;

    allCertsExtended(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
    issuerPublicCertificateExtended(aid: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    iccPublicCertificateExtended(aid: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

    verifyPin(body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse>;
    sign(body: PaymentSignData, bulk?: boolean, callback?: (error: T1CLibException, data: PaymentSignResponse) => void): Promise<PaymentSignResponse>;
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
