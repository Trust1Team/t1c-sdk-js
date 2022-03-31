import * as asn1js from 'asn1js';
import Certificate from 'pkijs/src/Certificate';
import {
    T1CCertificate,
    T1CLibException, TokenAllCertsExtended,
    TokenAllCertsExtendedResponse,
    TokenCertificateExtended,
    TokenCertificateExtendedResponse
} from "../..";
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

    // certificate parse function for extended token certificate, introduced in 3.6.0
    public static processExtendedTokenCertificate(response: TokenCertificateExtendedResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void):  Promise<TokenCertificateExtendedResponse> {
        return ResponseHandler.response(new TokenCertificateExtendedResponse(this.processExtendedTokenCert(response.data, parseCerts), response.success), callback);
    }


    // certificate parse function for extended token certificate list, introduced in 3.6.0
    public static processExtendedTokenAllCertificates(response: TokenAllCertsExtendedResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void):  Promise<TokenAllCertsExtendedResponse> {
        let updatedCerts = new TokenAllCertsExtended();
        if (response.data.authenticationCertificate) {
            updatedCerts = new TokenAllCertsExtended(this.processExtendedTokenCert(response.data.authenticationCertificate, parseCerts))
        }
        if (response.data.intermediateCertificates) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, this.processExtendedTokenCert(response.data.intermediateCertificates, parseCerts))
        }
        if (response.data.nonRepudiationCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processExtendedTokenCert(response.data.nonRepudiationCertificate, parseCerts))
        }
        if (response.data.rootCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processExtendedTokenCert(response.data.rootCertificate, parseCerts))
        }
        if (response.data.encryptionCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processExtendedTokenCert(response.data.encryptionCertificate, parseCerts))
        }
        if (response.data.issuerCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processExtendedTokenCert(response.data.issuerCertificate, parseCerts))
        }

        return ResponseHandler.response(new TokenAllCertsExtendedResponse(updatedCerts, response.success), callback)
    }



    // all certificate parse function for version 3.0.0 until 3.5.20
    public static processTokenAllCertificates(response: TokenAllCertsResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void):  Promise<TokenAllCertsResponse> {
        let updatedCerts = new TokenAllCerts();
        if (response.data.authenticationCertificate) {
            updatedCerts = new TokenAllCerts(this.processTokenCert(response.data.authenticationCertificate, parseCerts))
        }
        if (response.data.intermediateCertificates) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, this.processTokenCert(response.data.intermediateCertificates, parseCerts))
        }
        if (response.data.nonRepudiationCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processTokenCert(response.data.nonRepudiationCertificate, parseCerts))
        }
        if (response.data.rootCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processTokenCert(response.data.rootCertificate, parseCerts))
        }
        if (response.data.encryptionCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processTokenCert(response.data.encryptionCertificate, parseCerts))
        }
        if (response.data.issuerCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processTokenCert(response.data.issuerCertificate, parseCerts))
        }

        return ResponseHandler.response(new TokenAllCertsResponse(updatedCerts,response.success), callback)
    }

    // certificate parse function for version 3.6.0 or later
    public static processTokenAllCertificates36(response: TokenAllCertsExtendedResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void):  Promise<TokenAllCertsResponse> {
        let updatedCerts = new TokenAllCerts();
        if (response.data.authenticationCertificate && response.data.authenticationCertificate.certificates) {
            const cert = response.data.authenticationCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(this.processTokenCert(tokenCert, parseCerts))
        }
        if (response.data.intermediateCertificates && response.data.intermediateCertificates.certificates) {
            const cert = response.data.intermediateCertificates.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, this.processTokenCert(tokenCert, parseCerts))
        }
        if (response.data.nonRepudiationCertificate && response.data.nonRepudiationCertificate.certificates) {
            const cert = response.data.nonRepudiationCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processTokenCert(tokenCert, parseCerts))
        }
        if (response.data.rootCertificate && response.data.rootCertificate.certificates) {
            const cert = response.data.rootCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processTokenCert(tokenCert, parseCerts))
        }
        if (response.data.encryptionCertificate && response.data.encryptionCertificate.certificates) {
            const cert = response.data.encryptionCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processTokenCert(tokenCert, parseCerts))
        }
        if (response.data.issuerCertificate && response.data.issuerCertificate.certificates) {
            const cert = response.data.issuerCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processTokenCert(tokenCert, parseCerts))
        }

        return ResponseHandler.response(new TokenAllCertsResponse(updatedCerts,response.success), callback)
    }

    // certificate parse function for version 3.0.0 until 3.5.20
    public static processTokenCertificate(response: TokenCertificateResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void):  Promise<TokenCertificateResponse> {
        return ResponseHandler.response(new TokenCertificateResponse(this.processTokenCert(response.data, parseCerts), response.success), callback);
    }

    // certificate parse function for version 3.6.0 or later
    public static processTokenCertificate36(response: TokenCertificateExtendedResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void):  Promise<TokenCertificateResponse> {
        if (response.data.certificates) {
            const cert = response.data.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id, undefined, undefined)
            return ResponseHandler.response(new TokenCertificateResponse(this.processTokenCert(tokenCert, parseCerts), response.success), callback);
        } else {
            return ResponseHandler.error(new T1CLibException('302102', "Certificates not found"), callback)
        }
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
                // @ts-ignore
                parsedCertificate = CertParser.processCert(certificate.certificate)
            }
            return new TokenCertificate(certificate.certificate, certificate.certificates, certificate.certificateType, certificate.id, parsedCertificate, parsedCertificates);
        } else {
            return certificate;
        }
    }


    private static processExtendedTokenCert(certificate: TokenCertificateExtended, parseCert: boolean | undefined): TokenCertificateExtended {
        if (parseCert && parseCert === true) {
            let parsedCertificates: Array<T1CCertificate> | undefined = undefined;
            if (certificate.certificates) {
                parsedCertificates = new Array<T1CCertificate>();
                certificate.certificates.forEach(_cert => {
                    // @ts-ignore
                    const parsedCert = CertParser.processCert(_cert.certificate)
                    // @ts-ignore
                    parsedCertificates.push(new T1CCertificate(_cert.certificate, _cert.certificateType, _cert.id, _cert.subject, _cert.issuer, _cert.serialNumber, _cert.url, _cert.hashSubPubKey, _cert.hashIssPubKey, _cert.exponent, _cert.remainder, parsedCert))
                })
            }
            return new TokenCertificateExtended(parsedCertificates);
        } else {
            return certificate;
        }
    }


    public static processPaymentAllCertificates(response: PaymentAllCertsResponse, parseCerts: boolean | undefined, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void):  Promise<PaymentAllCertsResponse> {
        let updatedCerts = new PaymentAllCerts();
        if (response.data.issuerPublicCertificate) {
            updatedCerts = new PaymentAllCerts(this.processPaymentCert(response.data.issuerPublicCertificate, parseCerts))
        }
        if (response.data.iccPublicCertificate) {
            updatedCerts = new PaymentAllCerts(updatedCerts.issuerPublicCertificate, this.processPaymentCert(response.data.iccPublicCertificate, parseCerts))
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
        let rawCert = atob(certificate);
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
