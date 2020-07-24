var Aventra = (function () {
    function Aventra(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    Aventra.prototype.allDataFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Aventra.prototype.allCertFilters = function () {
        return ['rootCertificate', 'authenticationCertificate', 'encryptionCertificate', 'nonRepudiationCertificate', 'issuerCertificate'];
    };
    Aventra.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Aventra.prototype.rootCertificate = function (callback) {
        return this.getCertificate(Aventra.CERT_ROOT, callback);
    };
    Aventra.prototype.issuerCertificate = function (callback) {
        return this.getCertificate(Aventra.CERT_ISSUER, callback);
    };
    Aventra.prototype.authenticationCertificate = function (callback) {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, callback);
    };
    Aventra.prototype.signingCertificate = function (callback) {
        return this.getCertificate(Aventra.CERT_NON_REPUDIATION, callback);
    };
    Aventra.prototype.encryptionCertificate = function (callback) {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, callback);
    };
    Aventra.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Aventra.prototype.resetPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN), body, undefined, undefined, callback);
    };
    Aventra.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Aventra.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS), undefined, undefined, callback);
    };
    Aventra.prototype.allCerts = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES), queryParams);
    };
    Aventra.prototype.authenticate = function (body, callback) {
        body.algorithm = body.algorithm.toLowerCase();
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE), body, undefined, undefined, callback);
    };
    Aventra.prototype.sign = function (body, callback) {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA), body, undefined, undefined, callback);
    };
    Aventra.prototype.getCertificate = function (certUrl, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl), undefined, callback);
    };
    Aventra.prototype.allData = function (queryParams, callback) {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_DATA), queryParams);
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
    Aventra.CONTAINER_PREFIX = 'aventra4';
    Aventra.PATH_TOKEN_APP = '/apps/token';
    Aventra.PATH_READERS = '/readers';
    Aventra.RESET_PIN = '/reset-pin';
    Aventra.ALL_DATA = '/all-data';
    Aventra.ALL_CERTIFICATES = '/cert-list';
    Aventra.AUTHENTICATE = '/authenticate';
    Aventra.CERT_ROOT = '/root-cert';
    Aventra.CERT_AUTHENTICATION = '/authentication-cert';
    Aventra.CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    Aventra.CERT_ISSUER = '/issuer-cert';
    Aventra.CERT_ENCRYPTION = '/encryption-cert';
    Aventra.CERT_RRN = '/encryption-cert';
    Aventra.SIGN_DATA = '/sign';
    Aventra.VERIFY_PIN = '/verify-pin';
    Aventra.SUPPORTED_ALGOS = '/supported-algoritms';
    return Aventra;
}());
export { Aventra };
//# sourceMappingURL=Aventra.js.map