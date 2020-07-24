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
import { DataObjectResponse } from "../../../..";
var VerifyPinResponse = (function (_super) {
    __extends(VerifyPinResponse, _super);
    function VerifyPinResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return VerifyPinResponse;
}(DataObjectResponse));
export { VerifyPinResponse };
var VerifyPinResponseData = (function () {
    function VerifyPinResponseData(verified) {
        this.verified = verified;
    }
    return VerifyPinResponseData;
}());
export { VerifyPinResponseData };
var AllCertsResponse = (function (_super) {
    __extends(AllCertsResponse, _super);
    function AllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllCertsResponse;
}(DataObjectResponse));
export { AllCertsResponse };
var AllCerts = (function () {
    function AllCerts(issuerPublicCertificate, iccPublicCertificate) {
        this.issuerPublicCertificate = issuerPublicCertificate;
        this.iccPublicCertificate = iccPublicCertificate;
    }
    return AllCerts;
}());
export { AllCerts };
var ReadData = (function () {
    function ReadData(applications) {
        this.applications = applications;
    }
    return ReadData;
}());
export { ReadData };
var Application = (function () {
    function Application(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
    return Application;
}());
export { Application };
var ReadDataResponse = (function (_super) {
    __extends(ReadDataResponse, _super);
    function ReadDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ReadDataResponse;
}(DataObjectResponse));
export { ReadDataResponse };
var ReadApplicationData = (function () {
    function ReadApplicationData(country, countryCode, effectiveDate, expirationDate, language, name, pan) {
    }
    return ReadApplicationData;
}());
export { ReadApplicationData };
var ReadApplicationDataResponse = (function (_super) {
    __extends(ReadApplicationDataResponse, _super);
    function ReadApplicationDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ReadApplicationDataResponse;
}(DataObjectResponse));
export { ReadApplicationDataResponse };
var EmvCertificateResponse = (function (_super) {
    __extends(EmvCertificateResponse, _super);
    function EmvCertificateResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvCertificateResponse;
}(DataObjectResponse));
export { EmvCertificateResponse };
var EmvCertificate = (function () {
    function EmvCertificate(certificate, exponent, remainder) {
    }
    return EmvCertificate;
}());
export { EmvCertificate };
//# sourceMappingURL=EmvModel.js.map