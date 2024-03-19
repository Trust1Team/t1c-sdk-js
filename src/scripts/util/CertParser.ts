import * as asn1js from 'asn1js';
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
    public static processExtendedTokenCertificate(response: TokenCertificateExtendedResponse, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void):  Promise<TokenCertificateExtendedResponse> {
        return ResponseHandler.response(new TokenCertificateExtendedResponse(this.processExtendedTokenCert(response.data), response.success), callback);
    }


    // certificate parse function for extended token certificate list, introduced in 3.6.0
    public static processExtendedTokenAllCertificates(response: TokenAllCertsExtendedResponse, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void):  Promise<TokenAllCertsExtendedResponse> {
        let updatedCerts = new TokenAllCertsExtended();
        if (response.data.authenticationCertificate) {
            updatedCerts = new TokenAllCertsExtended(this.processExtendedTokenCert(response.data.authenticationCertificate))
        }
        if (response.data.intermediateCertificates) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, this.processExtendedTokenCert(response.data.intermediateCertificates))
        }
        if (response.data.nonRepudiationCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processExtendedTokenCert(response.data.nonRepudiationCertificate))
        }
        if (response.data.rootCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processExtendedTokenCert(response.data.rootCertificate))
        }
        if (response.data.encryptionCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processExtendedTokenCert(response.data.encryptionCertificate))
        }
        if (response.data.issuerCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processExtendedTokenCert(response.data.issuerCertificate))
        }
        if (response.data.issuerPublicCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, updatedCerts.issuerCertificate, this.processExtendedTokenCert(response.data.issuerPublicCertificate))
        }
        if (response.data.ICCPublicCertificate) {
            updatedCerts = new TokenAllCertsExtended(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, updatedCerts.issuerCertificate, updatedCerts.issuerPublicCertificate, this.processExtendedTokenCert(response.data.ICCPublicCertificate))
        }

        return ResponseHandler.response(new TokenAllCertsExtendedResponse(updatedCerts, response.success), callback)
    }



    // all certificate parse function for version 3.0.0 until 3.5.20
    public static processTokenAllCertificates(response: TokenAllCertsResponse, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void):  Promise<TokenAllCertsResponse> {
        let updatedCerts = new TokenAllCerts();
        if (response.data.authenticationCertificate) {
            updatedCerts = new TokenAllCerts(this.processTokenCert(response.data.authenticationCertificate))
        }
        if (response.data.intermediateCertificates) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, this.processTokenCert(response.data.intermediateCertificates))
        }
        if (response.data.nonRepudiationCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processTokenCert(response.data.nonRepudiationCertificate))
        }
        if (response.data.rootCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processTokenCert(response.data.rootCertificate))
        }
        if (response.data.encryptionCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processTokenCert(response.data.encryptionCertificate))
        }
        if (response.data.issuerCertificate) {
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processTokenCert(response.data.issuerCertificate))
        }

        return ResponseHandler.response(new TokenAllCertsResponse(updatedCerts,response.success), callback)
    }

    // certificate parse function for version 3.6.0 or later
    // will only take the first certificate found
    // If all certs are required, use processExtendedTokenAllCertificates
    public static processTokenAllCertificates36(response: TokenAllCertsExtendedResponse, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void):  Promise<TokenAllCertsResponse> {
        let updatedCerts = new TokenAllCerts();
        if (response.data.authenticationCertificate && response.data.authenticationCertificate.certificates && response.data.authenticationCertificate.certificates.length > 0) {
                const cert = response.data.authenticationCertificate.certificates[0];
                const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
                updatedCerts = new TokenAllCerts(this.processTokenCert(tokenCert))
        }
        if (response.data.intermediateCertificates && response.data.intermediateCertificates.certificates && response.data.intermediateCertificates.certificates.length > 0) {
            const cert = response.data.intermediateCertificates.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, this.processTokenCert(tokenCert))
        }
        if (response.data.nonRepudiationCertificate && response.data.nonRepudiationCertificate.certificates && response.data.nonRepudiationCertificate.certificates.length > 0) {
            const cert = response.data.nonRepudiationCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, this.processTokenCert(tokenCert))
        }
        if (response.data.rootCertificate && response.data.rootCertificate.certificates && response.data.rootCertificate.certificates.length > 0) {
            const cert = response.data.rootCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, this.processTokenCert(tokenCert))
        }
        if (response.data.encryptionCertificate && response.data.encryptionCertificate.certificates && response.data.encryptionCertificate.certificates.length > 0) {
            const cert = response.data.encryptionCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, this.processTokenCert(tokenCert))
        }
        if (response.data.issuerCertificate && response.data.issuerCertificate.certificates && response.data.issuerCertificate.certificates.length > 0) {
            const cert = response.data.issuerCertificate.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            updatedCerts = new TokenAllCerts(updatedCerts.authenticationCertificate, updatedCerts.intermediateCertificates, updatedCerts.nonRepudiationCertificate, updatedCerts.rootCertificate, updatedCerts.encryptionCertificate, this.processTokenCert(tokenCert))
        }

        return ResponseHandler.response(new TokenAllCertsResponse(updatedCerts,response.success), callback)
    }

    // certificate parse function for version 3.0.0 until 3.5.20
    public static processTokenCertificate(response: TokenCertificateResponse, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void):  Promise<TokenCertificateResponse> {
        return ResponseHandler.response(new TokenCertificateResponse(this.processTokenCert(response.data), response.success), callback);
    }

    // certificate parse function for version 3.6.0 or later
    public static processTokenCertificate36(response: TokenCertificateExtendedResponse, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void):  Promise<TokenCertificateResponse> {
        if (response.data.certificates) {
            const cert = response.data.certificates[0];
            const tokenCert = new TokenCertificate(cert.certificate, undefined, cert.certificateType, cert.id)
            return ResponseHandler.response(new TokenCertificateResponse(this.processTokenCert(tokenCert), response.success), callback);
        } else {
            return ResponseHandler.error(new T1CLibException('302102', "Certificates not found"), callback)
        }
    }

    private static processTokenCert(certificate: TokenCertificate): TokenCertificate {
        return certificate;
    }


    private static processExtendedTokenCert(certificate: TokenCertificateExtended): TokenCertificateExtended {
        return certificate;
    }


    public static processPaymentAllCertificates(response: PaymentAllCertsResponse, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void):  Promise<PaymentAllCertsResponse> {
        let updatedCerts = new PaymentAllCerts();
        if (response.data.issuerPublicCertificate) {
            updatedCerts = new PaymentAllCerts(this.processPaymentCert(response.data.issuerPublicCertificate))
        }
        if (response.data.ICCPublicCertificate) {
            updatedCerts = new PaymentAllCerts(updatedCerts.issuerPublicCertificate, this.processPaymentCert(response.data.ICCPublicCertificate))
        }
        return ResponseHandler.response(new PaymentAllCertsResponse(updatedCerts,response.success), callback)
    }

    // certificate parse function for version 3.6.0 or later
    public static processPaymentAllCertificates36(response: TokenAllCertsExtendedResponse, callback?: (error: T1CLibException, data: PaymentAllCertsResponse) => void):  Promise<PaymentAllCertsResponse> {
        let updatedCerts = new PaymentAllCerts();
        if (response.data.issuerPublicCertificate) {
            updatedCerts = new PaymentAllCerts(this.processPaymentCert36(response.data.issuerPublicCertificate.certificates))
        }
        if (response.data.ICCPublicCertificate) {
            updatedCerts = new PaymentAllCerts(updatedCerts.issuerPublicCertificate, this.processPaymentCert36(response.data.ICCPublicCertificate.certificates))
        }
        return ResponseHandler.response(new PaymentAllCertsResponse(updatedCerts,response.success), callback)
    }



    public static processPaymentCertificate(response: PaymentCertificateResponse, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void):  Promise<PaymentCertificateResponse> {
        return ResponseHandler.response(new PaymentCertificateResponse(this.processPaymentCert(response.data), response.success), callback);
    }

    public static processPaymentCertificate36(response: TokenCertificateExtendedResponse, callback?: (error: T1CLibException, data: PaymentCertificateResponse) => void):  Promise<PaymentCertificateResponse> {
        if (response.data.certificates) {
            const cert = response.data.certificates[0];
            const tokenCert = new PaymentCertificate(cert.certificate, cert.exponent, cert.remainder)
            return ResponseHandler.response(new PaymentCertificateResponse(this.processPaymentCert(tokenCert), response.success), callback);
        } else {
            return ResponseHandler.error(new T1CLibException('302102', "Certificates not found"), callback)
        }
    }

    private static processPaymentCert(certificate: PaymentCertificate): PaymentCertificate {
        return certificate;
    }

    // @ts-ignore
    private static processPaymentCert36(certificate?: Array<T1CCertificate>): PaymentCertificate| undefined {
        if (certificate) {
            return certificate[0];
        } else {
            return undefined
        }

    }

}
