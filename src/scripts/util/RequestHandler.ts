
export class Options {
    constructor(public parseCerts: boolean, public filters?: string[]) {}
}

export class RequestOptions {
    constructor(public params?: { [key: string]: string}, public callback?: () => void) {}
}

export class RequestHandler {
    // TODO deprecate for v3
    // maintains backward compatibility with the old request style
    public static determineOptions(firstParam: any, secondParam: any): RequestOptions {
        let result = new RequestOptions();
        if (firstParam) {
            if (typeof firstParam === 'function') { result.callback = firstParam; }
            else {
                result.callback = secondParam;
            }
        } else {
            // no first param, check second
            if (typeof secondParam === 'function') { result.callback = secondParam; }
        }
        return result;
    }

    public static determineOptionsWithFilter(firstParam: string[] | Options): RequestOptions {
        let result = new RequestOptions({});
        if (Array.isArray(firstParam)) {
            // array of strings; assume parse boolean is false
            if (firstParam.length) {
                // @ts-ignore
                result.params.filter = firstParam.join(',');
            }
        } else if (typeof firstParam === 'object') {
            // not an array, but object
            if (firstParam.filters && Array.isArray(firstParam.filters)) {
                if (firstParam.filters.length) {
                    // @ts-ignore
                    result.params.filter = firstParam.filters.join(',');
                }
            }
        }
        return result;
    }
}
