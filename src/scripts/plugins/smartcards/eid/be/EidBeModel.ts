import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
  CertificateResponse,
  DataObjectResponse,
  DataResponse,
  T1CCertificate,
  T1CResponse,
} from '../../../../core/service/CoreModel';

export interface AbstractEidBE  {
  allData(
    filters: string[],
    callback?: (error: T1CLibException, data: BeidAllDataResponse) => void
  ): Promise<BeidAllDataResponse>;
  allCerts(
    filters: string[],
    callback?: (error: T1CLibException, data: BeidAllCertsResponse) => void
  ): Promise<BeidAllCertsResponse>;
  rnData(
    callback?: (error: T1CLibException, data: BeidRnDataResponse) => void
  ): Promise<BeidRnDataResponse>;
  tokenData(
    callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void
  ): Promise<BeidTokenDataResponse>;
  address(
    callback?: (error: T1CLibException, data: BeidAddressResponse) => void
  ): Promise<BeidAddressResponse>;
  picture(
    callback?: (error: T1CLibException, data: DataResponse) => void
  ): Promise<DataResponse>;
  rootCertificate(
    callback?: (error: T1CLibException, data: CertificateResponse) => void
  ): Promise<CertificateResponse>;
  citizenCertificate(
    callback?: (error: T1CLibException, data: CertificateResponse) => void
  ): Promise<CertificateResponse>;
  authenticationCertificate(
    callback?: (error: T1CLibException, data: CertificateResponse) => void
  ): Promise<CertificateResponse>;
  nonRepudiationCertificate(
    callback?: (error: T1CLibException, data: CertificateResponse) => void
  ): Promise<CertificateResponse>;
  rrnCertificate(
    callback?: (error: T1CLibException, data: CertificateResponse) => void
  ): Promise<CertificateResponse>;
  verifyPin(
    callback?: (error: T1CLibException, data: T1CResponse) => void
  ): Promise<T1CResponse>;
  verifyPinWithEncryptedPin(
    callback?: (error: T1CLibException, data: T1CResponse) => void
  ): Promise<T1CResponse>;
  tokenData(
    callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void
  ): Promise<BeidTokenDataResponse>;
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
