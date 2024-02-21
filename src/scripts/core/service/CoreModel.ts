import {T1CLibException} from '../exceptions/CoreExceptions';
import {T1CClient} from '../T1CSdk';
export interface AbstractCore {
  // getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
  getImplicitConsent(
    codeWord: string,
    durationInDays?: number,
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient>;

  validateConsent(
    callback?: (error?: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient>;

  updateJWT(
    jwt: string,
    callback?: (error: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient>;

  info(
    callback?: (error: T1CLibException, data: InfoResponse) => void
  ): void | Promise<InfoResponse>;

  reader(
    reader_id: string,
    callback?: (error: T1CLibException, data: SingleReaderResponse) => void
  ): Promise<SingleReaderResponse>;

  readers(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse>;

  readersCardAvailable(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse>;

  readersCardsUnavailable(
    callback?: (error: T1CLibException, data: CardReadersResponse) => void
  ): Promise<CardReadersResponse>;

  getAgents(): Promise<AgentsResponse>;

  getUrl(): string;

  getDevicePublicKey(): void;

  dsCorsSync(): Promise<boolean>;

  pushLogs(): Promise<boolean>;

  version(): Promise<string>;
}

export class GenericT1CResponse<T> {
  constructor(
    public success: boolean,
    public data: T,
    public signature?: string
  ) {}
}

export class T1CResponse {
  constructor(
    public success: boolean,
    public data: any,
    public signature?: string
  ) {}
}

export class TokenValidateSignatureResponse extends T1CResponse {
  constructor(
    public data: TokenValidateSignature,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class TokenValidateSignature {
  constructor(public valid: boolean) {}
}

export class BoolDataResponse extends T1CResponse {
  constructor(
    public data: boolean,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class DataResponse extends T1CResponse {
  constructor(
    public data: string,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class DataArrayResponse extends T1CResponse {
  constructor(
    public data: any[],
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class DataObjectResponse extends T1CResponse {
  constructor(
    public data: {[key: string]: any},
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class InfoOS {
  constructor(
    public architecture?: String,
    public os?: String,
    public version?: String
  ) {}
}

export class InfoJava {
  constructor(
    public runtime?: String,
    public spec?: String,
    public java?: String
  ) {}
}

export class InfoUser {
  constructor(
    public timezone?: String,
    public country?: String,
    public language?: String,
    public home?: String,
    public tempDir?: String,
    public name?: string,
    public username?: string,
    public hostName?: string,
    public installedDir?: string
  ) {}
}

export class InfoService {
  constructor(
    public url?: String,
    public apiPort?: String,
    public gRpcPort?: String,
    public deviceType?: string,
    public distributionServiceUrl?: string,
    public dsRegistryActivated?: boolean
  ) {}
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
  ) {}
}

export class T1CContainer {
  constructor(
    public name: string,
    public version: string,
    public status: string
  ) {}
}

export class T1CContainerid {
  constructor(public name: string) {}
}

export class InfoApi {
  constructor(
    public service?: InfoService,
    public activated?: boolean,
    public status?: String,
    public environment?: String,
    public uid?: String,
    public modules?: Array<String>,
    public cors?: Array<String>,
    public version?: String,
    public logLevel?: String,
    public jwtEnabled?: boolean,
    public optionalConsent?: boolean
  ) {}
}

export class InfoResponse {
  //extends T1CResponse
  constructor(
    public t1CInfoOS?: InfoOS,
    public t1CInfoJava?: InfoJava,
    public t1CInfoRuntime?: T1CInfoRuntime,
    public t1CInfoUser?: InfoUser,
    public t1CInfoAPI?: InfoApi
  ) {}
}

export class BrowserInfo {
  constructor(
    public browser: {name: string; version: string},
    public manufacturer: string,
    public os: {name: string; version: string; architecture: string},
    public ua: string
  ) {}
}

export class SmartCard {
  constructor(
    public atr?: string | undefined,
    public description?: string[] | undefined,
    public modules?: string[] | undefined
  ) {}
}

export class Agent {
  constructor(
    public username: string,
    public apiIp: string,
    public apiPort: string,
    public apiPid: string,
    public sandboxIp: string,
    public sandboxPort: string,
    public sandboxPid: string,
    public apiLastUsed: string,
    public validityInDays: string,
    public connectionState: string
  ) {}
}

export class CardReader {
  constructor(
    public id: string,
    public name: string,
    public pinpad: boolean,
    public card?: SmartCard
  ) {}
}

export class AgentsResponse extends T1CResponse {
  constructor(
    public data: Agent[],
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class CardReadersResponse extends T1CResponse {
  constructor(
    public data: CardReader[],
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class TokenCertificateExtendedResponse extends T1CResponse {
  constructor(
    public data: TokenCertificateExtended,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class TokenCertificateExtended {
  constructor(public certificates?: Array<T1CCertificate>) {}
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
  ) {}
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
    public ICCPublicCertificate?: TokenCertificateExtended
  ) {}
}

export class TokenAllCertsExtendedResponse extends DataObjectResponse {
  constructor(
    public data: TokenAllCertsExtended,
    public success: boolean,
    public signature?: string
  ) {
    super(data, success, signature);
  }
}

export class TokenCertificateResponse extends T1CResponse {
  constructor(
    public data: TokenCertificate,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class TokenCertificate {
  constructor(
    public certificate?: string,
    public certificates?: Array<string>,
    public certificateType?: string,
    public id?: string,
  ) {}
}

export class TokenAllCertsResponse extends DataObjectResponse {
  constructor(
    public data: TokenAllCerts,
    public success: boolean,
    public signature?: string
  ) {
    super(data, success, signature);
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
  ) {}
}

export class PaymentCertificateResponse extends DataObjectResponse {
  constructor(
    public data: PaymentCertificate,
    public success: boolean,
    public signature?: string
  ) {
    super(data, success, signature);
  }
}

export class PaymentCertificate {
  constructor(
    public certificate?: string,
    public exponent?: string,
    public remainder?: string
  ) {}
}

export class PaymentAllCertsResponse extends DataObjectResponse {
  constructor(
    public data: PaymentAllCerts,
    public success: boolean,
    public signature?: string
  ) {
    super(data, success, signature);
  }
}

export class PaymentAllCerts {
  constructor(
    public issuerPublicCertificate?: PaymentCertificate,
    public ICCPublicCertificate?: PaymentCertificate
  ) {}
}

export class SingleReaderResponse extends T1CResponse {
  constructor(
    public data: CardReader,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

export class T1CInfoRuntime {
  constructor(
    public runtime?: string,
    public desktop?: string,
    public version?: string,
    public dateTime?: string
  ) {}
}

export class CheckT1CVersion {
  constructor(
    public outDated: boolean,
    public downloadLink?: string
  ) {}
}

export class TokenInfoResponse extends T1CResponse {
  // use union type to be backwards compatible with versions before 3.6.0
  constructor(
    public data: TokenInfo | BaseTokenInfo,
    public success: boolean,
    public signature?: string
  ) {
    super(success, data, signature);
  }
}

/**
 * TokenInfo its info property can be both a regular tokenInfo object or a PKCS11 version of the tokenInfo object
 * We use the Union type to make sure both are accepted but keep typing.
 *
 * In a later stage this can be updated to include the types for the other info types
 */
export class TokenInfo {
  constructor(
    info?: BaseTokenInfo | PKCS11TokenInfo,
    infoType?: TokenInfoType
  ) {}
}

export class BaseTokenInfo {
  constructor(
    public rawData?: string,
    public version?: string,
    public serialNumber?: string,
    public label?: string,
    public prnGeneration?: string,
    public eidCompliant?: string,
    public graphicalPersoVersion?: string,
    public versionRfu?: string,
    public electricalPersoVersion?: string,
    public electricalPersoInterfaceVersion?: string,
    public changeCounter?: number,
    public activated?: string
  ) {}
}

export class PKCS11TokenInfo {
  constructor(
    public slot?: string,
    public label?: string,
    public manufacturerId?: string,
    public model?: string,
    public serialNumber?: string,
    public flags?: T1cTokenInfoFlags,
    public mechanisms?: Array<T1cMechanismInfo>,
    public ulMaxSessionCount?: number,
    public ulSessionCount?: number,
    public ulMaxRwSessionCount?: number,
    public ulMaxPinLen?: number,
    public ulMinPinLen?: number,
    public ulTotalPubLicMemory?: number,
    public ulFreePubMemory?: number,
    public ulTotalPrivateMemory?: number,
    public ulFreePrivateMemory?: number,
    public hardwareVersion?: string,
    public firmwareVersion?: string
  ) {}
}

export class T1cTokenInfoFlags {
  constructor(
    public isRandomNumberGenerator?: boolean,
    public isWriteProtected?: boolean,
    public isLoginRequired?: boolean,
    public isUserPinInitialized?: boolean,
    public isRestoreKeyNotNeeded?: boolean,
    public isClockOnToken?: boolean,
    public isProtectedAuthenticationPath?: boolean,
    public isDualCryptoOperations?: boolean,
    public isTokenInitialized?: boolean,
    public isSecondaryAuthentication?: boolean,
    public isUserPinCountLow?: boolean,
    public isUserPinFinalTry?: boolean,
    public isUserPinLocked?: boolean,
    public isUserPinToBeChanged?: boolean,
    public isSoPinCountLow?: boolean,
    public isSoPinFinalTry?: boolean,
    public isSoPinLocked?: boolean,
    public isSoPinToBeChanged?: boolean
  ) {}
}

export class T1cMechanismInfo {
  constructor(
    public mechanism?: string,
    public flags?: T1cMechanismFlags,
    public ulMinKeySize?: number,
    public ulMaxKeySize?: number
  ) {}
}

export class T1cMechanismFlags {
  constructor(
    public isHardware?: boolean,
    public isEncrypt?: boolean,
    public isDecrypt?: boolean,
    public isDigest?: boolean,
    public isSign?: boolean,
    public isSignRecover?: boolean,
    public isVerify?: boolean,
    public isVerifyRecover?: boolean,
    public isGenerate?: boolean,
    public isGenerateKeyPair?: boolean,
    public isWrap?: boolean,
    public isUnwrap?: boolean,
    public isExtension?: boolean,
    public isEcFP?: boolean,
    public isEcNamedcurve?: boolean,
    public isEcUncompress?: boolean,
    public isEcCompress?: boolean
  ) {}
}

export enum TokenInfoType {
  Token,
  PKCS11,
  File,
  Payment,
  HSM,
  Vault,
  Wallet,
}

export class TokenValidateSignatureRequest {
  constructor(
    public algorithm: string,
    public hash: string,
    public signedHash: string,
    public osDialog?: boolean,
    public id?: string,
    public pin?: string,
    public timeout?: number,
    public txId?: string,
    public language?: string
  ) {}
}
