var AuthenticateOrSignData = (function () {
    function AuthenticateOrSignData(algorithm, data, pin, osDialog, id) {
    }
    return AuthenticateOrSignData;
}());
export { AuthenticateOrSignData };
var VerifyPinData = (function () {
    function VerifyPinData(pin, osDialog) {
        this.pin = pin;
        this.osDialog = osDialog;
    }
    return VerifyPinData;
}());
export { VerifyPinData };
var ResetPinData = (function () {
    function ResetPinData(pin, puk, resetOnly, osDialog, reference) {
    }
    return ResetPinData;
}());
export { ResetPinData };
var ChangePinData = (function () {
    function ChangePinData(pin, newPin, osDialog) {
    }
    return ChangePinData;
}());
export { ChangePinData };
var PinTryCounterData = (function () {
    function PinTryCounterData(reference) {
        this.reference = reference;
    }
    return PinTryCounterData;
}());
export { PinTryCounterData };
var Options = (function () {
    function Options(filters) {
        this.filters = filters;
    }
    return Options;
}());
export { Options };
//# sourceMappingURL=TokenCard.js.map