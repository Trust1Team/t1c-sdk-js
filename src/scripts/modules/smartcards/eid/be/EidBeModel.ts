import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
  CertificateResponse,
  DataObjectResponse,
  DataResponse,
  T1CCertificate,
  T1CResponse,
} from '../../../../core/service/CoreModel';

export interface AbstractEidBE {
  allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeidAllDataResponse) => void): Promise<BeidAllDataResponse>;
  allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeidAllCertsResponse) => void): Promise<BeidAllCertsResponse>;
  rnData(callback?: (error: T1CLibException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
  address(callback?: (error: T1CLibException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse>;
  picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
  rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  citizenCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  rrnCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
  verifyPinWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
  authenticate: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) => Promise<DataResponse>;
  authenticateWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>;
  signData: (body: any, callback?: () => void) => Promise<DataResponse>;
  signDataWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>;
}

export class BeidAddressResponse extends DataObjectResponse {
  constructor(public data: BeidAddress, public success: boolean) {
    super(data, success);
  }
}

export class BeidAddress {
  constructor(
    public municipality: string,
    public raw_data: string,
    public signature: string,
    public street_and_number: string,
    public version: number,
    public zipcode: string
  ) {}
}

export class BeidAllCertsResponse extends DataObjectResponse {
  constructor(public data: BeidAllCerts, public success: boolean) {
    super(data, success);
  }
}

export class BeidAllCerts {
  constructor(
    public authentication_certificate?: T1CCertificate,
    public citizen_certificate?: T1CCertificate,
    public non_repudiation_certificate?: T1CCertificate,
    public root_certificate?: T1CCertificate,
    public rrn_certificate?: T1CCertificate
  ) {}
}

export class BeidAllDataResponse extends BeidAllCertsResponse {
  constructor(public data: BeidAllData, public success: boolean) {
    super(data, success);
  }
}

export class BeidAllData {
  constructor(
    public address?: BeidAddress,
    public authentication_certificate?: T1CCertificate,
    public citizen_certificate?: T1CCertificate,
    public non_repudiation_certificate?: T1CCertificate,
    public picture?: string,
    public rn?: BeidRnData,
    public root_certificate?: T1CCertificate,
    public rrn_certificate?: T1CCertificate,
    public token_data?: BeidTokenData
  ) {}
}

export class BeidTokenData {
  constructor(
    public eid_compliant?: number,
    public electrical_perso_interface_version?: number,
    public electrical_perso_version?: number,
    public graphical_perso_version?: number,
    public label?: string,
    public prn_generation?: string,
    public raw_data?: string,
    public serial_number?: string,
    public version?: number,
    public version_rfu?: number
  ) {}
}

export class BeidTokenDataResponse extends DataObjectResponse {
  constructor(public data: BeidTokenData, public success: boolean) {
    super(data, success);
  }
}

export class BeidRnData {
  constructor(
    public birth_date: string,
    public birth_location: string,
    public card_delivery_municipality: string,
    public card_number: string,
    public card_validity_date_begin: string,
    public card_validity_date_end: string,
    public chip_number: string,
    public document_type: string,
    public first_names: string,
    public name: string,
    public national_number: string,
    public nationality: string,
    public noble_condition: string,
    public picture_hash: string,
    public raw_data: string,
    public sex: string,
    public signature: string,
    public special_status: string,
    public third_name: string,
    public version: number
  ) {}
}

export class BeidRnDataResponse extends DataObjectResponse {
  constructor(public data: BeidRnData, public success: boolean) {
    super(data, success);
  }
}

// shared
export class OptionalPin {
  constructor(public pin?: string, public pace?: string, private_key_reference?: string ) {
  }
}

export class Options {
  constructor(public filters?: string[]) {}
}

export class AuthenticateOrSignData extends OptionalPin {
  constructor(public algorithm_reference: string, public data: string, public pin?: string, public pace?: string) {
    super(pin, pace);
  }
}
