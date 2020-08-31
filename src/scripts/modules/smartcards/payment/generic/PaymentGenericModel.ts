import {PaymentSignData, PaymentVerifyPinData} from "../PaymentCard";
import {
  BoolDataResponse,
  DataObjectResponse,
  PaymentAllCertsResponse, PaymentCertificateResponse,
  T1CLibException,
  TokenAuthenticateOrSignData
} from "../../../../../index";
import {Options} from "../../Card";


export interface AbstractPaymentGeneric {
  allCerts(module: string, aid: string, filters: string[] | Options, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void): Promise<PaymentAllCertsResponse>;
  readApplicationData(module: string, callback?: (error: T1CLibException, data: PaymentReadApplicationDataResponse) => void): Promise<PaymentReadApplicationDataResponse>;
  readData(module: string, callback?: (error: T1CLibException, data: PaymentReadDataResponse) => void): Promise<PaymentReadDataResponse>;
  issuerPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
  iccPublicCertificate(module: string, aid: string, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void): Promise<PaymentCertificateResponse>;
  verifyPin(module: string, body: PaymentVerifyPinData, callback?: (error: T1CLibException, data: PaymentVerifyPinResponse) => void): Promise<PaymentVerifyPinResponse>;
  getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
  resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
  sign(module: string, body: PaymentSignData, bulk?: boolean, callback?: (error: T1CLibException, data: PaymentSignResponse) => void): Promise<PaymentSignResponse>;
}

export class PaymentModuleDescriptionResponse extends DataObjectResponse {
  constructor(public data: PaymentModuleDescription, public success: boolean) {
    super(data, success);
  }
}

export class PaymentModuleDescription {
  constructor(
      public desc: string
  ) {}
}


export class PaymentVerifyPinResponse extends DataObjectResponse {
  constructor(public data: PaymentVerifyPinResponseData, public success: boolean) {
    super(data, success);
  }
}

export class PaymentVerifyPinResponseData {
  constructor(
      public verified: boolean
  ) {}
}

export class PaymentReadData {
  constructor(
      public applications: Array<PaymentApplication>,
  ) {}
}

export class PaymentApplication {
  constructor(
      public aid?: string,
      public name?: string,
      public priority?: number,
  ) {}
}


export class PaymentReadDataResponse extends DataObjectResponse {
  constructor(public data: PaymentReadData, public success: boolean) {
    super(data, success);
  }
}

export class PaymentReadApplicationData {
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

export class PaymentReadApplicationDataResponse extends DataObjectResponse {
  constructor(public data: PaymentReadApplicationData, public success: boolean) {
    super(data, success);
  }
}

export class PaymentSignResponseData {
  constructor(public success: boolean, public data?: string, public cardSignature?: string, public readerSignature?: string) {
  }
}

export class PaymentSignResponse {
  constructor(public data: PaymentSignResponseData, public success: boolean) {}
}

