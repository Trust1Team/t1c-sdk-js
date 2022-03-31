import { T1CLibException } from "../exceptions/CoreExceptions";
import { T1CClient } from "../T1CSdk";
import Certificate from "pkijs/src/Certificate";

export interface AbstractCore {
  // getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
  getImplicitConsent(codeWord: string, durationInDays?: number, callback?: (error?: T1CLibException, data?: T1CClient) => void): Promise<T1CClient>;

  validateConsent(callback?: (error?: T1CLibException, data?: T1CClient) => void): Promise<T1CClient>;

  updateJWT(jwt: string, callback?: (error: T1CLibException, data?: T1CClient) => void): Promise<T1CClient>;

  info(callback?: (error: T1CLibException, data: InfoResponse) => void): void | Promise<InfoResponse>;

  reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;

  readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;

  readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;

  readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;

  getUrl(): string;

  getDevicePublicKey(): void;

  version(): Promise<string>;
}

export class T1CResponse {
  constructor(public success: boolean, public data: any) {
  }
}

export class BoolDataResponse extends T1CResponse {
  constructor(public data: boolean, public success: boolean) {
    super(success, data);
  }
}

export class DataResponse extends T1CResponse {
  constructor(public data: string, public success: boolean) {
    super(success, data);
  }
}

export class DataArrayResponse extends T1CResponse {
  constructor(public data: any[], public success: boolean) {
    super(success, data);
  }
}

export class DataObjectResponse extends T1CResponse {
  constructor(public data: { [key: string]: any }, public success: boolean) {
    super(success, data);
  }
}

export class InfoOS {
  constructor(public architecture?: String, public os?: String, public version?: String) {
  }
}

export class InfoJava {
  constructor(public runtime?: String, public spec?: String, public java?: String) {
  }
}

export class InfoUser {
  constructor(public timezone?: String, public country?: String, public language?: String, public home?: String, public tempDir?: String, public name?: string, public username?: string, public hostName?: string, public installedDir?: string) {
  }
}

export class InfoService {
  constructor(public url?: String, public apiPort?: String, public gRpcPort?: String, public deviceType?: string, public distributionServiceUrl?: string, public dsRegistryActivated?: boolean) {
  }
}

export class InfoApi {
  constructor(public service?: InfoService, public activated?: boolean, public citrix?: boolean, public uid?: String, public modules?: Array<String>, public version?: String, public logLevel?: String, public sharedEnvironment?: boolean) {
  }
}

export class InfoResponse { //extends T1CResponse
  constructor(public t1CInfoOS?: InfoOS, public t1CInfoJava?: InfoJava, public t1CInfoRuntime?: T1CInfoRuntime, public t1CInfoUser?: InfoUser, public t1CInfoAPI?: InfoApi) {
  }
}

export class T1CInfo {
  constructor(
    public activated: boolean,
    public citrix: boolean,
    public managed: boolean,
    public arch: string,
    public os: string,
    public uid: string,
    public containers: T1CContainer[],
    public version: string
  ) {
  }
}

export class T1CContainer {
  constructor(
    public name: string,
    public version: string,
    public status: string
  ) {
  }
}

export class T1CContainerid {
  constructor(public name: string) {
  }
}

export class BrowserInfoResponse extends T1CResponse {
  constructor(public data: BrowserInfo, public success: boolean) {
    super(success, data);
  }
}

export class BrowserInfo {
  constructor(
    public browser: { name: string; version: string },
    public manufacturer: string,
    public os: { name: string; version: string; architecture: string },
    public ua: string
  ) {
  }
}

export class SmartCard {
  constructor(public atr?: string, public description?: string[]) {
  }
}

export class CardReader {
  constructor(
    public id: string,
    public name: string,
    public pinpad: boolean,
    public card?: SmartCard
  ) {
  }
}

export class CardReadersResponse extends T1CResponse {
  constructor(public data: CardReader[], public success: boolean) {
    super(success, data);
  }
}

export class TokenCertificateExtendedResponse extends T1CResponse {
  constructor(public data: TokenCertificateExtended, public success: boolean) {
    super(success, data);
  }
}


export class TokenCertificateExtended {
  constructor(
    public certificates?: Array<T1CCertificate>
  ) {
  }
}


export class T1CCertificate {
  constructor(
    public certificate?: string,
    public certificateType?: string,
    public id?: string,
    public subject?: string,
    public issuer?: string,
    public serialNumber?: string,
    public url?: string,
    public hashSubPubKey?: string,
    public hashIssPubKey?: string,
    public exponent?: string,
    public remainder?: string,
    public parsedCertificate?: Certificate,
  ) {
  }
}


export class TokenAllCertsExtended {
  constructor(
    public authenticationCertificate?: TokenCertificateExtended,
    public intermediateCertificates?: TokenCertificateExtended,
    public nonRepudiationCertificate?: TokenCertificateExtended,
    public rootCertificate?: TokenCertificateExtended,
    public encryptionCertificate?: TokenCertificateExtended,
    public issuerCertificate?: TokenCertificateExtended,
    public issuerPublicCertificate?: TokenCertificateExtended,
    public iccPublicCertificate?: TokenCertificateExtended
  ) {
  }
}

export class TokenAllCertsExtendedResponse extends DataObjectResponse {
  constructor(public data: TokenAllCertsExtended, public success: boolean) {
    super(data, success);
  }
}


export class TokenCertificateResponse extends T1CResponse {
  constructor(public data: TokenCertificate, public success: boolean) {
    super(success, data);
  }
}


export class TokenCertificate {
  constructor(
    public certificate?: string,
    public certificates?: Array<string>,
    public certificateType?: string,
    public id?: string,
    public parsedCertificate?: Certificate,
    public parsedCertificates?: Array<Certificate>
  ) {
  }
}

export class TokenAllCertsResponse extends DataObjectResponse {
  constructor(public data: TokenAllCerts, public success: boolean) {
    super(data, success);
  }
}

export class TokenAllCerts {
  constructor(
    public authenticationCertificate?: TokenCertificate,
    public intermediateCertificates?: TokenCertificate,
    public nonRepudiationCertificate?: TokenCertificate,
    public rootCertificate?: TokenCertificate,
    public encryptionCertificate?: TokenCertificate,
    public issuerCertificate?: TokenCertificate
  ) {
  }
}

export class PaymentCertificateResponse extends DataObjectResponse {
  constructor(public data: PaymentCertificate, public success: boolean) {
    super(data, success);
  }
}

export class PaymentCertificate {
  constructor(public certificate?: string,
              public exponent?: string,
              public remainder?: string,
              public parsed?: Certificate) {
  }
}

export class PaymentAllCertsResponse extends DataObjectResponse {
  constructor(public data: PaymentAllCerts, public success: boolean) {
    super(data, success);
  }
}

export class PaymentAllCerts {
  constructor(
    public issuerPublicCertificate?: PaymentCertificate,
    public iccPublicCertificate?: PaymentCertificate
  ) {
  }
}


export class SingleReaderResponse extends T1CResponse {
  constructor(public data: CardReader, public success: boolean) {
    super(success, data);
  }
}

export class CheckT1CVersion {
  constructor(public outDated: boolean, public downloadLink?: string) {
  }
}

export class CheckT1CVersionResponse extends T1CResponse {
  constructor(public data: CheckT1CVersion, public success: boolean) {
    super(success, data);
  }
}


export class T1CInfoRuntime {
  constructor(public runtime?: string, public desktop?: string, public version?: string, public dateTime?: string) {
  }
}

