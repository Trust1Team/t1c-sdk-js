import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
export interface AbstractEidBE {
    allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeidAllDataResponse) => void): Promise<BeidAllDataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeidAllCertsResponse) => void): Promise<BeidAllCertsResponse>;
    rnData(callback?: (error: T1CLibException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
    tokenData(callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
    address(callback?: (error: T1CLibException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse>;
    picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    verifyPinWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    tokenData(callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
    authenticate: (body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) => Promise<DataResponse>;
    authenticateWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>;
    signData: (body: any, callback?: () => void) => Promise<DataResponse>;
    signDataWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>;
}
export declare class BeidAddressResponse extends DataObjectResponse {
    data: BeidAddress;
    success: boolean;
    constructor(data: BeidAddress, success: boolean);
}
export declare class BeidAddress {
    municipality: string;
    raw_data: string;
    signature: string;
    street_and_number: string;
    version: number;
    zipcode: string;
    constructor(municipality: string, raw_data: string, signature: string, street_and_number: string, version: number, zipcode: string);
}
export declare class BeidAllCertsResponse extends DataObjectResponse {
    data: BeidAllCerts;
    success: boolean;
    constructor(data: BeidAllCerts, success: boolean);
}
export declare class BeidAllCerts {
    authentication_certificate?: T1CCertificate | undefined;
    citizen_certificate?: T1CCertificate | undefined;
    non_repudiation_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    rrn_certificate?: T1CCertificate | undefined;
    constructor(authentication_certificate?: T1CCertificate | undefined, citizen_certificate?: T1CCertificate | undefined, non_repudiation_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined, rrn_certificate?: T1CCertificate | undefined);
}
export declare class BeidAllDataResponse extends BeidAllCertsResponse {
    data: BeidAllData;
    success: boolean;
    constructor(data: BeidAllData, success: boolean);
}
export declare class BeidAllData {
    address?: BeidAddress | undefined;
    authentication_certificate?: T1CCertificate | undefined;
    citizen_certificate?: T1CCertificate | undefined;
    non_repudiation_certificate?: T1CCertificate | undefined;
    picture?: string | undefined;
    rn?: BeidRnData | undefined;
    root_certificate?: T1CCertificate | undefined;
    rrn_certificate?: T1CCertificate | undefined;
    token_data?: BeidTokenData | undefined;
    constructor(address?: BeidAddress | undefined, authentication_certificate?: T1CCertificate | undefined, citizen_certificate?: T1CCertificate | undefined, non_repudiation_certificate?: T1CCertificate | undefined, picture?: string | undefined, rn?: BeidRnData | undefined, root_certificate?: T1CCertificate | undefined, rrn_certificate?: T1CCertificate | undefined, token_data?: BeidTokenData | undefined);
}
export declare class BeidTokenData {
    eid_compliant?: number | undefined;
    electrical_perso_interface_version?: number | undefined;
    electrical_perso_version?: number | undefined;
    graphical_perso_version?: number | undefined;
    label?: string | undefined;
    prn_generation?: string | undefined;
    raw_data?: string | undefined;
    serial_number?: string | undefined;
    version?: number | undefined;
    version_rfu?: number | undefined;
    constructor(eid_compliant?: number | undefined, electrical_perso_interface_version?: number | undefined, electrical_perso_version?: number | undefined, graphical_perso_version?: number | undefined, label?: string | undefined, prn_generation?: string | undefined, raw_data?: string | undefined, serial_number?: string | undefined, version?: number | undefined, version_rfu?: number | undefined);
}
export declare class BeidTokenDataResponse extends DataObjectResponse {
    data: BeidTokenData;
    success: boolean;
    constructor(data: BeidTokenData, success: boolean);
}
export declare class BeidRnData {
    birth_date: string;
    birth_location: string;
    card_delivery_municipality: string;
    card_number: string;
    card_validity_date_begin: string;
    card_validity_date_end: string;
    chip_number: string;
    document_type: string;
    first_names: string;
    name: string;
    national_number: string;
    nationality: string;
    noble_condition: string;
    picture_hash: string;
    raw_data: string;
    sex: string;
    signature: string;
    special_status: string;
    third_name: string;
    version: number;
    constructor(birth_date: string, birth_location: string, card_delivery_municipality: string, card_number: string, card_validity_date_begin: string, card_validity_date_end: string, chip_number: string, document_type: string, first_names: string, name: string, national_number: string, nationality: string, noble_condition: string, picture_hash: string, raw_data: string, sex: string, signature: string, special_status: string, third_name: string, version: number);
}
export declare class BeidRnDataResponse extends DataObjectResponse {
    data: BeidRnData;
    success: boolean;
    constructor(data: BeidRnData, success: boolean);
}
export declare class OptionalPin {
    pin?: string | undefined;
    pace?: string | undefined;
    constructor(pin?: string | undefined, pace?: string | undefined, private_key_reference?: string);
}
export declare class Options {
    filters?: string[] | undefined;
    constructor(filters?: string[] | undefined);
}
export declare class AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string;
    data: string;
    pin?: string | undefined;
    pace?: string | undefined;
    constructor(algorithm_reference: string, data: string, pin?: string | undefined, pace?: string | undefined);
}
