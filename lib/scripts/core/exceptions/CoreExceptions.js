"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtil_1 = require("../../util/ObjectUtil");
var T1CLibException = (function () {
    function T1CLibException(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil_1.ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return T1CLibException;
}());
exports.T1CLibException = T1CLibException;
//# sourceMappingURL=CoreExceptions.js.map