export declare class OptionalPin {
    pin?: string | undefined;
    pace?: string | undefined;
    constructor(pin?: string | undefined, pace?: string | undefined, private_key_reference?: string);
}
export declare class AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string;
    data: string;
    pin?: string | undefined;
    pace?: string | undefined;
    constructor(algorithm_reference: string, data: string, pin?: string | undefined, pace?: string | undefined);
}
export declare class VerifyPinData extends OptionalPin {
    private_key_reference?: string | undefined;
    pin?: string | undefined;
    pace?: string | undefined;
    constructor(private_key_reference?: string | undefined, pin?: string | undefined, pace?: string | undefined);
}
export declare class ResetPinData {
    puk: string;
    new_pin: string;
    private_key_reference: string;
    constructor(puk: string, new_pin: string, private_key_reference: string);
}
export declare class PinTryCounterData {
    pin_reference: string;
    constructor(pin_reference: string);
}
export declare class Options {
    filters?: string[] | undefined;
    constructor(filters?: string[] | undefined);
}
