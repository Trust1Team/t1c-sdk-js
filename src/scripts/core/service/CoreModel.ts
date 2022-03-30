import { T1CLibException } from "../exceptions/CoreExceptions";
import { T1CClient } from "../T1CSdk";
import Certificate from "pkijs/src/Certificate";
import exp from "constants";

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

export class T1CInfoRuntime {
  constructor(public runtime?: string, public desktop?: string, public version?: string, public dateTime?: string) {
  }
}



export class TokenInfoResponse extends T1CResponse {
  constructor(public data: TokenInfo, public success: boolean) {
    super(success, data);
  }
}

/**
 * TokenInfo its info property can be both a regular tokenInfo object or a PKCS11 version of the tokenInfo object
 * We use the Union type to make sure both are accepted but keep typing.
 *
 * In a later stage this can be updated to include the types for the other info types
 */
export class TokenInfo {
  constructor(info?: BaseTokenInfo | PKCS11TokenInfo, infoType?: TokenInfoType) {
  }
}


export class BaseTokenInfo {
  constructor(
    rawData?: string,
    version?: string,
    serialNumber?: string,
    label?: string,
    prnGeneration?: string,
    eidCompliant?: string,
    graphicalPersoVersion?: string,
    versionRfu?: string,
    electricalPersoVersion?: string,
    electricalPersoInterfaceVersion?: string,
    changeCounter?: number,
    activated?: string
  ) {
  }
}


export class PKCS11TokenInfo {
  constructor(
    slot?: string,
    label?: string,
    manufacturerId?: string,
    model?: string,
    serialNumber?: string,
    flags?: T1cTokenInfoFlags,
    mechanisms?: Array<T1cMechanismInfo>,
    ulMaxSessionCount?: number,
    ulSessionCount?: number,
    ulMaxRwSessionCount?: number,
    ulMaxPinLen?: number,
    ulMinPinLen?: number,
    ulTotalPubLicMemory?: number,
    ulFreePubMemory?: number,
    ulTotalPrivateMemory?: number,
    ulFreePrivateMemory?: number,
    hardwareVersion?: string,
    firmwareVersion?: string
  ) {
  }
}


export class T1cTokenInfoFlags {
  constructor(
    is_random_number_generator?: boolean,
    is_write_protected?: boolean,
    is_login_required?: boolean,
    is_user_pin_initialized?: boolean,
    is_restore_key_not_needed?: boolean,
    is_clock_on_token?: boolean,
    is_protected_authentication_path?: boolean,
    is_dual_crypto_operations?: boolean,
    is_token_initialized?: boolean,
    is_secondary_authentication?: boolean,
    is_user_pin_count_low?: boolean,
    is_user_pin_final_try?: boolean,
    is_user_pin_locked?: boolean,
    is_user_pin_to_be_changed?: boolean,
    is_so_pin_count_low?: boolean,
    is_so_pin_final_try?: boolean,
    is_so_pin_locked?: boolean,
    is_so_pin_to_be_changed?: boolean
  ) {
  }
}

export class T1cMechanismInfo {
  constructor(
    mechanism?: string,
    flags?: T1cMechanismFlags,
    ul_min_key_size?: number,
    ul_max_key_size?: number
  ) {
  }
}

export class T1cMechanismFlags {
  constructor(
    is_hardware?: boolean,
    is_encrypt?: boolean,
    is_decrypt?: boolean,
    is_digest?: boolean,
    is_sign?: boolean,
    is_sign_recover?: boolean,
    is_verify?: boolean,
    is_verify_recover?: boolean,
    is_generate?: boolean,
    is_generate_key_pair?: boolean,
    is_wrap?: boolean,
    is_unwrap?: boolean,
    is_extension?: boolean,
    is_ec_f_p?: boolean,
    is_ec_namedcurve?: boolean,
    is_ec_uncompress?: boolean,
    is_ec_compress?: boolean
  ) {
  }
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
