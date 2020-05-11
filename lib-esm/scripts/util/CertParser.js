import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import { T1CCertificate } from '../core/service/CoreModel';
import Certificate from 'pkijs/build/Certificate';
var CertParser = (function () {
    function CertParser() {
    }
    CertParser.process = function (response, parseCerts, callback) {
        if (response &&
            response.data &&
            typeof response.data === 'object' &&
            !Array.isArray(response.data)) {
            var _loop_1 = function (key) {
                var value = response.data[key];
                if (key.indexOf('certificate') > -1) {
                    if (typeof value === 'string') {
                        response.data[key] = { base64: value };
                        CertParser.setParsed(response.data[key], value, parseCerts);
                    }
                    else if (Array.isArray(value)) {
                        var newData_1 = [];
                        value.forEach(function (certificate) {
                            var cert = new T1CCertificate(certificate);
                            CertParser.setParsed(cert, certificate, parseCerts);
                            newData_1.push(cert);
                        });
                        response.data[key] = newData_1;
                    }
                    else if (typeof value === 'object') {
                        response.data[key] = { base64: value.base64 };
                        if (value.id) {
                            response.data[key].id = value.id;
                        }
                        if (parseCerts) {
                            response.data[key].parsed = CertParser.processCert(value.base64);
                        }
                    }
                }
            };
            for (var key in response.data) {
                _loop_1(key);
            }
        }
        else {
            if (Array.isArray(response.data)) {
                var newData_2 = [];
                response.data.forEach(function (certificate) {
                    if (typeof certificate === 'string') {
                        var cert = new T1CCertificate(certificate);
                        CertParser.setParsed(cert, certificate, parseCerts);
                        newData_2.push(cert);
                    }
                    else {
                        var cert = new T1CCertificate(certificate.base64, certificate.id);
                        CertParser.setParsed(cert, certificate.base64, parseCerts);
                        newData_2.push(cert);
                    }
                });
                response.data = newData_2;
            }
            else {
                var cert = new T1CCertificate(response.data);
                CertParser.setParsed(cert, response.data, parseCerts);
                response.data = cert;
            }
        }
        return ResponseHandler.response(response, callback);
    };
    CertParser.processCert = function (certificate) {
        var rawCert = Base64.atob(certificate);
        var buffer = CertParser.str2ab(rawCert);
        var asn1 = asn1js.fromBER(buffer);
        return new Certificate({ schema: asn1.result });
    };
    CertParser.str2ab = function (str) {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    CertParser.setParsed = function (cert, base64, parseCerts) {
        if (parseCerts) {
            cert.parsed = CertParser.processCert(base64);
        }
        else {
            delete cert.parsed;
        }
    };
    return CertParser;
}());
export { CertParser };
//# sourceMappingURL=CertParser.js.map