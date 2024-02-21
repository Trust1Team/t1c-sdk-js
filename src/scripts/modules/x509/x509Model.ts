export interface Abstractx509 {
  toPEM(input: X509CertificateRequest): Promise<string>;
  toJSON(input: X509CertificateRequest): Promise<X509ToJSONResponse>;
  subjectCN(input: X509CertificateRequest): Promise<string>;
  issuerCN(input: X509CertificateRequest): Promise<string>;
}

export class X509CertificateRequest {
  constructor(public cert: string) {}
}

export interface X509ToJSONResponse {
  version: Number;
  serial: string;
  subject: string;
  issuer: string;
}
