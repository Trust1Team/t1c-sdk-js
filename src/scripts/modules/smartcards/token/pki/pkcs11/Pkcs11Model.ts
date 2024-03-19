import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    TokenCertificateResponse,
    TokenInfoResponse,
    BoolDataResponse,
    TokenAllCertsExtendedResponse,
    TokenAllCertsResponse,
    TokenCertificateExtendedResponse,
    TokenValidateSignatureRequest, TokenValidateSignatureResponse, GenericT1CResponse
} from "../../../../../core/service/CoreModel";
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {
    TokenAuthenticateResponse, TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../../eid/generic/EidGenericModel";
import {Options} from "../../../Card";


export interface AbstractPkcs11 {
    getConfig(callback?: (error: T1CLibException, data: Pkcs11ConfigurationResponse) => void): Promise<GenericT1CResponse<Pkcs11ConfigurationResponse>>;
    setConfig(config: Pkcs11Configruation, callback?: (error: T1CLibException, data: Pkcs11Configruation) => void): Promise<GenericT1CResponse<Pkcs11Configruation>>
    resetConfig(callback?: (error: T1CLibException, data: boolean)=> void): Promise<GenericT1CResponse<boolean>>

    allCerts( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
    authenticationCertificate( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    nonRepudiationCertificate( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse>;

    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    sign_raw(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
}


export interface Pkcs11Configruation {
    macos: string,
    win: string,
    linux: string
}


export interface Pkcs11ConfigurationResponse {

}