
import { T1CLibException } from '../core/exceptions/CoreExceptions';

export class ResponseHandler {
    public static error(err: T1CLibException, callback?: (error: T1CLibException, data: any) => void) {
        if (callback && typeof callback === 'function') { callback(err, null); }
        return Promise.reject(err);
    }

    public static response(data: any, callback?: (error: T1CLibException , data: any) => void) {
        if (callback && typeof callback === 'function') {
            // @ts-ignore
            callback(null, data);
        }
        return Promise.resolve(data);
    }
}
