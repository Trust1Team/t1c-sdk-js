

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

export class Options {
    constructor(public filters?: string[]) {}
}
