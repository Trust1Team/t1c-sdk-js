// Token card input classe


export class TokenAuthenticateOrSignData {
    constructor(public algorithm: string, public data: string, public pin?: string, public pace?: string, public id?: string, public osDialog?: boolean, public txId?: string, public language?: string, public base64Encoded?: boolean) {
    }
}

export class TokenVerifyPinData {
    constructor(public pin?: string, public pace?: string, public osDialog?: boolean, public base64Encoded?: boolean) {
    }
}

export enum TokenResetPinReferenceType {
    issign = "issign",
    isauthenticate = "isauthenticate",
    isencrypt = "isencrypt"
}

export class TokenResetPinData {
    constructor(
        public puk: string,
        public pin?: string,
        public resetOnly?: boolean,
        public osDialog?: boolean,
        public reference?: TokenResetPinReferenceType,
        public base64Encoded?: boolean) {
    }
}

export class TokenChangePinData {
    constructor(public pin?: string,
                public newPin?: string,
                public osDialog?: boolean) {
    }
}

export class TokenPinTryCounterData {
    constructor(public reference: string) {
    }
}

