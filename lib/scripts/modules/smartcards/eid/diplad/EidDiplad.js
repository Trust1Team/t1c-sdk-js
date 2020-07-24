"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("../../../../util/RequestHandler");
var EidDiplad = (function () {
    function EidDiplad(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    EidDiplad.prototype.allData = function (options, callback) {
        var requestOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.ALL_DATA), requestOptions.params);
    };
    EidDiplad.prototype.biometric = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.RN_DATA), undefined, undefined, callback);
    };
    EidDiplad.prototype.address = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.ADDRESS), undefined, undefined, callback);
    };
    EidDiplad.prototype.tokenData = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.TOKEN), undefined, undefined, callback);
    };
    EidDiplad.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.PHOTO), undefined, undefined, callback);
    };
    EidDiplad.prototype.rootCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.CERT_ROOT), undefined, undefined, callback);
    };
    EidDiplad.prototype.intermediateCertificates = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.CERT_INTERMEDIATE), undefined, undefined, callback);
    };
    EidDiplad.prototype.authenticationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.CERT_AUTHENTICATION), undefined, undefined, callback);
    };
    EidDiplad.prototype.nonRepudiationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.CERT_NON_REPUDIATION), undefined, undefined, callback);
    };
    EidDiplad.prototype.encryptionCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.CERT_ENCRYPTION), undefined, undefined, callback);
    };
    EidDiplad.prototype.allAlgoRefs = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    EidDiplad.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(EidDiplad.ALL_CERTIFICATES), reqOptions.params);
    };
    EidDiplad.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidDiplad.VERIFY_PIN), body, undefined, undefined, callback);
    };
    EidDiplad.prototype.authenticate = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidDiplad.AUTHENTICATE), body, undefined, undefined, callback);
    };
    EidDiplad.prototype.sign = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidDiplad.SIGN_DATA), body, undefined, undefined, callback);
    };
    EidDiplad.prototype.tokenApp = function (path) {
        var suffix = this.containerUrl;
        suffix += EidDiplad.PATH_TOKEN_APP + EidDiplad.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    EidDiplad.PATH_TOKEN_APP = '/apps/token';
    EidDiplad.PATH_READERS = '/readers';
    EidDiplad.ALL_DATA = '/all-data';
    EidDiplad.ALL_CERTIFICATES = '/cert-list';
    EidDiplad.CERT_ROOT = '/root-cert';
    EidDiplad.CERT_AUTHENTICATION = '/authentication-cert';
    EidDiplad.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    EidDiplad.CERT_ENCRYPTION = '/encryption-cert';
    EidDiplad.CERT_INTERMEDIATE = '/intermediate-certs';
    EidDiplad.RN_DATA = '/biometric';
    EidDiplad.ADDRESS = '/address';
    EidDiplad.PHOTO = '/picture';
    EidDiplad.TOKEN = '/info';
    EidDiplad.VERIFY_PIN = '/verify-pin';
    EidDiplad.SIGN_DATA = '/sign';
    EidDiplad.AUTHENTICATE = '/authenticate';
    EidDiplad.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    EidDiplad.SUPPORTED_ALGOS = '/supported-algorithms';
    return EidDiplad;
}());
exports.EidDiplad = EidDiplad;
//# sourceMappingURL=EidDiplad.js.map