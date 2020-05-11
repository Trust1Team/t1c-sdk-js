"use strict";
exports.__esModule = true;
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.includes = function (array, searchElement, fromIndex) {
        if (array == null) {
            throw new TypeError('array is null or not defined');
        }
        var o = Object(array);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        function sameValueZero(x, y) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
        while (k < len) {
            if (sameValueZero(o[k], searchElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
    // checks if value is an empty object, collection, map, or set.
    Util.isEmpty = function (value) {
        if (Array.isArray(value)) {
            return value.length <= 0;
        }
        else if (typeof value === 'object' && value !== null) {
            return Object.keys(value).length <= 0;
        }
        else if (value instanceof Set && value !== null) {
            return value.size <= 0;
        }
        else if (value instanceof Map && value !== null) {
            return value.size <= 0;
        }
        else {
            return true;
        }
    };
    return Util;
}());
exports.Util = Util;
