import {GenericT1CResponse} from '../../core/service/CoreModel';
import {Options} from '../smartcards/Card';

export interface AbstractTruststore {
  allCerts(
    filters?: string[] | Options
  ): Promise<GenericT1CResponse<TruststoreAllCertificatesResponse>>;
  rootCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  intermediateCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  authenticationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  >;
  nonRepudiationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  >;
  encryptionCertificates(): Promise<GenericT1CResponse<CertificatesResponse>>;
  getCertificate(id: string): Promise<GenericT1CResponse<TruststoreCertificate>>;

  verifyPin(body: TruststoreVerifyPinRequest): Promise<GenericT1CResponse<boolean>>;
  authenticate(
    body: TruststoreAuthenticateOrSignRequest
  ): Promise<GenericT1CResponse<TruststoreAuthenticateOrSignResponse>>;
  sign(
    body: TruststoreAuthenticateOrSignRequest,
    bulk?: boolean
  ): Promise<GenericT1CResponse<TruststoreAuthenticateOrSignResponse>>;
  allAlgoRefs(): Promise<GenericT1CResponse<string>>;
  resetBulkPin(): Promise<GenericT1CResponse<boolean>>;
}

export interface TruststoreAllCertificatesResponse {
  authenticationCertificate: CertificatesResponse;
  intermediateCertificates: CertificatesResponse;
  nonRepudiationCertificate: CertificatesResponse;
  rootCertificate: CertificatesResponse;
  encryptionCertificate: CertificatesResponse;
  issuerCertificate: CertificatesResponse;
}

export interface CertificatesResponse {
  certificates: Array<TruststoreCertificate>;
}

export interface TruststoreCertificate {
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

export interface TruststoreVerifyPinRequest {
  pin?: string;
  osDialog?: boolean;
  timeout?: Number;
}

export interface TruststoreAuthenticateOrSignRequest {
  pin?: string;
  data: String;
  osDialog?: boolean;
  timeout?: Number;
  id?: string;
}

export interface TruststoreAuthenticateOrSignResponse {
  data?: string;
}
