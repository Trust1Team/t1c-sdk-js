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
var Options = (function () {
    function Options(filters) {
        this.filters = filters;
    }
    return Options;
}());
export { Options };
//# sourceMappingURL=PaymentCard.js.map