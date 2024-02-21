import {LocalConnection, GenericT1CResponse} from '../../..';
import {
  Abstractx509,
  X509ToJSONResponse,
  X509CertificateRequest,
} from './x509Model';

export class X509 implements Abstractx509 {
  static CONTAINER_PREFIX = 'x509';

  static TOPEM = '/pem';
  static TOJSON = '/json';
  static SUBJECTCN = '/subject-cn';
  static ISSUERCN = '/issuer-cn';

  constructor(
    protected baseUrl: string,
    protected containerUrl: string,
    protected connection: LocalConnection
  ) {}

  async toPEM(input: X509CertificateRequest): Promise<string> {
    const response: GenericT1CResponse<string> = await this.connection.post(
      this.baseUrl,
      this.app(X509.TOPEM),
      input,
      undefined,
      undefined
    );
    return response.data;
  }
  async toJSON(input: X509CertificateRequest): Promise<X509ToJSONResponse> {
    const response: GenericT1CResponse<X509ToJSONResponse> =
      await this.connection.post(
        this.baseUrl,
        this.app(X509.TOJSON),
        input,
        undefined,
        undefined
      );
    return response.data;
  }
  async subjectCN(input: X509CertificateRequest): Promise<string> {
    const response: GenericT1CResponse<string> = await this.connection.post(
      this.baseUrl,
      this.app(X509.SUBJECTCN),
      input,
      undefined,
      undefined
    );
    return response.data;
  }
  async issuerCN(input: X509CertificateRequest): Promise<string> {
    const response: GenericT1CResponse<string> = await this.connection.post(
      this.baseUrl,
      this.app(X509.ISSUERCN),
      input,
      undefined,
      undefined
    );
    return response.data;
  }

  protected app(path?: string): string {
    let suffix = this.containerUrl;
    if (path && path.length) {
      suffix += path.startsWith('/') ? path : '/' + path;
    }
    return suffix;
  }
}
