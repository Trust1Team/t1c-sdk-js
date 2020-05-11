"use strict";
exports.__esModule = true;
var ObjectUtil_1 = require("../../util/ObjectUtil");
/**
 * Generic T1CLib exception
 */
var T1CLibException = /** @class */ (function () {
    function T1CLibException(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        // remove null and undefined fields during construction
        ObjectUtil_1.ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return T1CLibException;
}());
exports.T1CLibException = T1CLibException;
