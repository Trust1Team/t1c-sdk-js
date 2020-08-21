import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
  CertificateResponse, DataArrayResponse,
  DataObjectResponse,
  T1CCertificate,
} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {
  TokenAddressResponse,
  TokenAllCertsResponse,
  TokenAllDataResponse, TokenAuthenticateResponse,
  TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
  TokenDataResponse, TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../generic/EidGenericModel";
import {Options} from "../../../Card";

export interface AbstractEidBE {
  allData(filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllDataResponse) => void): Promise<TokenAllDataResponse>;
  allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
  biometric(callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
  address(callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse>;
  picture(callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse>;
  rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  intermediateCertificates(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
  verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
  authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
  sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
}


