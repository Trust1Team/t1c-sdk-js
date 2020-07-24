"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pkcs11VerifyPinRequest = (function () {
    function Pkcs11VerifyPinRequest(pin) {
        this.pin = pin;
    }
    return Pkcs11VerifyPinRequest;
}());
exports.Pkcs11VerifyPinRequest = Pkcs11VerifyPinRequest;
var Pkcs11UploadConfigResponse = (function () {
    function Pkcs11UploadConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11UploadConfigResponse;
}());
exports.Pkcs11UploadConfigResponse = Pkcs11UploadConfigResponse;
var Pkcs11ClearConfigResponse = (function () {
    function Pkcs11ClearConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11ClearConfigResponse;
}());
exports.Pkcs11ClearConfigResponse = Pkcs11ClearConfigResponse;
var Pkcs11GetConfigResponse = (function () {
    function Pkcs11GetConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11GetConfigResponse;
}());
exports.Pkcs11GetConfigResponse = Pkcs11GetConfigResponse;
var Pkcs11GetConfig = (function () {
    function Pkcs11GetConfig(sessionRef, tempPath) {
        this.sessionRef = sessionRef;
        this.tempPath = tempPath;
    }
    return Pkcs11GetConfig;
}());
exports.Pkcs11GetConfig = Pkcs11GetConfig;
var Pkcs11InfoResponse = (function () {
    function Pkcs11InfoResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11InfoResponse;
}());
exports.Pkcs11InfoResponse = Pkcs11InfoResponse;
var Pkcs11Info = (function () {
    function Pkcs11Info(cryptokiVersion, manufacturerId, libraryDescription, libraryVersion) {
        this.cryptokiVersion = cryptokiVersion;
        this.manufacturerId = manufacturerId;
        this.libraryDescription = libraryDescription;
        this.libraryVersion = libraryVersion;
    }
    return Pkcs11Info;
}());
exports.Pkcs11Info = Pkcs11Info;
var Pkcs11Slots = (function () {
    function Pkcs11Slots(slots) {
        this.slots = slots;
    }
    return Pkcs11Slots;
}());
exports.Pkcs11Slots = Pkcs11Slots;
var Pkcs11Slot = (function () {
    function Pkcs11Slot(slot, description) {
        this.slot = slot;
        this.description = description;
    }
    return Pkcs11Slot;
}());
exports.Pkcs11Slot = Pkcs11Slot;
var Pkcs11SlotsResponse = (function () {
    function Pkcs11SlotsResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11SlotsResponse;
}());
exports.Pkcs11SlotsResponse = Pkcs11SlotsResponse;
var Pkcs11Certificate = (function () {
    function Pkcs11Certificate(cert, certSn, parsed) {
        this.cert = cert;
        this.certSn = certSn;
        this.parsed = parsed;
    }
    return Pkcs11Certificate;
}());
exports.Pkcs11Certificate = Pkcs11Certificate;
var Pkcs11CertificatesResponse = (function () {
    function Pkcs11CertificatesResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11CertificatesResponse;
}());
exports.Pkcs11CertificatesResponse = Pkcs11CertificatesResponse;
var Pkcs11SignData = (function () {
    function Pkcs11SignData(algorithm, data, pin) {
        this.algorithm = algorithm;
        this.data = data;
        this.pin = pin;
    }
    return Pkcs11SignData;
}());
exports.Pkcs11SignData = Pkcs11SignData;
var Pkcs11Config = (function () {
    function Pkcs11Config(config) {
        this.config = config;
    }
    return Pkcs11Config;
}());
exports.Pkcs11Config = Pkcs11Config;
var Pkcs11VerifySignedData = (function () {
    function Pkcs11VerifySignedData(slot_id, cert_id, algorithm_reference, data, signature, pin) {
        this.slot_id = slot_id;
        this.cert_id = cert_id;
        this.algorithm_reference = algorithm_reference;
        this.data = data;
        this.signature = signature;
        this.pin = pin;
    }
    return Pkcs11VerifySignedData;
}());
exports.Pkcs11VerifySignedData = Pkcs11VerifySignedData;
var Pkcs11TokenInfo = (function () {
    function Pkcs11TokenInfo(slot, label, manufacturerId, model, serialNumber, flags, ulMaxSessionCount, ulSessionCount, ulMaxRwSessionCount, ulMaxPinLen, ulMinPinLen, ulTotalPublicMemory, ulFreePublicMemory, ulTotalPrivateMemory, ulFreePrivateMemory, hardwareVersion, firmwareVersion) {
        this.slot = slot;
        this.label = label;
        this.manufacturerId = manufacturerId;
        this.model = model;
        this.serialNumber = serialNumber;
        this.flags = flags;
        this.ulMaxSessionCount = ulMaxSessionCount;
        this.ulSessionCount = ulSessionCount;
        this.ulMaxRwSessionCount = ulMaxRwSessionCount;
        this.ulMaxPinLen = ulMaxPinLen;
        this.ulMinPinLen = ulMinPinLen;
        this.ulTotalPublicMemory = ulTotalPublicMemory;
        this.ulFreePublicMemory = ulFreePublicMemory;
        this.ulTotalPrivateMemory = ulTotalPrivateMemory;
        this.ulFreePrivateMemory = ulFreePrivateMemory;
        this.hardwareVersion = hardwareVersion;
        this.firmwareVersion = firmwareVersion;
    }
    return Pkcs11TokenInfo;
}());
exports.Pkcs11TokenInfo = Pkcs11TokenInfo;
var Pkcs11TokenResponse = (function () {
    function Pkcs11TokenResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11TokenResponse;
}());
exports.Pkcs11TokenResponse = Pkcs11TokenResponse;
var Pkcs11ModuleConfig = (function () {
    function Pkcs11ModuleConfig(linux, mac, win) {
        this.linux = linux;
        this.mac = mac;
        this.win = win;
    }
    return Pkcs11ModuleConfig;
}());
exports.Pkcs11ModuleConfig = Pkcs11ModuleConfig;
//# sourceMappingURL=Pkcs11GenericModel.js.map