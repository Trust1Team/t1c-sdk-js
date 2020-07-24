export declare class AuthenticateOrSignData {
    constructor(algorithm: string, data: string, pin?: string, osDialog?: boolean, id?: string);
}
export declare class VerifyPinData {
    pin?: string | undefined;
    osDialog?: boolean | undefined;
    constructor(pin?: string | undefined, osDialog?: boolean | undefined);
}
export declare class ResetPinData {
    constructor(pin?: string, puk?: string, resetOnly?: boolean, osDialog?: boolean, reference?: string);
}
export declare class ChangePinData {
    constructor(pin?: string, newPin?: string, osDialog?: boolean);
}
export declare class PinTryCounterData {
    reference: string;
    constructor(reference: string);
}
export declare class Options {
    filters?: string[] | undefined;
    constructor(filters?: string[] | undefined);
}
