// Token card input classe


export class TokenAuthenticateOrSignData {
    constructor(public algorithm: string, public data: string, public pin?: string, public pace?: string, public id?: string, public osDialog?: boolean) {
    }
}

export class TokenVerifyPinData {
    constructor(public pin?: string, public pace?: string, public osDialog?: boolean) {
    }
}

export enum TokenResetPinReferenceType {
    issign = "issign",
    isauthenticate = "isauthenticate",
    isencrypt = "isencrypt"
}

export class TokenResetPinData {
    constructor(
        puk: string,
        pin?: string,
        resetOnly?: boolean,
        osDialog?: boolean,
        reference?: TokenResetPinReferenceType) {
    }
}

export class TokenChangePinData {
    constructor(pin?: string,
                newPin?: string,
                osDialog?: boolean) {
    }
}

export class TokenPinTryCounterData {
    constructor(public reference: string) {
    }
}

