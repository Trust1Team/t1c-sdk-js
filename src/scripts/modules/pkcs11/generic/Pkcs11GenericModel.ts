import {BoolDataResponse, DataResponse, T1CLibException} from "../../../..";


export interface AbstractPkcs11Generic {
    uploadConfig(config: string, callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse>;
    getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse>;
    clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse>;
    os(callback?: (error: T1CLibException, data: OsResponse) => void): Promise<OsResponse>;
    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse>;
    slotInfo(slotId: number, callback?: (error: T1CLibException, data: Pkcs11SlotInfoResponse) => void): Promise<Pkcs11SlotInfoResponse>;
    token(slotId: number, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse>;
    getAliases(slotId: number, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: AliasesResponse) => void): Promise<AliasesResponse>;
    getPrivateKeyType(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: PrivateKeyTypeResponse) => void): Promise<PrivateKeyTypeResponse>;
    getCertificates(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse>;
    sign(slotId: number, alias: string, data: Pkcs11SignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    verifyPin(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}


export class Pkcs11VerifyPinRequest {
    constructor(public pin?: string) {
    }
}


export class OsResponse {
    constructor(public data: Os, public success: boolean) {
    }
}

export class Os {
    constructor(public id: string, public version: string) {
    }
}

export class PrivateKeyTypeResponse {
    constructor(public data: PrivateKeyType, public success: boolean) {
    }
}

export class PrivateKeyType {
    constructor(public data: string, public algorithms?: Array<string>) {
    }
}

export class Certificate {
    constructor(public certificate?: string, certSn?: string) {
    }
}


export class AliasesResponse {
    constructor(public data: Aliases, public success: boolean) {
    }
}

export class Aliases {
    constructor(public aliases: Alias[]) {
    }
}

export class Alias {
    constructor(public ref: string) {
    }
}


export class Pkcs11UploadConfigResponse {
    constructor(public data: string, public success: boolean) {
    }
}

export class Pkcs11ClearConfigResponse {
    constructor(public data: string, public success: boolean) {
    }
}

export class Pkcs11GetConfigResponse {
    constructor(public data: Pkcs11GetConfig, public success: boolean) {
    }
}

export class Pkcs11GetConfig {
    constructor(public sessionRef?: string, public tempPath?: string) {
    }
}

export class Pkcs11InfoResponse {
    constructor(public data: Pkcs11Info, public success: boolean) {
    }
}

export class Pkcs11SlotInfoResponse {
    constructor(public data: Pkcs11Slot, public success: boolean) {
    }
}


export class Pkcs11Info {
    constructor(public cryptokiVersion: string,
                public manufacturerId: string,
                public libraryDescription: string,
                public libraryVersion: string) {
    }
}

export class Pkcs11Slots {
    constructor(public slots: Pkcs11Slot[]) {
    }
}

export class Pkcs11Slot {
    constructor(public slot: number,
                public description: string) {
    }
}

export class Pkcs11SlotsResponse {
    constructor(public data: Pkcs11Slots, public success: boolean) {
    }
}

export class Pkcs11Certificates {
    constructor(public certificates: Pkcs11Certificate[]) {
    }
}

export class Pkcs11Certificate {
    constructor(public cert: string, public certSn: string, public parsed?: object) {
    }
}

export class Pkcs11CertificatesResponse {
    constructor(public data: Pkcs11Certificates, public success: boolean) {
    }
}

export class Pkcs11SignRequest {
    constructor(public algorithm: string,
                public data: string,
                public pin?: string) {
    }
}

export class Pkcs11Config {
    constructor(public config: string) {
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
                public firmwareVersion: string) {
    }
}

export class Pkcs11TokenResponse {
    constructor(public data: Pkcs11TokenInfo, public success: boolean) {
    }
}

export class Pkcs11ModuleConfig {
    constructor(public linux: string, public mac: string, public win: string) {
    }
}
