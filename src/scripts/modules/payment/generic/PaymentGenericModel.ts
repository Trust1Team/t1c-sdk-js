import {Options, VerifyPinData} from "../../smartcards/PaymentCard";
import {DataObjectResponse, T1CLibException} from "../../../..";


export interface AbstractPaymentGeneric {
  allCerts(module: string, aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
  readApplicationData(module: string, callback?: (error: T1CLibException, data: ReadApplicationDataResponse) => void): Promise<ReadApplicationDataResponse>;
  readData(module: string, callback?: (error: T1CLibException, data: ReadDataResponse) => void): Promise<ReadDataResponse>;
  issuerPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
  iccPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
  verifyPin(module: string, body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
  getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
}

export class ModuleDescriptionResponse extends DataObjectResponse {
  constructor(public data: ModuleDescription, public success: boolean) {
    super(data, success);
  }
}

export class ModuleDescription {
  constructor(
      public desc: string
  ) {}
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
      public issuerPublicCertificate?: PaymentCertificate,
      public iccPublicCertificate?: PaymentCertificate,
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

export class PaymentCertificateResponse extends DataObjectResponse {
  constructor(public data: PaymentCertificate, public success: boolean) {
    super(data, success);
  }
}

export class PaymentCertificate {
  constructor(certificate?: string,
              exponent?: string,
              remainder?: string) {}
}

