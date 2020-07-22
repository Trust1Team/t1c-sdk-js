import { RequestHandler } from "../../../../util/RequestHandler";
var EidBe = (function () {
    function EidBe(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    EidBe.prototype.allData = function (options, callback) {
        var requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ALL_DATA), requestOptions.params);
    };
    EidBe.prototype.rnData = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.RN_DATA), undefined, undefined, callback);
    };
    EidBe.prototype.address = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ADDRESS), undefined, undefined, callback);
    };
    EidBe.prototype.tokenData = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.TOKEN), undefined, undefined, callback);
    };
    EidBe.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.PHOTO), undefined, undefined, callback);
    };
    EidBe.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.citizenCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.rrnCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), undefined, undefined, callback);
    };
    EidBe.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), undefined, undefined, callback);
    };
    EidBe.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ALL_CERTIFICATES), reqOptions.params);
    };
    EidBe.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.VERIFY_PIN), body, undefined, undefined, callback);
    };
    EidBe.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.VERIFY_PIN), body, undefined, undefined, callback);
    };
    EidBe.prototype.authenticate = function (body, callback) {
        if (body.algorithm_reference)
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), body, undefined, undefined, callback);
    };
    EidBe.prototype.authenticateWithEncryptedPin = function (body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), body, undefined, undefined, callback);
    };
    EidBe.prototype.signData = function (body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), body, undefined, undefined, callback);
    };
    EidBe.prototype.signDataWithEncryptedPin = function (body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), body, undefined, undefined, callback);
    };
    EidBe.prototype.getCertificate = function (certUrl, options) {
        var self = this;
        return self.connection.get(this.baseUrl, self.tokenApp(EidBe.ALL_CERTIFICATES + certUrl));
    };
    EidBe.prototype.tokenApp = function (path) {
        var suffix = this.containerUrl;
        suffix += EidBe.PATH_TOKEN_APP + EidBe.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    EidBe.PATH_TOKEN_APP = '/apps/token';
    EidBe.PATH_READERS = '/readers';
    EidBe.CONTAINER_PREFIX = 'beid';
    EidBe.ALL_DATA = '/all-data';
    EidBe.ALL_CERTIFICATES = '/certificates';
    EidBe.AUTHENTICATE = '/authenticate';
    EidBe.CERT_ROOT = '/root';
    EidBe.CERT_AUTHENTICATION = '/authentication';
    EidBe.CERT_NON_REPUDIATION = '/non-repudiation';
    EidBe.CERT_ISSUER = '/issuer';
    EidBe.CERT_SIGNING = '/signing';
    EidBe.CERT_ENCRYPTION = '/encryption';
    EidBe.CERT_CITIZEN = '/citizen';
    EidBe.CERT_RRN = '/rrn';
    EidBe.SIGN_DATA = '/sign';
    EidBe.BIOMETRIC = '/rn';
    EidBe.ADDRESS = '/address';
    EidBe.PHOTO = '/picture';
    EidBe.TOKEN = '/token';
    EidBe.VERIFY_PIN = '/verify-pin';
    EidBe.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    return EidBe;
}());
export { EidBe };
//# sourceMappingURL=EidBe.js.map