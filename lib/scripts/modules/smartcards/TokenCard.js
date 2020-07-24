"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticateOrSignData = (function () {
    function AuthenticateOrSignData(algorithm, data, pin, osDialog, id) {
    }
    return AuthenticateOrSignData;
}());
exports.AuthenticateOrSignData = AuthenticateOrSignData;
var VerifyPinData = (function () {
    function VerifyPinData(pin, osDialog) {
        this.pin = pin;
        this.osDialog = osDialog;
    }
    return VerifyPinData;
}());
exports.VerifyPinData = VerifyPinData;
var ResetPinData = (function () {
    function ResetPinData(pin, puk, resetOnly, osDialog, reference) {
    }
    return ResetPinData;
}());
exports.ResetPinData = ResetPinData;
var ChangePinData = (function () {
    function ChangePinData(pin, newPin, osDialog) {
    }
    return ChangePinData;
}());
exports.ChangePinData = ChangePinData;
var PinTryCounterData = (function () {
    function PinTryCounterData(reference) {
        this.reference = reference;
    }
    return PinTryCounterData;
}());
exports.PinTryCounterData = PinTryCounterData;
var Options = (function () {
    function Options(filters) {
        this.filters = filters;
    }
    return Options;
}());
exports.Options = Options;
//# sourceMappingURL=TokenCard.js.map