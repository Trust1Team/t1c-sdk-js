import { RequestHandler } from '../../../../util/RequestHandler';
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
    EidBe.prototype.biometric = function (callback) {
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
    EidBe.prototype.rootCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.CERT_ROOT), undefined, undefined, callback);
    };
    EidBe.prototype.intermediateCertificates = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.CERT_INTERMEDIATE), undefined, undefined, callback);
    };
    EidBe.prototype.authenticationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.CERT_AUTHENTICATION), undefined, undefined, callback);
    };
    EidBe.prototype.nonRepudiationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.CERT_NON_REPUDIATION), undefined, undefined, callback);
    };
    EidBe.prototype.encryptionCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.CERT_ENCRYPTION), undefined, undefined, callback);
    };
    EidBe.prototype.allAlgoRefs = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    EidBe.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.tokenApp(EidBe.ALL_CERTIFICATES), reqOptions.params);
    };
    EidBe.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.VERIFY_PIN), body, undefined, undefined, callback);
    };
    EidBe.prototype.authenticate = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.AUTHENTICATE), body, undefined, undefined, callback);
    };
    EidBe.prototype.sign = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(EidBe.SIGN_DATA), body, undefined, undefined, callback);
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
    EidBe.ALL_DATA = '/all-data';
    EidBe.ALL_CERTIFICATES = '/cert-list';
    EidBe.CERT_ROOT = '/root-cert';
    EidBe.CERT_AUTHENTICATION = '/authentication-cert';
    EidBe.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    EidBe.CERT_ENCRYPTION = '/encryption-cert';
    EidBe.CERT_INTERMEDIATE = '/intermediate-certs';
    EidBe.RN_DATA = '/biometric';
    EidBe.ADDRESS = '/address';
    EidBe.PHOTO = '/picture';
    EidBe.TOKEN = '/info';
    EidBe.VERIFY_PIN = '/verify-pin';
    EidBe.SIGN_DATA = '/sign';
    EidBe.AUTHENTICATE = '/authenticate';
    EidBe.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    EidBe.SUPPORTED_ALGOS = '/supported-algorithms';
    return EidBe;
}());
export { EidBe };
//# sourceMappingURL=EidBe.js.map