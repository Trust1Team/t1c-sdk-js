import { T1CLibException } from '../core/exceptions/CoreExceptions';
export declare class ResponseHandler {
    static error(err: T1CLibException, callback?: (error: T1CLibException, data: any) => void): Promise<never>;
    static response(data: any, callback?: (error: T1CLibException | undefined, data: any) => void): Promise<any>;
}
