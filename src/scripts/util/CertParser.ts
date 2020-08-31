import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import Certificate from 'pkijs/build/Certificate';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
import {
    TokenCertificateResponse,
    TokenCertificate,
    TokenAllCerts,
    TokenAllCertsResponse,
    PaymentAllCertsResponse,
    PaymentCertificateResponse,
    PaymentCertificate,
    PaymentAllCerts
} from '../core/service/CoreModel';
import { ResponseHandler } from './ResponseHandler';

export class CertParser {
    public static processTokenAllCertificates(response: TokenAllCertsResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void):  Promise<TokenAllCertsResponse> {
        let updatedCerts = new TokenAllCerts();
        if (response.data.authenticationCertificate) {
            updatedCerts = new TokenAllCerts(this.processTokenCert(response.data.authenticationCertificate, parseCerts))
        }
        if (response.data.citizenCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, this.processTokenCert(response.data.citizenCertificate, parseCerts))
        }
        if (response.data.nonRepudiationCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.citizenCertificate, this.processTokenCert(response.data.nonRepudiationCertificate, parseCerts))
        }
        if (response.data.rootCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.citizenCertificate, updatedCerts.nonRepudiationCertificate, this.processTokenCert(response.data.rootCertificate, parseCerts))
        }
        if (response.data.encryptionCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.citizenCertificate, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processTokenCert(response.data.encryptionCertificate, parseCerts))
        }

        return ResponseHandler.response(new TokenAllCertsResponse(updatedCerts,response.success), callback)
    }

    public static processTokenCertificate(response: TokenCertificateResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void):  Promise<TokenCertificateResponse> {
        return ResponseHandler.response(new TokenCertificateResponse(this.processTokenCert(response.data, parseCerts), response.success), callback);
    }

    private static processTokenCert(certificate: TokenCertificate, parseCert: boolean | undefined): TokenCertificate {
        if (parseCert && parseCert === true) {
            let parsedCertificates: Array<Certificate> | undefined = undefined;
            let parsedCertificate: Certificate | undefined = undefined;

            if (certificate.certificates) {
                parsedCertificates = new Array<Certificate>();
                certificate.certificates.forEach(_cert => {
                    // @ts-ignore
                    parsedCertificates.push(CertParser.processCert(_cert))
                })
            }

            if (certificate.certificate) {
                parsedCertificate = CertParser.processCert(certificate.certificate)
            }
            return new TokenCertificate(certificate.certificate, certificate.certificates, certificate.certificateType, certificate.id, parsedCertificate, parsedCertificates);

        } else {
            return certificate;
        }
    }



    public static processPaymentAllCertificates(response: PaymentAllCertsResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void):  Promise<PaymentAllCertsResponse> {
        let updatedCerts = new PaymentAllCerts();
        if (response.data.issuerPublicCertificate) {
            updatedCerts = new PaymentAllCerts(this.processTokenCert(response.data.issuerPublicCertificate, parseCerts))
        }
        if (response.data.iccPublicCertificate) {
            updatedCerts = new PaymentAllCerts(updatedCerts.issuerPublicCertificate, this.processTokenCert(response.data.iccPublicCertificate, parseCerts))
        }
        return ResponseHandler.response(new PaymentAllCertsResponse(updatedCerts,response.success), callback)
    }

    public static processPaymentCertificate(response: PaymentCertificateResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void):  Promise<PaymentCertificateResponse> {
        return ResponseHandler.response(new PaymentCertificateResponse(this.processPaymentCert(response.data, parseCerts), response.success), callback);
    }

    private static processPaymentCert(certificate: PaymentCertificate, parseCert: boolean | undefined): PaymentCertificate {
        if (parseCert && parseCert === true) {
            let parsedCertificate: Certificate | undefined = undefined;

            if (certificate.certificate) {
                parsedCertificate = CertParser.processCert(certificate.certificate)
            }
            return new PaymentCertificate(certificate.certificate, certificate.exponent, certificate.remainder, parsedCertificate);

        } else {
            return certificate;
        }
    }



    public static processCert(certificate: string): Certificate {
        let rawCert = Base64.atob(certificate);
        let buffer = CertParser.str2ab(rawCert);
        const asn1 = asn1js.fromBER(buffer);
        return new Certificate({ schema: asn1.result });
    }

    // function to convert string to ArrayBuffer
    private static str2ab(str: string) {
        let buf = new ArrayBuffer(str.length);
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) { bufView[i] = str.charCodeAt(i); }

        return buf;
    }

}
