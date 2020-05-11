/// <reference types="pkijs" />
import Certificate from 'pkijs/src/Certificate';
export declare class CertParser {
    static processCert(certificate: string): Certificate;
    private static str2ab;
    private static setParsed;
}
