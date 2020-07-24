import { AbstractPkcs11Generic, Pkcs11CertificatesResponse, Pkcs11ClearConfigResponse, Pkcs11GetConfigResponse, Pkcs11InfoResponse, Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse, Pkcs11UploadConfigResponse, Pkcs11VerifyPinRequest } from "./Pkcs11GenericModel";
import { DataResponse, LocalConnection, T1CLibException } from "../../../..";
export declare class Pkcs11Generic implements AbstractPkcs11Generic {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    static PATH_SLOT_ID: string;
    static PATH_SLOT_ALIAS: string;
    static ALL_CERTIFICATES: string;
    static INFO: string;
    static SIGN: string;
    static SLOTS: string;
    static TOKEN: string;
    static UPLOAD_CONFIG: string;
    static GET_CONFIG: string;
    static CLEAR_CONFIG: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    certificates(slotId: string, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(slotId: string, alias: string, data: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
    clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse>;
    getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse>;
    uploadConfig(config: string, callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse>;
    protected genericPkcs11Path(path?: string, slotNumber?: string, alias?: string): string;
}
