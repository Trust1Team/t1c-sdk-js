import {Options} from "../../smartcards/PaymentCard";
import {DataResponse, T1CLibException} from "../../../..";


export interface AbstractGenericPkcs11 {
    // uploadConfig(callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse>;
    // getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse>;
    // clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse>;
    certificates(slotId: string, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    signData(slotId: string, alias: string, data: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
}


export class Pkcs11VerifyPinRequest {
    constructor(public pin?: string) {}
}


export class Pkcs11UploadConfigResponse {
    constructor(public data: string, public success: boolean) {}
}

export class Pkcs11ClearConfigResponse {
    constructor(public data: string, public success: boolean) {}
}

export class Pkcs11GetConfigResponse {
    constructor(public data: Pkcs11GetConfig, public success: boolean) {}
}

export class Pkcs11GetConfig {
    constructor(public sessionRef?: string, public tempPath?: string) {}
}

export class Pkcs11InfoResponse {
    constructor(public data: Pkcs11Info, public success: boolean) {}
}

export class Pkcs11Info {
    constructor(public cryptokiVersion: string,
                public manufacturerId: string,
                public libraryDescription: string,
                public libraryVersion: string) {}
}

export class Pkcs11Slots {
    constructor(public slots: Pkcs11Slot[]) {}
}

export class Pkcs11Slot {
    constructor(public slot: string,
                public description: string) {}
}

export class Pkcs11SlotsResponse {
    constructor(public data: Pkcs11Slots, public success: boolean) {}
}

export class Pkcs11Certificate {
    constructor(public cert: string, public certSn: string, public parsed?: object) {}
}

export class Pkcs11CertificatesResponse {
    constructor(public data: Pkcs11Certificate[], public success: boolean) {}
}

export class Pkcs11SignData {
    constructor(public algorithm: string,
                public data: string,
                public pin?: string) {}
}

export class Pkcs11VerifySignedData {
    constructor(public slot_id: string,
                public cert_id: string,
                public algorithm_reference: string,
                public data: string,
                public signature: string,
                public pin?: string) {
    }
}

export class Pkcs11TokenInfo {
    constructor(public slot: string,
                public label: string,
                public manufacturerId: string,
                public model: string,
                public serialNumber: string,
                public flags: string,
                public ulMaxSessionCount: number,
                public ulSessionCount: number,
                public ulMaxRwSessionCount: number,
                public ulMaxPinLen: number,
                public ulMinPinLen: number,
                public ulTotalPublicMemory: number,
                public ulFreePublicMemory: number,
                public ulTotalPrivateMemory: number,
                public ulFreePrivateMemory: number,
                public hardwareVersion: string,
                public firmwareVersion: string) {}
}

export class Pkcs11TokenResponse {
    constructor(public data: Pkcs11TokenInfo, public success: boolean) {}
}

export class Pkcs11ModuleConfig {
    constructor(public linux: string, public mac: string, public win: string) {}
}
