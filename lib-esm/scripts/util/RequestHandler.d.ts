export declare class Options {
    parseCerts: boolean;
    filters?: string[] | undefined;
    constructor(parseCerts: boolean, filters?: string[] | undefined);
}
export declare class RequestOptions {
    params?: {
        [key: string]: string;
    } | undefined;
    callback?: (() => void) | undefined;
    constructor(params?: {
        [key: string]: string;
    } | undefined, callback?: (() => void) | undefined);
}
export declare class RequestHandler {
    static determineOptions(firstParam: any, secondParam: any): RequestOptions;
    static determineOptionsWithFilter(firstParam: string[] | Options): RequestOptions;
}
