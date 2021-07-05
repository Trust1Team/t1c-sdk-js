import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse, TokenAllCertsResponse,
    TokenCertificateResponse
} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData} from "../../TokenCard";
import {
    TokenAuthenticateResponse, TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse
} from "../../eid/generic/EidGenericModel";
import {Options} from "../../../Card";


export interface AbstractCertigna {
    allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
    authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
