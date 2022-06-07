import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
  BoolDataResponse, TokenInfoResponse,
  TokenCertificateResponse, TokenAllCertsResponse, TokenAllCertsExtendedResponse, TokenCertificateExtendedResponse
} from "../../../../../core/service/CoreModel";
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {
  TokenAddressResponse,
  TokenAllDataResponse, TokenAuthenticateResponse,
  TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
  TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../generic/EidGenericModel";
import {Options} from "../../../Card";

export interface AbstractEidBE {
  allData(filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllDataResponse) => void): Promise<TokenAllDataResponse>;
  biometric(callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
  address(callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse>;
  picture(callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse>;
  allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
  rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  intermediateCertificates(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;

  allCertsExtended(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
  rootCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  intermediateCertificatesExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  authenticationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  nonRepudiationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  encryptionCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

  verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
  authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
  sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  signRaw(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
  resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}


