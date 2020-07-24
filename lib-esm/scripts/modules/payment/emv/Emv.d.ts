import { LocalConnection, T1CLibException } from "../../../..";
import { AbstractEmv, AllCertsResponse, EmvCertificateResponse, ReadApplicationDataResponse, ReadDataResponse, VerifyPinResponse } from "./EmvModel";
import { Options, VerifyPinData } from "../../smartcards/PaymentCard";
export declare class Emv implements AbstractEmv {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    static PATH_PAYMENT_APP: string;
    static PATH_READERS: string;
    static ALL_CERTIFICATES: string;
    static CERT_ISSUER: string;
    static CERT_ICC: string;
    static READ_DATA: string;
    static READ_APPLICATION_DATA: string;
    static VERIFY_PIN: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    readApplicationData(callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse>;
    readData(callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
    protected paymentApp(path?: string, aid?: string): string;
}
