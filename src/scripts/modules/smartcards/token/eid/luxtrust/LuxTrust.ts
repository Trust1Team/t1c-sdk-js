import { LocalConnection } from "../../../../../core/client/Connection";
import { T1CLibException } from "../../../../../core/exceptions/CoreExceptions";
import {
  TokenAuthenticateResponse,
  TokenSignResponse, TokenAlgorithmReferencesResponse
} from "../generic/EidGenericModel";
import {
  BoolDataResponse,
  TokenCertificateResponse,
  T1CResponse, TokenAllCertsResponse, TokenAllCertsExtendedResponse, TokenCertificateExtendedResponse
} from "../../../../../core/service/CoreModel";
import { RequestHandler } from "../../../../../util/RequestHandler";
import { TokenAuthenticateOrSignData, TokenVerifyPinData } from "../../TokenCard";
import { Options } from "../../../Card";
import { AbstractLuxTrust } from "./LuxTrustModel";
import { CertParser } from "../../../../../util/CertParser";
import { ResponseHandler } from "../../../../../util/ResponseHandler";
import { ConnectorKeyUtil } from "../../../../../..";

const semver = require("semver");

export class LuxTrust implements AbstractLuxTrust {
  static PATH_TOKEN_APP = "/apps/token";
  static PATH_READERS = "/readers";
  static ALL_DATA = "/all-data";
  static ALL_CERTIFICATES = "/cert-list";
  static CERT_ROOT = "/root-cert";
  static CERT_AUTHENTICATION = "/authentication-cert";
  static CERT_NON_REPUDIATION = "/nonrepudiation-cert";
  static RN_DATA = "/biometric";
  static ADDRESS = "/address";
  static PHOTO = "/picture";
  static TOKEN = "/info";
  static VERIFY_PIN = "/verify-pin";
  static SIGN_DATA = "/sign";
  static SIGN_RAW_DATA = "/sign_raw";
  static AUTHENTICATE = "/authenticate";
  static VERIFY_PRIV_KEY_REF = "non-repudiation";
  static SUPPORTED_ALGOS = "/supported-algorithms";
  static RESET_BULK_PIN = "/reset-bulk-pin";

  constructor(
    protected baseUrl: string,
    protected containerUrl: string,
    protected connection: LocalConnection,
    protected reader_id: string
  ) {
  }

  signRaw(body: TokenAuthenticateOrSignData, bulk?: boolean | undefined, callback?: ((error: T1CLibException, data: TokenSignResponse) => void) | undefined): Promise<TokenSignResponse> {
    body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
    body.base64Encoded = true;
    return this.connection.post(
      this.baseUrl,
      this.tokenApp(LuxTrust.SIGN_RAW_DATA, true),
      body,
      this.getBulkSignQueryParams(bulk),
      undefined,
      callback
    );
  }

