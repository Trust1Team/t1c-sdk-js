import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import Certificate from 'pkijs/src/Certificate';
var CertParser = (function () {
    function CertParser() {
    }
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