import {LocalConnection} from '../../../../core/client/Connection';
import {T1CLibException} from "../../../../core/exceptions/CoreExceptions";
import {
  AbstractEidBE,
  BeidAddressResponse,
  BeidRnDataResponse,
  BeidTokenDataResponse
} from "./EidBeModel";
import {
  CertificateResponse,
  DataArrayResponse,
  DataObjectResponse,
  DataResponse, T1CResponse,
} from "../../../../core/service/CoreModel";
import {RequestHandler, RequestOptions} from "../../../../util/RequestHandler";
import {Options, OptionalPin, AuthenticateOrSignData} from "../../Card";

export class EidBe implements AbstractEidBE{
  static PATH_TOKEN_APP = '/apps/token';
  static PATH_READERS = '/readers';
  static CONTAINER_PREFIX = 'beid';
  static ALL_DATA = '/all-data';
  static ALL_CERTIFICATES = '/certificates';
  static AUTHENTICATE = '/authenticate';
  static CERT_ROOT = '/root';
  static CERT_AUTHENTICATION = '/authentication';
  static CERT_NON_REPUDIATION = '/non-repudiation';
  static CERT_ISSUER = '/issuer';
  static CERT_SIGNING = '/signing';
  static CERT_ENCRYPTION = '/encryption';
  static CERT_CITIZEN = '/citizen';
  static CERT_RRN = '/rrn';
  static SIGN_DATA = '/sign';
  static RN_DATA = '/rn';
  static ADDRESS = '/address';
  static PHOTO = '/picture';
  static TOKEN = '/token';
  static VERIFY_PIN = '/verify-pin';
  static VERIFY_PRIV_KEY_REF = 'non-repudiation';
  static SUPPORTED_ALGOS = '/supported-algoritms'

  constructor(protected baseUrl: string, protected containerUrl: string,protected connection: LocalConnection, protected reader_id: string) {}

  public allData(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
    // @ts-ignore
    const requestOptions = RequestHandler.determineOptionsWithFilter(options);
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ALL_DATA), requestOptions.params)
  }

  public rnData(callback?: (error: T1CLibException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.RN_DATA), undefined, undefined, callback);
  }

  public address(callback?: (error: T1CLibException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ADDRESS), undefined, undefined, callback);
  }

  public tokenData(callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.TOKEN), undefined, undefined, callback);
  }

  public picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.PHOTO), undefined, undefined, callback);
  }

  public rootCertificate(options: Options,
                         callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
    return this.getCertificate(EidBe.CERT_ROOT, RequestHandler.determineOptions(options, callback));
  }

  public citizenCertificate(options: Options,
                            callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
    return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler.determineOptions(options, callback));
  }

  public authenticationCertificate(options: Options,
                                   callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
    return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
  }

  public nonRepudiationCertificate(options: Options,
                                   callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
    return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
  }

  public rrnCertificate(options: Options,
                        callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
    return this.getCertificate(EidBe.CERT_RRN, RequestHandler.determineOptions(options, callback));
  }

  public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.SUPPORTED_ALGOS), undefined, undefined, callback);
  }

  public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.SUPPORTED_ALGOS), undefined, undefined, callback);
  }

  public allCerts(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
    // @ts-ignore
    const reqOptions = RequestHandler.determineOptionsWithFilter(options);
    return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ALL_CERTIFICATES), reqOptions.params)
  }

  public verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
      return this.connection.post(this.baseUrl, this.tokenApp(EidBe.VERIFY_PIN), body, undefined, undefined, callback);
  }

  public verifyPinWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
    return this.connection.post(this.baseUrl, this.tokenApp(EidBe.VERIFY_PIN), body, undefined, undefined, callback);
  }

  public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
    if (body.algorithm) body.algorithm = body.algorithm.toLocaleLowerCase();
    return this.connection.post(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), body, undefined, undefined, callback);
  }

  public authenticateWithEncryptedPin(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
    body.algorithm = body.algorithm.toLocaleLowerCase();
    return this.connection.post(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), body, undefined, undefined, callback);
  }

  public signData(body: AuthenticateOrSignData,
                  callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
    body.algorithm = body.algorithm.toLocaleLowerCase();
    return this.connection.post(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), body, undefined, undefined, callback);
  }

  public signDataWithEncryptedPin(body: AuthenticateOrSignData,
                                  callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
    body.algorithm = body.algorithm.toLocaleLowerCase();
    return this.connection.post(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), body, undefined, undefined, callback);
  }

  protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse> {
    let self = this;
    return self.connection.get(this.baseUrl, self.tokenApp(EidBe.ALL_CERTIFICATES + certUrl));
  }

  // resolves the reader_id in the base URL
  protected tokenApp(path?: string): string {
    let suffix = this.containerUrl;
    suffix += EidBe.PATH_TOKEN_APP + EidBe.PATH_READERS
    if (this.reader_id && this.reader_id.length) {
      suffix += '/' + this.reader_id;
    }
    if (path && path.length) {
      suffix += path.startsWith('/') ? path : '/' + path;
    }
    return suffix;
  }
}
