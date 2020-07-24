"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Idemia = (function () {
    function Idemia(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    Idemia.prototype.allDataFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Idemia.prototype.allCertFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Idemia.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Idemia.prototype.rootCertificate = function (callback) {
        return this.getCertificate(Idemia.CERT_ROOT, callback);
    };
    Idemia.prototype.issuerCertificate = function (callback) {
        return this.getCertificate(Idemia.CERT_ISSUER, callback);
    };
    Idemia.prototype.authenticationCertificate = function (callback) {
        return this.getCertificate(Idemia.CERT_AUTHENTICATION, callback);
    };
    Idemia.prototype.signingCertificate = function (callback) {
        return this.getCertificate(Idemia.CERT_NON_REPUDIATION, callback);
    };
    Idemia.prototype.encryptionCertificate = function (callback) {
        return this.getCertificate(Idemia.CERT_ENCRYPTION, callback);
    };
    Idemia.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Idemia.prototype.resetPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.RESET_PIN), body, undefined, undefined, callback);
    };
    Idemia.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Idemia.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Idemia.prototype.allCerts = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.ALL_CERTIFICATES), queryParams);
    };
    Idemia.prototype.authenticate = function (body, callback) {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.AUTHENTICATE), body, undefined, undefined, callback);
    };
    Idemia.prototype.sign = function (body, callback) {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Idemia.SIGN_DATA), body, undefined, undefined, callback);
    };
    Idemia.prototype.getCertificate = function (certUrl, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback);
    };
    Idemia.prototype.allData = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Idemia.ALL_DATA), queryParams);
    };
    Idemia.prototype.tokenApp = function (path) {
        var suffix = this.containerUrl;
        suffix += Idemia.PATH_TOKEN_APP + Idemia.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    Idemia.CONTAINER_PREFIX = 'idemia_cosmo_82';
    Idemia.PATH_TOKEN_APP = '/apps/token';
    Idemia.PATH_READERS = '/readers';
    Idemia.RESET_PIN = '/reset-pin';
    Idemia.ALL_DATA = '/all-data';
    Idemia.ALL_CERTIFICATES = '/cert-list';
    Idemia.AUTHENTICATE = '/authenticate';
    Idemia.CERT_ROOT = '/root-cert';
    Idemia.CERT_AUTHENTICATION = '/authentication-cert';
    Idemia.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    Idemia.CERT_ISSUER = '/issuer-cert';
    Idemia.CERT_ENCRYPTION = '/encryption-cert';
    Idemia.CERT_RRN = '/encryption-cert';
    Idemia.SIGN_DATA = '/sign';
    Idemia.VERIFY_PIN = '/verify-pin';
    Idemia.SUPPORTED_ALGOS = '/supported-algoritms';
    return Idemia;
}());
exports.Idemia = Idemia;
//# sourceMappingURL=Idemia.js.map