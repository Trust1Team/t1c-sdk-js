"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("../../../../util/RequestHandler");
var EidGeneric = (function () {
    function EidGeneric(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    EidGeneric.prototype.allData = function (module, options, callback) {
        var requestOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.ALL_DATA), requestOptions.params);
    };
    EidGeneric.prototype.biometric = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.BIOMETRIC), undefined, undefined, callback);
    };
    EidGeneric.prototype.address = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.ADDRESS), undefined, undefined, callback);
    };
    EidGeneric.prototype.tokenData = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.TOKEN), undefined, undefined, callback);
    };
    EidGeneric.prototype.picture = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.PHOTO), undefined, undefined, callback);
    };
    EidGeneric.prototype.rootCertificate = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.CERT_ROOT), undefined, undefined, callback);
    };
    EidGeneric.prototype.intermediateCertificates = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.CERT_INTERMEDIATE), undefined, undefined, callback);
    };
    EidGeneric.prototype.authenticationCertificate = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.CERT_AUTHENTICATION), undefined, undefined, callback);
    };
    EidGeneric.prototype.nonRepudiationCertificate = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.CERT_NON_REPUDIATION), undefined, undefined, callback);
    };
    EidGeneric.prototype.encryptionCertificate = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.CERT_ENCRYPTION), undefined, undefined, callback);
    };
    EidGeneric.prototype.allAlgoRefs = function (module, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    EidGeneric.prototype.allCerts = function (module, options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(module, EidGeneric.ALL_CERTIFICATES), reqOptions.params);
    };
    EidGeneric.prototype.verifyPin = function (module, body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(module, EidGeneric.VERIFY_PIN), body, undefined, undefined, callback);
    };
    EidGeneric.prototype.authenticate = function (module, body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(module, EidGeneric.AUTHENTICATE), body, undefined, undefined, callback);
    };
    EidGeneric.prototype.sign = function (module, body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(module, EidGeneric.SIGN_DATA), body, undefined, undefined, callback);
    };
    EidGeneric.prototype.tokenApp = function (module, path) {
        var suffix = this.containerUrl;
        suffix += module;
        suffix += EidGeneric.PATH_TOKEN_APP + EidGeneric.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    EidGeneric.prototype.baseApp = function (module, path) {
        var suffix = this.containerUrl;
        suffix += module;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    EidGeneric.prototype.getModuleDescription = function (module, callback) {
        return this.connection.get(this.baseUrl, this.baseApp(module, EidGeneric.PATH_MOD_DESC), undefined, undefined, callback);
    };
    EidGeneric.PATH_TOKEN_APP = '/apps/token';
    EidGeneric.PATH_MOD_DESC = '/desc';
    EidGeneric.PATH_READERS = '/readers';
    EidGeneric.ALL_DATA = '/all-data';
    EidGeneric.ALL_CERTIFICATES = '/cert-list';
    EidGeneric.CERT_ROOT = '/root-cert';
    EidGeneric.CERT_AUTHENTICATION = '/authentication-cert';
    EidGeneric.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    EidGeneric.CERT_ENCRYPTION = '/encryption-cert';
    EidGeneric.CERT_INTERMEDIATE = '/intermediate-certs';
    EidGeneric.BIOMETRIC = '/biometric';
    EidGeneric.ADDRESS = '/address';
    EidGeneric.PHOTO = '/picture';
    EidGeneric.TOKEN = '/info';
    EidGeneric.VERIFY_PIN = '/verify-pin';
    EidGeneric.SIGN_DATA = '/sign';
    EidGeneric.AUTHENTICATE = '/authenticate';
    EidGeneric.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    EidGeneric.SUPPORTED_ALGOS = '/supported-algorithms';
    return EidGeneric;
}());
exports.EidGeneric = EidGeneric;
//# sourceMappingURL=EidGeneric.js.map