var Oberthur = (function () {
    function Oberthur(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    Oberthur.prototype.allDataFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Oberthur.prototype.allCertFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Oberthur.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Oberthur.prototype.rootCertificate = function (callback) {
        return this.getCertificate(Oberthur.CERT_ROOT, callback);
    };
    Oberthur.prototype.issuerCertificate = function (callback) {
        return this.getCertificate(Oberthur.CERT_ISSUER, callback);
    };
    Oberthur.prototype.authenticationCertificate = function (callback) {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, callback);
    };
    Oberthur.prototype.signingCertificate = function (callback) {
        return this.getCertificate(Oberthur.CERT_NON_REPUDIATION, callback);
    };
    Oberthur.prototype.encryptionCertificate = function (callback) {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, callback);
    };
    Oberthur.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Oberthur.prototype.resetPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.RESET_PIN), body, undefined, undefined, callback);
    };
    Oberthur.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Oberthur.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Oberthur.prototype.allCerts = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.ALL_CERTIFICATES), queryParams);
    };
    Oberthur.prototype.authenticate = function (body, callback) {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.AUTHENTICATE), body, undefined, undefined, callback);
    };
    Oberthur.prototype.sign = function (body, callback) {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Oberthur.SIGN_DATA), body, undefined, undefined, callback);
    };
    Oberthur.prototype.getCertificate = function (certUrl, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback);
    };
    Oberthur.prototype.allData = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Oberthur.ALL_DATA), queryParams);
    };
    Oberthur.prototype.tokenApp = function (path) {
        var suffix = this.containerUrl;
        suffix += Oberthur.PATH_TOKEN_APP + Oberthur.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    Oberthur.PATH_TOKEN_APP = '/apps/token';
    Oberthur.PATH_READERS = '/readers';
    Oberthur.CONTAINER_PREFIX = 'oberthur_73';
    Oberthur.RESET_PIN = '/reset-pin';
    Oberthur.ALL_DATA = '/all-data';
    Oberthur.ALL_CERTIFICATES = '/cert-list';
    Oberthur.AUTHENTICATE = '/authenticate';
    Oberthur.CERT_ROOT = '/root-cert';
    Oberthur.CERT_AUTHENTICATION = '/authentication-cert';
    Oberthur.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    Oberthur.CERT_ISSUER = '/issuer-cert';
    Oberthur.CERT_ENCRYPTION = '/encryption-cert';
    Oberthur.CERT_RRN = '/encryption-cert';
    Oberthur.SIGN_DATA = '/sign';
    Oberthur.VERIFY_PIN = '/verify-pin';
    Oberthur.SUPPORTED_ALGOS = '/supported-algoritms';
    return Oberthur;
}());
export { Oberthur };
//# sourceMappingURL=Oberthur.js.map