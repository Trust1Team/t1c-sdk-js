import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
  CertificateResponse, DataArrayResponse,
  DataObjectResponse,
  T1CCertificate,
} from '../../../../core/service/CoreModel';
import {AuthenticateOrSignData, Options} from "../../TokenCard";
import {VerifyPinData} from "../../TokenCard";

export interface AbstractEidBE {
  allData(filters: string[] | Options, callback?: (error: T1CLibException, data: AllDataResponse) => void): Promise<AllDataResponse>;
  allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
  biometric(callback?: (error: T1CLibException, data: BiometricDataResponse) => void): Promise<BiometricDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
  address(callback?: (error: T1CLibException, data: AddressResponse) => void): Promise<AddressResponse>;
  picture(callback?: (error: T1CLibException, data: PictureResponse) => void): Promise<PictureResponse>;
  rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  intermediateCertificates(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  encryptionCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
  authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: AuthenticateResponse) => void): Promise<AuthenticateResponse>;
  sign(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: SignResponse) => void): Promise<SignResponse>;
  allAlgoRefs(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>
}

export class AddressResponse extends DataObjectResponse {
  constructor(public data: AddressData, public success: boolean) {
    super(data, success);
  }
}

export class PictureResponse extends DataObjectResponse {
  constructor(public data: PictureData, public success: boolean) {
    super(data, success);
  }
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

export class SignResponse extends DataObjectResponse {
  constructor(public data: SignResponseData, public success: boolean) {
    super(data, success);
  }
}

export class SignResponseData {
  constructor(
      public data?: string
  ) {}
}

export class AuthenticateResponse extends DataObjectResponse {
  constructor(public data: AuthenticateResponseData, public success: boolean) {
    super(data, success);
  }
}

export class AuthenticateResponseData {
  constructor(
      public data?: string
  ) {}
}

export class AddressData {
  constructor(
    public municipality: string,
    public rawData: string,
    public signature: string,
    public streetAndNumber: string,
    public version: number,
    public zipcode: string
  ) {}
}

export class AllCertsResponse extends DataObjectResponse {
  constructor(public data: AllCerts, public success: boolean) {
    super(data, success);
  }
}

export class AllCerts {
  constructor(
    public authentication_certificate?: T1CCertificate,
    public citizen_certificate?: T1CCertificate,
    public non_repudiation_certificate?: T1CCertificate,
    public root_certificate?: T1CCertificate,
    public rrn_certificate?: T1CCertificate
  ) {}
}

export class AllDataResponse extends DataObjectResponse {
  constructor(public data: AllData, public success: boolean) {
    super(data, success);
  }
}


export class AllData {
  constructor(
    public picture?: PictureData,
    public biometric?: BiometricData,
    public address?: AddressData,
  ) {}
}

export class PictureData {
  constructor(
      public picture?: string,
      public signature?: string,
      public width?: number,
      public height?: number,
  ) {}
}

export class TokenData {
  constructor(
      public rawData?: string,
      public version?: string,
      public serialNumber?: string,
      public label?: string,
      public prnGeneration?: string,
      public eidCompliant?: string,
      public graphicalPersoVersion?: string,
      public versionRfu?: string,
      public electricalPersoVersion?: string,
      public electricalPersoInterfaceVersion?: string,
      public changeCounter?: number,
      public activated?: string,
  ) {}
}

export class TokenDataResponse extends DataObjectResponse {
  constructor(public data: TokenData, public success: boolean) {
    super(data, success);
  }
}

export class BiometricData {
  constructor(
    public birthDate: string,
    public birthLocation: string,
    public cardDeliveryMunicipality: string,
    public cardNumber: string,
    public cardValidityDateBegin: string,
    public cardValidityDateEnd: string,
    public chipNumber: string,
    public documentType: string,
    public firstNames: string,
    public name: string,
    public nationalNumber: string,
    public nationality: string,
    public nobleCondition: string,
    public pictureHash: string,
    public rawData: string,
    public sex: string,
    public signature: string,
    public specialStatus: string,
    public thirdName: string,
    public version: number
  ) {}
}

export class BiometricDataResponse extends DataObjectResponse {
  constructor(public data: BiometricData, public success: boolean) {
    super(data, success);
  }
}


