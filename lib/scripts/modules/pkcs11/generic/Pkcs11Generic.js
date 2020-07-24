"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pkcs11GenericModel_1 = require("./Pkcs11GenericModel");
var Pkcs11Generic = (function () {
    function Pkcs11Generic(baseUrl, containerUrl, connection) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
    }
    Pkcs11Generic.prototype.certificates = function (slotId, alias, data, callback) {
        return this.connection.post(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.ALL_CERTIFICATES, slotId, alias), data, undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.info = function (callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.INFO), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.signData = function (slotId, alias, data, callback) {
        return this.connection.post(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.SIGN, slotId, alias), data, undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.slots = function (callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.SLOTS), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.slotsWithTokenPresent = function (callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.SLOTS), {
            "tokenPresent": true
        }, undefined, callback);
    };
    Pkcs11Generic.prototype.token = function (slotId, callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.TOKEN, slotId), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.clearConfig = function (callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.CLEAR_CONFIG), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.getConfig = function (callback) {
        return this.connection.get(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.GET_CONFIG), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.uploadConfig = function (config, callback) {
        return this.connection.put(this.baseUrl, this.genericPkcs11Path(Pkcs11Generic.UPLOAD_CONFIG), new Pkcs11GenericModel_1.Pkcs11Config(config), undefined, undefined, callback);
    };
    Pkcs11Generic.prototype.genericPkcs11Path = function (path, slotNumber, alias) {
        var suffix = this.containerUrl;
        if (slotNumber) {
            suffix += Pkcs11Generic.PATH_SLOT_ID + slotNumber;
        }
        if (alias) {
            suffix += Pkcs11Generic.PATH_SLOT_ALIAS + alias;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    Pkcs11Generic.PATH_SLOT_ID = '/slots/';
    Pkcs11Generic.PATH_SLOT_ALIAS = '/aliases/';
    Pkcs11Generic.ALL_CERTIFICATES = '/certificates';
    Pkcs11Generic.INFO = '/info';
    Pkcs11Generic.SIGN = '/sign';
    Pkcs11Generic.SLOTS = '/slots';
    Pkcs11Generic.TOKEN = '/token';
    Pkcs11Generic.UPLOAD_CONFIG = '/config';
    Pkcs11Generic.GET_CONFIG = '/config';
    Pkcs11Generic.CLEAR_CONFIG = '/config/clear';
    return Pkcs11Generic;
}());
exports.Pkcs11Generic = Pkcs11Generic;
//# sourceMappingURL=Pkcs11Generic.js.map