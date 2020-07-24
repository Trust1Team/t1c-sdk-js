var Pkcs11VerifyPinRequest = (function () {
    function Pkcs11VerifyPinRequest(pin) {
        this.pin = pin;
    }
    return Pkcs11VerifyPinRequest;
}());
export { Pkcs11VerifyPinRequest };
var Pkcs11UploadConfigResponse = (function () {
    function Pkcs11UploadConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11UploadConfigResponse;
}());
export { Pkcs11UploadConfigResponse };
var Pkcs11ClearConfigResponse = (function () {
    function Pkcs11ClearConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11ClearConfigResponse;
}());
export { Pkcs11ClearConfigResponse };
var Pkcs11GetConfigResponse = (function () {
    function Pkcs11GetConfigResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11GetConfigResponse;
}());
export { Pkcs11GetConfigResponse };
var Pkcs11GetConfig = (function () {
    function Pkcs11GetConfig(sessionRef, tempPath) {
        this.sessionRef = sessionRef;
        this.tempPath = tempPath;
    }
    return Pkcs11GetConfig;
}());
export { Pkcs11GetConfig };
var Pkcs11InfoResponse = (function () {
    function Pkcs11InfoResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11InfoResponse;
}());
export { Pkcs11InfoResponse };
var Pkcs11Info = (function () {
    function Pkcs11Info(cryptokiVersion, manufacturerId, libraryDescription, libraryVersion) {
        this.cryptokiVersion = cryptokiVersion;
        this.manufacturerId = manufacturerId;
        this.libraryDescription = libraryDescription;
        this.libraryVersion = libraryVersion;
    }
    return Pkcs11Info;
}());
export { Pkcs11Info };
var Pkcs11Slots = (function () {
    function Pkcs11Slots(slots) {
        this.slots = slots;
    }
    return Pkcs11Slots;
}());
export { Pkcs11Slots };
var Pkcs11Slot = (function () {
    function Pkcs11Slot(slot, description) {
        this.slot = slot;
        this.description = description;
    }
    return Pkcs11Slot;
}());
export { Pkcs11Slot };
var Pkcs11SlotsResponse = (function () {
    function Pkcs11SlotsResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11SlotsResponse;
}());
export { Pkcs11SlotsResponse };
var Pkcs11Certificate = (function () {
    function Pkcs11Certificate(cert, certSn, parsed) {
        this.cert = cert;
        this.certSn = certSn;
        this.parsed = parsed;
    }
    return Pkcs11Certificate;
}());
export { Pkcs11Certificate };
var Pkcs11CertificatesResponse = (function () {
    function Pkcs11CertificatesResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11CertificatesResponse;
}());
export { Pkcs11CertificatesResponse };
var Pkcs11SignData = (function () {
    function Pkcs11SignData(algorithm, data, pin) {
        this.algorithm = algorithm;
        this.data = data;
        this.pin = pin;
    }
    return Pkcs11SignData;
}());
export { Pkcs11SignData };
var Pkcs11Config = (function () {
    function Pkcs11Config(config) {
        this.config = config;
    }
    return Pkcs11Config;
}());
export { Pkcs11Config };
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
export { Pkcs11VerifySignedData };
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
export { Pkcs11TokenInfo };
var Pkcs11TokenResponse = (function () {
    function Pkcs11TokenResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return Pkcs11TokenResponse;
}());
export { Pkcs11TokenResponse };
var Pkcs11ModuleConfig = (function () {
    function Pkcs11ModuleConfig(linux, mac, win) {
        this.linux = linux;
        this.mac = mac;
        this.win = win;
    }
    return Pkcs11ModuleConfig;
}());
export { Pkcs11ModuleConfig };
//# sourceMappingURL=Pkcs11GenericModel.js.map