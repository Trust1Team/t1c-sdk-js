import { RequestHandler } from "../../../util/RequestHandler";
var Emv = (function () {
    function Emv(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    Emv.prototype.allCerts = function (aid, filters, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(filters);
        return this.connection.get(this.baseUrl, this.paymentApp(Emv.ALL_CERTIFICATES, aid), reqOptions.params);
    };
    Emv.prototype.iccPublicCertificate = function (aid, callback) {
        return this.connection.get(this.baseUrl, this.paymentApp(Emv.CERT_ICC, aid), undefined, undefined, callback);
    };
    Emv.prototype.issuerPublicCertificate = function (aid, callback) {
        return this.connection.get(this.baseUrl, this.paymentApp(Emv.CERT_ISSUER, aid), undefined, undefined, callback);
    };
    Emv.prototype.readApplicationData = function (callback) {
        return this.connection.get(this.baseUrl, this.paymentApp(Emv.READ_APPLICATION_DATA), undefined, undefined, callback);
    };
    Emv.prototype.readData = function (callback) {
        return this.connection.get(this.baseUrl, this.paymentApp(Emv.READ_DATA), undefined, undefined, callback);
    };
    Emv.prototype.verifyPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.paymentApp(Emv.VERIFY_PIN), body, undefined, undefined, callback);
    };
    Emv.prototype.paymentApp = function (path, aid) {
        var suffix = this.containerUrl;
        suffix += Emv.PATH_PAYMENT_APP;
        if (aid != undefined) {
            suffix += '/' + aid;
        }
        suffix += Emv.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    Emv.PATH_PAYMENT_APP = '/apps/payment';
    Emv.PATH_READERS = '/readers';
    Emv.ALL_CERTIFICATES = '/cert-list';
    Emv.CERT_ISSUER = '/issuer-cert';
    Emv.CERT_ICC = '/icc-cert';
    Emv.READ_DATA = '/data';
    Emv.READ_APPLICATION_DATA = '/application-data';
    Emv.VERIFY_PIN = '/verify-pin';
    return Emv;
}());
export { Emv };
//# sourceMappingURL=Emv.js.map