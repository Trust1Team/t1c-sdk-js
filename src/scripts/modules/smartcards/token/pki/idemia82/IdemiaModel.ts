/**
 * @author Trust1Team
 * @since 2020
 */
import { T1CLibException } from '../../../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse,
    TokenCertificateResponse,
    TokenInfoResponse,
    TokenAllCertsResponse,
    TokenAllCertsExtendedResponse,
    TokenCertificateExtendedResponse,
    TokenValidateSignatureRequest, TokenValidateSignatureResponse
} from "../../../../../core/service/CoreModel";
import {Options} from '../../../Card';
import {
    TokenAuthenticateResponse, TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from "../../TokenCard";

export interface AbstractIdemia {
    allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
    tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
    rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    issuerCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>

    allCertsExtended(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
    rootCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    authenticationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    nonRepudiationCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    encryptionCertificateExtended(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    issuerCertificateExtended(parseCerts?: boolean,  callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse>;

    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
