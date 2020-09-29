import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import {
    DataObjectResponse
} from '../../../core/service/CoreModel';
import {Pkcs11Info, Pkcs11Slot, Pkcs11TokenInfo} from "../../../..";
import Certificate from 'pkijs/src/Certificate';



export interface AbstractPkcs11 {
    certificates(slotId: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: Pkcs11ObjectCertificatesResponse) => void): Promise<Pkcs11ObjectCertificatesResponse>;
    // info(callback?: (error: T1CLibException, data: Pkcs11ObjectInfoResponse) => void): Promise<Pkcs11ObjectInfoResponse>;
    signData(data: Pkcs11SignData, callback?: (error: T1CLibException, data: Pkcs11ObjectSignResponse) => void): Promise<Pkcs11ObjectSignResponse>;
    slots(callback?: (error: T1CLibException, data: Pkcs11ObjectSlotsResponse) => void): Promise<Pkcs11ObjectSlotsResponse>;
    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11ObjectSlotsResponse) => void): Promise<Pkcs11ObjectSlotsResponse>;
    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11ObjectTokenResponse) => void): Promise<Pkcs11ObjectTokenResponse>;
}

export class Pkcs11ObjectInfoResponse extends DataObjectResponse {
    constructor(public data: Pkcs11Info, public success: boolean) {
        super(data, success);
    }
}

export class Pkcs11ObjectSign {
    constructor(public data: string) {
    }
}

export class Pkcs11ObjectSignResponse {
    constructor(public data: Pkcs11ObjectSign, public success: boolean) {
    }
}

export class Pkcs11ObjectSlots {
    constructor(public slots: Pkcs11Slot[]) {
    }
}

export class Pkcs11ObjectSlotsResponse {
    constructor(public data: Pkcs11ObjectSlots, public success: boolean) {
    }
}


export class Pkcs11ObjectCertificates {
    constructor(public certificates: Pkcs11ObjectCertificate[]) {}
}


export class Pkcs11ObjectCertificate {
    constructor(public id: string, public certificate: string, public parsed?: Certificate) {}
}

export class Pkcs11ObjectCertificatesResponse {
    constructor(public data: Pkcs11ObjectCertificates, public success: boolean) {
    }
}

export class Pkcs11SignData {
    constructor(public slotId: string,
                public certificateId: string,
                public algorithm: string,
                public data: string,
                public pin?: string,
                public osDialog?: boolean) {}
}

export class Pkcs11ObjectTokenResponse {
    constructor(public data: Pkcs11TokenInfo, public success: boolean) {
    }
}

export class Pkcs11SetConfigResponse {
    constructor(public data: string, public success: boolean) {
    }
}

