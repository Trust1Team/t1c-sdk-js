export declare class AuthenticateOrSignData {
    constructor(algorithm: string, data: string, pin?: string, osDialog?: boolean, id?: string);
}
export declare class VerifyPinData {
    pin?: string | undefined;
    osDialog?: boolean | undefined;
    constructor(pin?: string | undefined, osDialog?: boolean | undefined);
}
export declare class Options {
    filters?: string[] | undefined;
    constructor(filters?: string[] | undefined);
}
