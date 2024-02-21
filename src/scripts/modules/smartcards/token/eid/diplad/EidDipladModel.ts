import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
  BoolDataResponse,
  TokenCertificateResponse, TokenAllCertsResponse, TokenInfoResponse,
  TokenAllCertsExtendedResponse,
  TokenCertificateExtendedResponse
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

export interface AbstractEidDiplad {
  allData(filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllDataResponse) => void): Promise<TokenAllDataResponse>;
  allCerts( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
  biometric(callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
  address(callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse>;
  picture(callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse>;
  rootCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  intermediateCertificates( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  authenticationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  nonRepudiationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  encryptionCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;

  allCertsExtended( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
  rootCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  intermediateCertificatesExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  authenticationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  nonRepudiationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
  encryptionCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

  verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
  authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
  sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
  resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}


