"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    ObjectUtil.removeNullAndUndefinedFields = function (obj) {
        Object.keys(obj).forEach(function (key) { return !obj[key] && delete obj[key]; });
    };
    return ObjectUtil;
}());
exports.ObjectUtil = ObjectUtil;
//# sourceMappingURL=ObjectUtil.js.map