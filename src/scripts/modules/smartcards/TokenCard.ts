

// Token card input classes
export class AuthenticateOrSignData {
    constructor(algorithm: string,
                data: string,
                pin?: string,
                osDialog?: boolean,
                id?: string) {
    }
}

export class VerifyPinData {
    constructor(public pin?: string, public osDialog? :boolean) {
    }
}


export class ResetPinData {
    constructor(pin?: string,
                puk?: string,
                resetOnly?: boolean,
                osDialog?: boolean,
                reference?: string) {
    }
}

export class ChangePinData {
    constructor(pin?: string,
                newPin?: string,
                osDialog?: boolean) {
    }
}

export class PinTryCounterData {
    constructor(public reference: string) {
    }
}

export class Options {
    constructor(public filters?: string[]) {}
}
