import {GenericT1CResponse} from '../../core/service/CoreModel';
import {Options} from '../smartcards/Card';

export interface AbstractTruststore {
  allCerts(
    filters?: string[] | Options
  ): Promise<GenericT1CResponse<AllCertificatesResponse>>;
  rootCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  intermediateCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  authenticationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  >;
  nonRepudiationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  >;
  encryptionCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  getCertificate(id: string): Promise<GenericT1CResponse<Certificate>>;

  verifyPin(body: VerifyPinRequest): Promise<GenericT1CResponse<boolean>>;
  authenticate(
    body: AuthenticateOrSignRequest
  ): Promise<GenericT1CResponse<AuthenticateOrSignResponse>>;
  sign(
    body: AuthenticateOrSignRequest,
    bulk?: boolean
  ): Promise<GenericT1CResponse<AuthenticateOrSignResponse>>;
  allAlgoRefs(): Promise<GenericT1CResponse<string>>;
  resetBulkPin(): Promise<GenericT1CResponse<boolean>>;
}

export interface AllCertificatesResponse {
  authenticationCertificate: CertificatesResponse;
  intermediateCertificates: CertificatesResponse;
  nonRepudiationCertificate: CertificatesResponse;
  rootCertificate: CertificatesResponse;
  encryptionCertificate: CertificatesResponse;
  issuerCertificate: CertificatesResponse;
}

export interface CertificatesResponse {
  certificates: Array<Certificate>;
}

export interface Certificate {
  certificate?: string;
  certificateType?: string;
  id?: string;
  subject?: string;
  issuer?: string;
  serialNumber?: string;
  url?: string;
  hashSubPubKey?: string;
  hashIssPubKey?: string;
  exponent?: string;
  remainder?: string;
}

export interface VerifyPinRequest {
  pin?: string;
  osDialog?: boolean;
  timeout?: Number;
}

export interface AuthenticateOrSignRequest {
  pin?: string;
  data: String;
  osDialog?: boolean;
  timeout?: Number;
  id?: string;
}

export interface AuthenticateOrSignResponse {
  data?: string;
}
