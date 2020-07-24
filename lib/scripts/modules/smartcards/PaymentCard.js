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
var Options = (function () {
    function Options(filters) {
        this.filters = filters;
    }
    return Options;
}());
exports.Options = Options;
//# sourceMappingURL=PaymentCard.js.map