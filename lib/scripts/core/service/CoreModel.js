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
var T1CResponse = (function () {
    function T1CResponse(success, data) {
        this.success = success;
        this.data = data;
    }
    return T1CResponse;
}());
exports.T1CResponse = T1CResponse;
var BoolDataResponse = (function (_super) {
    __extends(BoolDataResponse, _super);
    function BoolDataResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BoolDataResponse;
}(T1CResponse));
exports.BoolDataResponse = BoolDataResponse;
var DataResponse = (function (_super) {
    __extends(DataResponse, _super);
    function DataResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DataResponse;
}(T1CResponse));
exports.DataResponse = DataResponse;
var DataArrayResponse = (function (_super) {
    __extends(DataArrayResponse, _super);
    function DataArrayResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DataArrayResponse;
}(T1CResponse));
exports.DataArrayResponse = DataArrayResponse;
var DataObjectResponse = (function (_super) {
    __extends(DataObjectResponse, _super);
    function DataObjectResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DataObjectResponse;
}(T1CResponse));
exports.DataObjectResponse = DataObjectResponse;
var InfoOS = (function () {
    function InfoOS(architecture, os, version) {
        this.architecture = architecture;
        this.os = os;
        this.version = version;
    }
    return InfoOS;
}());
exports.InfoOS = InfoOS;
var InfoJava = (function () {
    function InfoJava(runtime, spec, java) {
        this.runtime = runtime;
        this.spec = spec;
        this.java = java;
    }
    return InfoJava;
}());
exports.InfoJava = InfoJava;
var InfoUser = (function () {
    function InfoUser(timezone, country, language, home, tempDir) {
        this.timezone = timezone;
        this.country = country;
        this.language = language;
        this.home = home;
        this.tempDir = tempDir;
    }
    return InfoUser;
}());
exports.InfoUser = InfoUser;
var InfoService = (function () {
    function InfoService(url, apiPort, gRpcPort) {
        this.url = url;
        this.apiPort = apiPort;
        this.gRpcPort = gRpcPort;
    }
    return InfoService;
}());
exports.InfoService = InfoService;
var InfoApi = (function () {
    function InfoApi(service, activated, citrix, uid, modules, version, logLevel) {
        this.service = service;
        this.activated = activated;
        this.citrix = citrix;
        this.uid = uid;
        this.modules = modules;
        this.version = version;
        this.logLevel = logLevel;
    }
    return InfoApi;
}());
exports.InfoApi = InfoApi;
var InfoResponse = (function () {
    function InfoResponse(t1CinfoOS, t1CInfoJava, t1CInfoUser, t1CInfoAPI) {
        this.t1CinfoOS = t1CinfoOS;
        this.t1CInfoJava = t1CInfoJava;
        this.t1CInfoUser = t1CInfoUser;
        this.t1CInfoAPI = t1CInfoAPI;
    }
    return InfoResponse;
}());
exports.InfoResponse = InfoResponse;
var T1CInfo = (function () {
    function T1CInfo(activated, citrix, managed, arch, os, uid, containers, version) {
        this.activated = activated;
        this.citrix = citrix;
        this.managed = managed;
        this.arch = arch;
        this.os = os;
        this.uid = uid;
        this.containers = containers;
        this.version = version;
    }
    return T1CInfo;
}());
exports.T1CInfo = T1CInfo;
var T1CContainer = (function () {
    function T1CContainer(name, version, status) {
        this.name = name;
        this.version = version;
        this.status = status;
    }
    return T1CContainer;
}());
exports.T1CContainer = T1CContainer;
var T1CContainerid = (function () {
    function T1CContainerid(name) {
        this.name = name;
    }
    return T1CContainerid;
}());
exports.T1CContainerid = T1CContainerid;
var BrowserInfoResponse = (function (_super) {
    __extends(BrowserInfoResponse, _super);
    function BrowserInfoResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BrowserInfoResponse;
}(T1CResponse));
exports.BrowserInfoResponse = BrowserInfoResponse;
var BrowserInfo = (function () {
    function BrowserInfo(browser, manufacturer, os, ua) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
    }
    return BrowserInfo;
}());
exports.BrowserInfo = BrowserInfo;
var SmartCard = (function () {
    function SmartCard(atr, description) {
        this.atr = atr;
        this.description = description;
    }
    return SmartCard;
}());
exports.SmartCard = SmartCard;
var CardReader = (function () {
    function CardReader(id, name, pinpad, card) {
        this.id = id;
        this.name = name;
        this.pinpad = pinpad;
        this.card = card;
    }
    return CardReader;
}());
exports.CardReader = CardReader;
var CardReadersResponse = (function (_super) {
    __extends(CardReadersResponse, _super);
    function CardReadersResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CardReadersResponse;
}(T1CResponse));
exports.CardReadersResponse = CardReadersResponse;
var CertificateResponse = (function (_super) {
    __extends(CertificateResponse, _super);
    function CertificateResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CertificateResponse;
}(T1CResponse));
exports.CertificateResponse = CertificateResponse;
var CertificatesResponse = (function (_super) {
    __extends(CertificatesResponse, _super);
    function CertificatesResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CertificatesResponse;
}(T1CResponse));
exports.CertificatesResponse = CertificatesResponse;
var T1CCertificate = (function () {
    function T1CCertificate(base64, id) {
        this.base64 = base64;
        this.id = id;
    }
    return T1CCertificate;
}());
exports.T1CCertificate = T1CCertificate;
var SingleReaderResponse = (function (_super) {
    __extends(SingleReaderResponse, _super);
    function SingleReaderResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return SingleReaderResponse;
}(T1CResponse));
exports.SingleReaderResponse = SingleReaderResponse;
var CheckT1CVersion = (function () {
    function CheckT1CVersion(outDated, downloadLink) {
        this.outDated = outDated;
        this.downloadLink = downloadLink;
    }
    return CheckT1CVersion;
}());
exports.CheckT1CVersion = CheckT1CVersion;
var CheckT1CVersionResponse = (function (_super) {
    __extends(CheckT1CVersionResponse, _super);
    function CheckT1CVersionResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CheckT1CVersionResponse;
}(T1CResponse));
exports.CheckT1CVersionResponse = CheckT1CVersionResponse;
//# sourceMappingURL=CoreModel.js.map