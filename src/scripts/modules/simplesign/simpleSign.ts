import {LocalConnection, GenericT1CResponse, ConnectorKeyUtil} from '../../..';
import { RequestHandler } from '../../util/RequestHandler';
import {
  AbstractSimpleSign,
  SimpleSignInfoResponse,
  SimpleSignInitializeResponse,
  SimpleSignUploadFileContextRequest,
  SimpleSignUploadFileContextResponse,
} from './simpleSignModel';

export class SimpleSign implements AbstractSimpleSign {
  static CONTAINER_PREFIX = 'simplesign';
  static GET_CERT = '/certs';
  static ALL_CERTIFICATES = '/certs-list';
  static CERT_ROOT = '/certs-root';
  static CERT_AUTHENTICATION = '/certs-authentication';
  static CERT_NON_REPUDIATION = '/certs-non-repudiation';
  static CERT_ENCRYPTION = '/certs-encryption';
  static CERT_INTERMEDIATE = '/certs-intermediate';
  static INFO = '/info';

  constructor(
    protected baseUrl: string,
    protected containerUrl: string,
    protected connection: LocalConnection
  ) {}

  getInfo(): Promise<GenericT1CResponse<SimpleSignInfoResponse>> {
    try {
      return this.connection.get(
        this.baseUrl,
        this.app(SimpleSign.INFO),
        undefined,
        undefined,
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  initializeContext(origin: string): Promise<GenericT1CResponse<SimpleSignInitializeResponse>> {
    try {
      return this.connection.get(
        this.baseUrl,
        this.app(SimpleSign.INFO),
        undefined,
        {
          "origin": origin
        },
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  uploadFileContext(origin: string, request: SimpleSignUploadFileContextRequest): Promise<GenericT1CResponse<SimpleSignUploadFileContextResponse>> {
    try {
      return this.connection.post(
        this.baseUrl,
        this.app(SimpleSign.INFO),
        request,
        undefined,
        {
          "origin": origin
        },
        undefined
      );
    } catch (error) {
      return Promise.reject(error);
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
