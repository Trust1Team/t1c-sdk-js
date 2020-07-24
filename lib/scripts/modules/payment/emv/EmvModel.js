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
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../..");
var VerifyPinResponse = (function (_super) {
    __extends(VerifyPinResponse, _super);
    function VerifyPinResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return VerifyPinResponse;
}(__1.DataObjectResponse));
exports.VerifyPinResponse = VerifyPinResponse;
var VerifyPinResponseData = (function () {
    function VerifyPinResponseData(verified) {
        this.verified = verified;
    }
    return VerifyPinResponseData;
}());
exports.VerifyPinResponseData = VerifyPinResponseData;
var AllCertsResponse = (function (_super) {
    __extends(AllCertsResponse, _super);
    function AllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllCertsResponse;
}(__1.DataObjectResponse));
exports.AllCertsResponse = AllCertsResponse;
var AllCerts = (function () {
    function AllCerts(issuerPublicCertificate, iccPublicCertificate) {
        this.issuerPublicCertificate = issuerPublicCertificate;
        this.iccPublicCertificate = iccPublicCertificate;
    }
    return AllCerts;
}());
exports.AllCerts = AllCerts;
var ReadData = (function () {
    function ReadData(applications) {
        this.applications = applications;
    }
    return ReadData;
}());
exports.ReadData = ReadData;
var Application = (function () {
    function Application(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
    return Application;
}());
exports.Application = Application;
var ReadDataResponse = (function (_super) {
    __extends(ReadDataResponse, _super);
    function ReadDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ReadDataResponse;
}(__1.DataObjectResponse));
exports.ReadDataResponse = ReadDataResponse;
var ReadApplicationData = (function () {
    function ReadApplicationData(country, countryCode, effectiveDate, expirationDate, language, name, pan) {
    }
    return ReadApplicationData;
}());
exports.ReadApplicationData = ReadApplicationData;
var ReadApplicationDataResponse = (function (_super) {
    __extends(ReadApplicationDataResponse, _super);
    function ReadApplicationDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ReadApplicationDataResponse;
}(__1.DataObjectResponse));
exports.ReadApplicationDataResponse = ReadApplicationDataResponse;
var EmvCertificateResponse = (function (_super) {
    __extends(EmvCertificateResponse, _super);
    function EmvCertificateResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvCertificateResponse;
}(__1.DataObjectResponse));
exports.EmvCertificateResponse = EmvCertificateResponse;
var EmvCertificate = (function () {
    function EmvCertificate(certificate, exponent, remainder) {
    }
    return EmvCertificate;
}());
exports.EmvCertificate = EmvCertificate;
//# sourceMappingURL=EmvModel.js.map