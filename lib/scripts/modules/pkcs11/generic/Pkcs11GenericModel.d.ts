import { DataResponse, T1CLibException } from "../../../..";
export interface AbstractPkcs11Generic {
    uploadConfig(config: string, callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse>;
    getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse>;
    clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse>;
    certificates(slotId: string, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(slotId: string, alias: string, data: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
}
export declare class Pkcs11VerifyPinRequest {
    pin?: string | undefined;
    constructor(pin?: string | undefined);
}
export declare class Pkcs11UploadConfigResponse {
    data: string;
    success: boolean;
    constructor(data: string, success: boolean);
}
export declare class Pkcs11ClearConfigResponse {
    data: string;
    success: boolean;
    constructor(data: string, success: boolean);
}
export declare class Pkcs11GetConfigResponse {
    data: Pkcs11GetConfig;
    success: boolean;
    constructor(data: Pkcs11GetConfig, success: boolean);
}
export declare class Pkcs11GetConfig {
    sessionRef?: string | undefined;
    tempPath?: string | undefined;
    constructor(sessionRef?: string | undefined, tempPath?: string | undefined);
}
export declare class Pkcs11InfoResponse {
    data: Pkcs11Info;
    success: boolean;
    constructor(data: Pkcs11Info, success: boolean);
}
export declare class Pkcs11Info {
    cryptokiVersion: string;
    manufacturerId: string;
    libraryDescription: string;
    libraryVersion: string;
    constructor(cryptokiVersion: string, manufacturerId: string, libraryDescription: string, libraryVersion: string);
}
export declare class Pkcs11Slots {
    slots: Pkcs11Slot[];
    constructor(slots: Pkcs11Slot[]);
}
export declare class Pkcs11Slot {
    slot: string;
    description: string;
    constructor(slot: string, description: string);
}
export declare class Pkcs11SlotsResponse {
    data: Pkcs11Slots;
    success: boolean;
    constructor(data: Pkcs11Slots, success: boolean);
}
export declare class Pkcs11Certificate {
    cert: string;
    certSn: string;
    parsed?: object | undefined;
    constructor(cert: string, certSn: string, parsed?: object | undefined);
}
export declare class Pkcs11CertificatesResponse {
    data: Pkcs11Certificate[];
    success: boolean;
    constructor(data: Pkcs11Certificate[], success: boolean);
}
export declare class Pkcs11SignData {
    algorithm: string;
    data: string;
    pin?: string | undefined;
    constructor(algorithm: string, data: string, pin?: string | undefined);
}
export declare class Pkcs11Config {
    config: string;
    constructor(config: string);
}
export declare class Pkcs11VerifySignedData {
    slot_id: string;
    cert_id: string;
    algorithm_reference: string;
    data: string;
    signature: string;
    pin?: string | undefined;
    constructor(slot_id: string, cert_id: string, algorithm_reference: string, data: string, signature: string, pin?: string | undefined);
}
export declare class Pkcs11TokenInfo {
    slot: string;
    label: string;
    manufacturerId: string;
    model: string;
    serialNumber: string;
    flags: string;
    ulMaxSessionCount: number;
    ulSessionCount: number;
    ulMaxRwSessionCount: number;
    ulMaxPinLen: number;
    ulMinPinLen: number;
    ulTotalPublicMemory: number;
    ulFreePublicMemory: number;
    ulTotalPrivateMemory: number;
    ulFreePrivateMemory: number;
    hardwareVersion: string;
    firmwareVersion: string;
    constructor(slot: string, label: string, manufacturerId: string, model: string, serialNumber: string, flags: string, ulMaxSessionCount: number, ulSessionCount: number, ulMaxRwSessionCount: number, ulMaxPinLen: number, ulMinPinLen: number, ulTotalPublicMemory: number, ulFreePublicMemory: number, ulTotalPrivateMemory: number, ulFreePrivateMemory: number, hardwareVersion: string, firmwareVersion: string);
}
export declare class Pkcs11TokenResponse {
    data: Pkcs11TokenInfo;
    success: boolean;
    constructor(data: Pkcs11TokenInfo, success: boolean);
}
export declare class Pkcs11ModuleConfig {
    linux: string;
    mac: string;
    win: string;
    constructor(linux: string, mac: string, win: string);
}
