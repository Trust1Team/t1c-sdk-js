import {Options, VerifyPinData} from "../../smartcards/PaymentCard";
import {CertificateResponse, DataObjectResponse, T1CCertificate, T1CLibException} from "../../../..";


export interface AbstractEmv {
    allCerts(aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    readApplicationData(callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse>;
    readData(callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse>;
    issuerPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    iccPublicCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
}

export class VerifyPinResponse extends DataObjectResponse {
    constructor(public data: VerifyPinResponseData, public success: boolean) {
        super(data, success);
    }
}

export class VerifyPinResponseData {
    constructor(
        public verified: boolean
    ) {}
}

export class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllCerts, public success: boolean) {
        super(data, success);
    }
}

export class AllCerts {
    constructor(
        public issuerPublicCertificate?: EmvCertificate,
        public iccPublicCertificate?: EmvCertificate,
    ) {}
}

export class ReadData {
    constructor(
        public applications: Array<Application>,
    ) {}
}

export class Application {
    constructor(
        public aid?: string,
        public name?: string,
        public priority?: number,
    ) {}
}


export class ReadDataResponse extends DataObjectResponse {
    constructor(public data: ReadData, public success: boolean) {
        super(data, success);
    }
}

export class ReadApplicationData {
    constructor(
        country?: string,
        countryCode?: string,
        effectiveDate?: string,
        expirationDate?: string,
        language?: string,
        name?: string,
        pan?: string,
    ) {}
}

export class ReadApplicationDataResponse extends DataObjectResponse {
    constructor(public data: ReadApplicationData, public success: boolean) {
        super(data, success);
    }
}

export class EmvCertificateResponse extends DataObjectResponse {
    constructor(public data: EmvCertificate, public success: boolean) {
        super(data, success);
    }
}

export class EmvCertificate {
    constructor(certificate?: string,
                exponent?: string,
                remainder?: string) {}
}
