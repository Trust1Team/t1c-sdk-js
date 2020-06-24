/**
 * @author Michallis Pashidis
 *
 * Share models
 */

// classes
export class OptionalPin {
    constructor(public pin?: string, public pace?: string, private_key_reference?: string ) {}
}

export class AuthenticateOrSignData extends OptionalPin {
    constructor(public algorithm: string, public data: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

export class VerifyPinData extends OptionalPin {
    constructor(public private_key_reference?: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

export class ResetPinData {
    constructor(public puk: string, public new_pin: string, public private_key_reference: string) {
    }
}

export class PinTryCounterData {
    constructor(public pin_reference: string) {
    }
}

export class Options {
    constructor(public filters?: string[]) {}
}
