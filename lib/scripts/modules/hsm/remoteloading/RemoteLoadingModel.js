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
var __1 = require("../../../..");
var APDU = (function () {
    function APDU(cla, ins, p1, p2, data, le) {
        this.cla = cla;
        this.ins = ins;
        this.p1 = p1;
        this.p2 = p2;
        this.data = data;
        this.le = le;
    }
    return APDU;
}());
exports.APDU = APDU;
var CommandResponse = (function (_super) {
    __extends(CommandResponse, _super);
    function CommandResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CommandResponse;
}(__1.T1CResponse));
exports.CommandResponse = CommandResponse;
var CommandsResponse = (function (_super) {
    __extends(CommandsResponse, _super);
    function CommandsResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CommandsResponse;
}(__1.T1CResponse));
exports.CommandsResponse = CommandsResponse;
var Command = (function () {
    function Command(sw, tx, rx) {
        this.sw = sw;
        this.tx = tx;
        this.rx = rx;
    }
    return Command;
}());
exports.Command = Command;
var CCIDFeature;
(function (CCIDFeature) {
    CCIDFeature["VERIFY_PIN_DIRECT"] = "VERIFY_PIN_DIRECT";
    CCIDFeature["MODIFY_PIN_DIRECT"] = "MODIFY_PIN_DIRECT";
    CCIDFeature["GET_TLV_PROPERTIES"] = "GET_TLV_PROPERTIES";
})(CCIDFeature = exports.CCIDFeature || (exports.CCIDFeature = {}));
//# sourceMappingURL=RemoteLoadingModel.js.map