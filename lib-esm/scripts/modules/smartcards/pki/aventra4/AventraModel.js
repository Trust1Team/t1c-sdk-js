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
import { DataObjectResponse } from '../../../../core/service/CoreModel';
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
var TxResponse = (function (_super) {
    __extends(TxResponse, _super);
    function TxResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TxResponse;
}(DataObjectResponse));
export { TxResponse };
var AllCerts = (function () {
    function AllCerts(authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
    return AllCerts;
}());
export { AllCerts };
var AllDataResponse = (function (_super) {
    __extends(AllDataResponse, _super);
    function AllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllDataResponse;
}(DataObjectResponse));
export { AllDataResponse };
var AllData = (function () {
    function AllData(applet_info, authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.applet_info = applet_info;
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
    return AllData;
}());
export { AllData };
var AppletInfo = (function () {
    function AppletInfo(change_counter, name, serial, version) {
        this.change_counter = change_counter;
        this.name = name;
        this.serial = serial;
        this.version = version;
    }
    return AppletInfo;
}());
export { AppletInfo };
//# sourceMappingURL=AventraModel.js.map