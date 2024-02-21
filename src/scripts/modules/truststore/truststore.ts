import {LocalConnection, GenericT1CResponse, ConnectorKeyUtil} from '../../..';
import { RequestHandler } from '../../util/RequestHandler';
import {Options} from '../smartcards/Card';
import {
  AbstractTruststore,
  TruststoreAllCertificatesResponse,
  TruststoreAuthenticateOrSignRequest,
  TruststoreAuthenticateOrSignResponse,
  TruststoreCertificate,
  CertificatesResponse,
  TruststoreVerifyPinRequest,
  TruststoreAlgorithmReferenceResponse,
} from './truststoreModel';

export class Truststore implements AbstractTruststore {
  static CONTAINER_PREFIX = 'truststore';
  static GET_CERT = '/certs';
  static ALL_CERTIFICATES = '/certs-list';
  static CERT_ROOT = '/certs-root';
  static CERT_AUTHENTICATION = '/certs-authentication';
  static CERT_NON_REPUDIATION = '/certs-non-repudiation';
  static CERT_ENCRYPTION = '/certs-encryption';
  static CERT_INTERMEDIATE = '/certs-intermediate';
  static TOKEN = '/info';
  static VERIFY_PIN = '/verify-pin';
  static SIGN_DATA = '/sign';
  static AUTHENTICATE = '/authenticate';
  static SUPPORTED_ALGOS = '/supported-algorithms';
  static RESET_BULK_PIN = '/reset-bulk-pin';

  constructor(
    protected baseUrl: string,
    protected containerUrl: string,
    protected connection: LocalConnection
  ) {}

  async verifyPin(
    body: TruststoreVerifyPinRequest
  ): Promise<GenericT1CResponse<boolean>> {
    try {
      body.pin = ConnectorKeyUtil.encryptData(
        body.pin,
        this.connection.cfg.version
      );
      return await this.connection.post(
        this.baseUrl,
        this.app(Truststore.VERIFY_PIN),
        body,
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async authenticate(
    body: TruststoreAuthenticateOrSignRequest
  ): Promise<GenericT1CResponse<TruststoreAuthenticateOrSignResponse>> {
    try {
      body.pin = ConnectorKeyUtil.encryptData(
        body.pin,
        this.connection.cfg.version
      );
      return await this.connection.post(
        this.baseUrl,
        this.app(Truststore.AUTHENTICATE),
        body,
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async sign(
    body: TruststoreAuthenticateOrSignRequest,
    bulk?: boolean | undefined
  ): Promise<GenericT1CResponse<TruststoreAuthenticateOrSignResponse>> {
    try {
      body.pin = ConnectorKeyUtil.encryptData(
        body.pin,
        this.connection.cfg.version
      );
      return await this.connection.post(
        this.baseUrl,
        this.app(Truststore.SIGN_DATA),
        body,
        this.getBulkSignQueryParams(bulk),
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async allAlgoRefs(certId: string): Promise<GenericT1CResponse<TruststoreAlgorithmReferenceResponse>> {
    try {
      return this.connection.get(
        this.baseUrl,
        this.app('/certs/' + certId + Truststore.SUPPORTED_ALGOS),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async resetBulkPin(): Promise<GenericT1CResponse<boolean>> {
    try {
      return this.connection.post(
        this.baseUrl,
        this.app(Truststore.RESET_BULK_PIN),
        // @ts-ignore
        null,
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getCertificate(id: string): Promise<GenericT1CResponse<TruststoreCertificate>> {
    try {
      return await this.connection.post(
        this.baseUrl,
        this.app(Truststore.GET_CERT),
        {
          id: id
        },
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async allCerts(
    filters?: Options | string[] 
  ): Promise<GenericT1CResponse<TruststoreAllCertificatesResponse>> {
    try {
        // @ts-ignore
      const reqOptions = RequestHandler.determineOptionsWithFilter(filters);
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.ALL_CERTIFICATES),
        reqOptions.params,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async rootCertificates(): Promise<GenericT1CResponse<CertificatesResponse>> {
    try {
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.CERT_ROOT),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async intermediateCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  > {
    try {
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.CERT_INTERMEDIATE),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async authenticationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  > {
    try {
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.CERT_AUTHENTICATION),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async nonRepudiationCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  > {
    try {
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.CERT_NON_REPUDIATION),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async encryptionCertificates(): Promise<
    GenericT1CResponse<CertificatesResponse>
  > {
    try {
      return await this.connection.get(
        this.baseUrl,
        this.app(Truststore.CERT_ENCRYPTION),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected getBulkSignQueryParams(bulk?: boolean): any {
    if (bulk) {
      return {bulk: true};
    }
  }

  protected app(path?: string): string {
    let suffix = this.containerUrl;
    if (path && path.length) {
      suffix += path.startsWith('/') ? path : '/' + path;
    }
    return suffix;
  }
}
