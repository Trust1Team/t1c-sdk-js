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
var OptionalPin = (function () {
    function OptionalPin(pin, pace, private_key_reference) {
        this.pin = pin;
        this.pace = pace;
    }
    return OptionalPin;
}());
export { OptionalPin };
var AuthenticateOrSignData = (function (_super) {
    __extends(AuthenticateOrSignData, _super);
    function AuthenticateOrSignData(algorithm_reference, data, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.algorithm_reference = algorithm_reference;
        _this.data = data;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return AuthenticateOrSignData;
}(OptionalPin));
export { AuthenticateOrSignData };
var VerifyPinData = (function (_super) {
    __extends(VerifyPinData, _super);
    function VerifyPinData(private_key_reference, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.private_key_reference = private_key_reference;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return VerifyPinData;
}(OptionalPin));
export { VerifyPinData };
var ResetPinData = (function () {
    function ResetPinData(puk, new_pin, private_key_reference) {
        this.puk = puk;
        this.new_pin = new_pin;
        this.private_key_reference = private_key_reference;
    }
    return ResetPinData;
}());
export { ResetPinData };
var PinTryCounterData = (function () {
    function PinTryCounterData(pin_reference) {
        this.pin_reference = pin_reference;
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
//# sourceMappingURL=Card.js.map