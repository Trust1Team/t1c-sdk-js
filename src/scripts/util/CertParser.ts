import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import {T1CLibException} from '../core/exceptions/CoreExceptions';
import {T1CCertificate, T1CResponse} from '../core/service/CoreModel';
import Certificate from 'pkijs/build/Certificate';

export class CertParser {
  /*  public static process(
    response: any,
    parseCerts: boolean,
    callback?: (error: T1CLibException, data: T1CResponse) => void
  ): Promise<any> {
    // check if data has properties
    if (
      response &&
      response.data &&
      typeof response.data === 'object' &&
      !Array.isArray(response.data)
    ) {
      // tslint:disable-next-line:forin
      for (const key in response.data) {
        const value = response.data[key];
        if (key.indexOf('certificate') > -1) {
          if (typeof value === 'string') {
            response.data[key] = {base64: value};
            CertParser.setParsed(response.data[key], value, parseCerts);
          } else if (Array.isArray(value)) {
            const newData: Certificate = [];
            value.forEach((certificate: string) => {
              const cert: T1CCertificate = new T1CCertificate(certificate);
              CertParser.setParsed(cert, certificate, parseCerts);
              newData.push(cert);
            });
            response.data[key] = newData;
          } else if (typeof value === 'object') {
            response.data[key] = {base64: value.base64};
            // only aventra, oberthur en pkcs11 have id property returned from GCL, other cards can use fixed location
            if (value.id) {
              response.data[key].id = value.id;
            }
            if (parseCerts) {
              response.data[key].parsed = CertParser.processCert(value.base64);
            }
          }
        }
      }
    } else {
      // assuming data is a string or string[]
      if (Array.isArray(response.data)) {
        const newData: Certificate = [];
        response.data.forEach(
          (certificate: string | {base64: string; id: string}) => {
            if (typeof certificate === 'string') {
              const cert: T1CCertificate = new T1CCertificate(certificate);
              CertParser.setParsed(cert, certificate, parseCerts);
              newData.push(cert);
            } else {
              // assume object
              const cert: T1CCertificate = new T1CCertificate(
                certificate.base64,
                certificate.id
              );
              CertParser.setParsed(cert, certificate.base64, parseCerts);
              newData.push(cert);
            }
          }
        );
        response.data = newData;
      } else {
        const cert: T1CCertificate = new T1CCertificate(response.data);
        CertParser.setParsed(cert, response.data, parseCerts);
        response.data = cert;
      }
    }
    return ResponseHandler.response(response, callback);
  }*/

  public static processCert(certificate: string): Certificate {
    const rawCert = Base64.atob(certificate);
    const buffer = CertParser.str2ab(rawCert);
    const asn1 = asn1js.fromBER(buffer);
    return new Certificate({schema: asn1.result});
  }

  // function to convert string to ArrayBuffer
  private static str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }

    return buf;
  }

  private static setParsed(
    cert: T1CCertificate,
    base64: string,
    parseCerts: boolean
  ) {
    if (parseCerts) {
      cert.parsed = CertParser.processCert(base64);
    } else {
      delete cert.parsed;
    }
  }
}
