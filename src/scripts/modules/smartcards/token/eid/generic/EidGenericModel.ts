import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
  BoolDataResponse,
  TokenCertificateResponse, DataArrayResponse,
  DataObjectResponse,
  TokenAllCertsResponse,
} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {Options} from "../../../Card";

export interface AbstractEidGeneric {
  getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
  allData(module: string, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllDataResponse) => void): Promise<TokenAllDataResponse>;
  allCerts(module: string, parseCerts?: boolean,  filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
  biometric(module: string, callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse>;
  tokenData(module: string, callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
  address(module: string, callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse>;
  picture(module: string, callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse>;
  rootCertificate(module: string, parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  intermediateCertificates(module: string, parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  authenticationCertificate(module: string, parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  nonRepudiationCertificate(module: string, parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  encryptionCertificate(module: string, parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  verifyPin(module: string, body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
  authenticate(module: string, body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
  sign(module: string, body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  allAlgoRefs(module: string, callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
  resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}

export class ModuleDescriptionResponse extends DataObjectResponse {
  constructor(public data: TokenModuleDescription, public success: boolean) {
    super(data, success);
  }
}

export class TokenAddressResponse extends DataObjectResponse {
  constructor(public data: TokenAddressData, public success: boolean) {
    super(data, success);
  }
}

export class TokenPictureResponse extends DataObjectResponse {
  constructor(public data: TokenPictureData, public success: boolean) {
    super(data, success);
  }
}

export class TokenVerifyPinResponse extends DataObjectResponse {
  constructor(public data: TokenVerifyPinResponseData, public success: boolean) {
    super(data, success);
  }
}

export class TokenVerifyPinResponseData {
  constructor(
      public verified: boolean
  ) {}
}

export class TokenSignResponse extends DataObjectResponse {
  constructor(public data: TokenSignResponseData, public success: boolean) {
    super(data, success);
  }
}

export class TokenSignResponseData {
  constructor(
      public data?: string
  ) {}
}

export class TokenAuthenticateResponse extends DataObjectResponse {
  constructor(public data: TokenAuthenticateResponseData, public success: boolean) {
    super(data, success);
  }
}

export class TokenAuthenticateResponseData {
  constructor(
      public data?: string
  ) {}
}

export class TokenModuleDescription {
  constructor(
      public desc: string
  ) {}
}

export class TokenAddressData {
  constructor(
    public municipality?: string,
    public rawData?: string,
    public signature?: string,
    public streetAndNumber?: string,
    public version?: number,
    public zipcode?: string
  ) {}
}



export class TokenAllDataResponse extends DataObjectResponse {
  constructor(public data: TokenAllData, public success: boolean) {
    super(data, success);
  }
}


export class TokenAllData {
  constructor(
    public picture?: TokenPictureData,
    public biometric?: TokenBiometricData,
    public address?: TokenAddressData,
  ) {}
}

export class TokenPictureData {
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

export class TokenBiometricData {
  constructor(
    public birthDate?: string,
    public birthLocation?: string,
    public cardDeliveryMunicipality?: string,
    public cardNumber?: string,
    public cardValidityDateBegin?: string,
    public cardValidityDateEnd?: string,
    public chipNumber?: string,
    public documentType?: string,
    public firstNames?: string,
    public name?: string,
    public nationalNumber?: string,
    public nationality?: string,
    public nobleCondition?: string,
    public pictureHash?: string,
    public rawData?: string,
    public sex?: string,
    public signature?: string,
    public specialStatus?: string,
    public thirdName?: string,
    public version?: number,
    public issuer?: string
  ) {}
}

export class TokenBiometricDataResponse extends DataObjectResponse {
  constructor(public data: TokenBiometricData, public success: boolean) {
    super(data, success);
  }
}

export class TokenAlgorithmReferencesResponse {
  constructor(public data: TokenAlgorithmReferences, public success: boolean) {
  }
}

export class TokenAlgorithmReferences {
  constructor(public ref: Array<string>) {
  }
}

export class TokenResetPinResponse {
  constructor(public data: TokenResetPin, public success: boolean) {
  }
}

export class TokenResetPin {
  constructor(public verified: boolean) {
  }
}
