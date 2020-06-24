import { RequestHandler } from '../../../../util/RequestHandler';
var Aventra = (function () {
    function Aventra(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    Aventra.prototype.allDataFilters = function () {
        return ['applet-info', 'root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Aventra.prototype.allCertFilters = function () {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Aventra.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Aventra.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.issuerCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.encryptionCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Aventra.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Aventra.prototype.resetPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN), body, undefined, undefined, callback);
    };
    Aventra.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), undefined, undefined, callback);
    };
    Aventra.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), undefined, undefined, callback);
    };
    Aventra.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES), reqOptions.params);
    };
    Aventra.prototype.authenticate = function (body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    };
    Aventra.prototype.authenticateWithEncryptedPin = function (body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    };
    Aventra.prototype.signData = function (body, callback) {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    };
    Aventra.prototype.signDataWithEncryptedPin = function (body, callback) {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    };
    Aventra.prototype.getCertificate = function (certUrl, options) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES + certUrl), undefined);
    };
    Aventra.prototype.allData = function (options, callback) {
        var requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(), requestOptions.params);
    };
    Aventra.prototype.tokenApp = function (path) {
        var suffix = this.containerUrl;
        suffix += Aventra.PATH_TOKEN_APP + Aventra.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    Aventra.PATH_TOKEN_APP = '/apps/token';
    Aventra.PATH_READERS = '/readers';
    Aventra.CONTAINER_PREFIX = 'aventra4';
    Aventra.RESET_PIN = '/reset-pin';
    Aventra.ALL_CERTIFICATES = '/cert-list';
    Aventra.AUTHENTICATE = '/authenticate';
    Aventra.CERT_ROOT = '/root';
    Aventra.CERT_AUTHENTICATION = '/authentication';
    Aventra.CERT_NON_REPUDIATION = '/non-repudiation';
    Aventra.CERT_ISSUER = '/issuer';
    Aventra.CERT_SIGNING = '/signing';
    Aventra.CERT_ENCRYPTION = '/encryption';
    Aventra.CERT_CITIZEN = '/citizen';
    Aventra.CERT_RRN = '/enc-cert';
    Aventra.SIGN_DATA = '/sign';
    Aventra.VERIFY_PIN = '/verify-pin';
    return Aventra;
}());
export { Aventra };
//# sourceMappingURL=Aventra.js.map