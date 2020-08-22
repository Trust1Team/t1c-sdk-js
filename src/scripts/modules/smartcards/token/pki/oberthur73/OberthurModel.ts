/**
 * @author Trust1Team
 * @since 2020
 */
import { T1CLibException } from '../../../../../core/exceptions/CoreExceptions';
import {BoolDataResponse, CertificateResponse, DataArrayResponse} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from "../../TokenCard";
import {
    TokenAllCertsResponse,
    TokenAuthenticateResponse, TokenSignResponse,
    TokenDataResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../../eid/generic/EidGenericModel";
import {Options} from "../../../Card";

export interface AbstractOberthur73 {
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
    tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>
    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
