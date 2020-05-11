"use strict";
/**
 * @author Maarten Somers
 */
exports.__esModule = true;
var asn1js = require("asn1js");
var Base64 = require("Base64");
var Certificate_1 = require("pkijs/build/Certificate");
var CoreModel_1 = require("../core/service/CoreModel");
var ResponseHandler_1 = require("./ResponseHandler");
var CertParser = /** @class */ (function () {
    function CertParser() {
    }
    CertParser.process = function (response, parseCerts, callback) {
        // check if data has properties
        if (response && response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
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
                            var cert = new CoreModel_1.T1CCertificate(certificate);
                            CertParser.setParsed(cert, certificate, parseCerts);
                            newData_1.push(cert);
                        });
                        response.data[key] = newData_1;
                    }
                    else if (typeof value === 'object') {
                        response.data[key] = { base64: value.base64 };
                        // only aventra, oberthur en pkcs11 have id property returned from GCL, other cards can use fixed location
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
            // assuming data is a string or string[]
            if (Array.isArray(response.data)) {
                var newData_2 = [];
                response.data.forEach(function (certificate) {
                    if (typeof certificate === 'string') {
                        var cert = new CoreModel_1.T1CCertificate(certificate);
                        CertParser.setParsed(cert, certificate, parseCerts);
                        newData_2.push(cert);
                    }
                    else {
                        // assume object
                        var cert = new CoreModel_1.T1CCertificate(certificate.base64, certificate.id);
                        CertParser.setParsed(cert, certificate.base64, parseCerts);
                        newData_2.push(cert);
                    }
                });
                response.data = newData_2;
            }
            else {
                var cert = new CoreModel_1.T1CCertificate(response.data);
                CertParser.setParsed(cert, response.data, parseCerts);
                response.data = cert;
            }
        }
        return ResponseHandler_1.ResponseHandler.response(response, callback);
    };
    CertParser.processCert = function (certificate) {
        var rawCert = Base64.atob(certificate);
        var buffer = CertParser.str2ab(rawCert);
        var asn1 = asn1js.fromBER(buffer);
        return new Certificate_1["default"]({ schema: asn1.result });
    };
    // function to convert string to ArrayBuffer
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
exports.CertParser = CertParser;