  public rootCertificate(
    
    callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
  ): Promise<TokenCertificateResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_ROOT, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
      if (semver.lt(semver.coerce(this.connection.cfg.version).version, "3.6.0")) {
        return CertParser.processTokenCertificate(<TokenCertificateResponse>res, callback);
      } else {
        return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, callback);
      }
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public authenticationCertificate(
    
    callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
  ): Promise<TokenCertificateResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_AUTHENTICATION, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
      if (semver.lt(semver.coerce(this.connection.cfg.version).version, "3.6.0")) {
        return CertParser.processTokenCertificate(<TokenCertificateResponse>res, callback);
      } else {
        return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, callback);
      }
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public nonRepudiationCertificate(
    
    callback?: (error: T1CLibException, data: TokenCertificateResponse) => void
  ): Promise<TokenCertificateResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_NON_REPUDIATION, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
      if (semver.lt(semver.coerce(this.connection.cfg.version).version, "3.6.0")) {
        return CertParser.processTokenCertificate(<TokenCertificateResponse>res, callback);
      } else {
        return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, callback);
      }
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }


  public rootCertificateExtended(
    
    callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
  ): Promise<TokenCertificateExtendedResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_ROOT, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateExtendedResponse) => {
      return CertParser.processExtendedTokenCertificate(res, callback);
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public authenticationCertificateExtended(
    
    callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
  ): Promise<TokenCertificateExtendedResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_AUTHENTICATION, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateExtendedResponse) => {
      return CertParser.processExtendedTokenCertificate(res, callback);
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public nonRepudiationCertificateExtended(
    
    callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void
  ): Promise<TokenCertificateExtendedResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.CERT_NON_REPUDIATION, true),
      undefined,
      undefined,
      callback
    ).then((res: TokenCertificateExtendedResponse) => {
      return CertParser.processExtendedTokenCertificate(res, callback);
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public allCertsExtended(
    
    options?: string[] | Options,
    callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void
  ): Promise<TokenAllCertsExtendedResponse> {
    // @ts-ignore
    const reqOptions = RequestHandler.determineOptionsWithFilter(options);
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.ALL_CERTIFICATES, true),
      reqOptions.params,
      callback
    ).then((res: TokenAllCertsExtendedResponse) => {
      return CertParser.processExtendedTokenAllCertificates(res, callback);
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }


  public allAlgoRefs(
    callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void
  ): Promise<TokenAlgorithmReferencesResponse> {
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.SUPPORTED_ALGOS, true),
      undefined,
      undefined,
      callback
    );
  }

  public allCerts(
    
    options?: string[] | Options,
    callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void
  ): Promise<TokenAllCertsResponse> {
    // @ts-ignore
    const reqOptions = RequestHandler.determineOptionsWithFilter(options);
    return this.connection.get(
      this.baseUrl,
      this.tokenApp(LuxTrust.ALL_CERTIFICATES, true),
      reqOptions.params,
      undefined,
      callback
    ).then((res: TokenAllCertsResponse | TokenAllCertsExtendedResponse) => {
      if (semver.lt(semver.coerce(this.connection.cfg.version).version, "3.6.0")) {
        return CertParser.processTokenAllCertificates(<TokenAllCertsResponse>res, callback);
      } else {
        return CertParser.processTokenAllCertificates36(<TokenAllCertsExtendedResponse>res, callback);
      }
    }).catch(error => {
      return ResponseHandler.error(error, callback);
    });
  }

  public verifyPin(
    body: TokenVerifyPinData,
    callback?: (error: T1CLibException, data: T1CResponse) => void
  ): Promise<T1CResponse> {
    body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version);
    body.base64Encoded = true;
    return this.connection.post(
      this.baseUrl,
      this.tokenApp(LuxTrust.VERIFY_PIN, true),
      body,
      undefined,
      undefined,
      callback
    );
  }

  public authenticate(
    body: TokenAuthenticateOrSignData,
    callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void
  ): Promise<TokenAuthenticateResponse> {
    body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version);
    body.base64Encoded = true;
    return this.connection.post(
      this.baseUrl,
      this.tokenApp(LuxTrust.AUTHENTICATE, true),
      body,
      undefined,
      undefined,
      callback
    );
  }


  public sign(
    body: TokenAuthenticateOrSignData,
    bulk?: boolean,
    callback?: (error: T1CLibException, data: TokenSignResponse) => void
  ): Promise<TokenSignResponse> {
    body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version);
    body.base64Encoded = true;
    return this.connection.post(
      this.baseUrl,
      this.tokenApp(LuxTrust.SIGN_DATA, true),
      body,
      this.getBulkSignQueryParams(bulk),
      undefined,
      callback
    );
  }

  resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
    if (semver.gte(semver.coerce(this.connection.cfg.version).version, "3.5.0")) {
      return this.connection.get(this.baseUrl, this.tokenApp(LuxTrust.RESET_BULK_PIN, false), undefined, undefined, callback);
    } else {
      // @ts-ignore
      return this.connection.post(this.baseUrl, this.tokenApp(LuxTrust.RESET_BULK_PIN), null, undefined, undefined, callback);
    }
  }

  // resolves the reader_id in the base URL
  protected tokenApp(path?: string, includeReaderId?: boolean): string {
    let suffix = this.containerUrl;
    suffix += LuxTrust.PATH_TOKEN_APP;
    if (this.reader_id && this.reader_id.length && includeReaderId) {
      suffix += LuxTrust.PATH_READERS + "/" + this.reader_id;
    }
    if (path && path.length) {
      suffix += path.startsWith("/") ? path : "/" + path;
    }
    return suffix;
  }


  protected getBulkSignQueryParams(bulk?: boolean): any {
    if (bulk) {
      return { bulk: true };
    }
  }
}
