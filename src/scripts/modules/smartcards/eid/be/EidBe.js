"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Card_1 = require("../../Card");
var PinEnforcer_1 = require("../../../../util/PinEnforcer");
var RequestHandler_1 = require("../../../../util/RequestHandler");
var EidBe = /** @class */ (function (_super) {
    __extends(EidBe, _super);
    function EidBe(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, EidBe.CONTAINER_PREFIX) || this;
    }
    EidBe.prototype.rnData = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.RN_DATA), undefined, undefined, callback);
    };
    EidBe.prototype.address = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.ADDRESS), undefined, undefined, callback);
    };
    EidBe.prototype.tokenData = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.TOKEN), undefined, undefined, callback);
    };
    EidBe.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.PHOTO), undefined, undefined, callback);
    };
    EidBe.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.citizenCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.rrnCertificate = function (options, callback) {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidBe.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            var encryptedBody = Object.assign({ private_key_reference: EidBe.VERIFY_PRIV_KEY_REF }, body);
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Card_1.GenericCertCard.VERIFY_PIN), encryptedBody, undefined, undefined, callback);
        });
    };
    EidBe.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            var encryptedBody = Object.assign({ private_key_reference: EidBe.VERIFY_PRIV_KEY_REF }, body);
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Card_1.GenericCertCard.VERIFY_PIN), encryptedBody, undefined, undefined, callback);
        });
    };
    EidBe.CONTAINER_PREFIX = 'beid';
    EidBe.RN_DATA = '/rn';
    EidBe.ADDRESS = '/address';
    EidBe.PHOTO = '/picture';
    EidBe.TOKEN = '/token';
    EidBe.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    return EidBe;
}(Card_1.GenericCertCard));
exports.EidBe = EidBe;
