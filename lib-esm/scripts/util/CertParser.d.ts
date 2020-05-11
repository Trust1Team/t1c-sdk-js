import { T1CLibException } from '../core/exceptions/CoreExceptions';
import { T1CResponse } from '../core/service/CoreModel';
import Certificate from 'pkijs/build/Certificate';
export declare class CertParser {
    static process(response: any, parseCerts: boolean, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<any>;
    static processCert(certificate: string): Certificate;
    private static str2ab;
    private static setParsed;
}
