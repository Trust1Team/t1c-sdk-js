import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
  BoolDataResponse,
  TokenCertificateResponse, TokenAllCertsResponse,
} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {
  TokenAddressResponse,
  TokenAllDataResponse, TokenAuthenticateResponse,
  TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
  TokenDataResponse, TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../generic/EidGenericModel";
import {Options} from "../../../Card";

export interface AbstractEidBE {
  allData(filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllDataResponse) => void): Promise<TokenAllDataResponse>;
  allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
  biometric(callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse>;
  tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
  address(callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse>;
  picture(callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse>;
  rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  intermediateCertificates(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
  verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
  authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
  sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
  allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
  resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}


