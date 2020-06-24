"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseHandler = (function () {
    function ResponseHandler() {
    }
    ResponseHandler.error = function (err, callback) {
        if (callback && typeof callback === 'function') {
            callback(err, null);
        }
        return Promise.reject(err);
    };
    ResponseHandler.response = function (data, callback) {
        if (callback && typeof callback === 'function') {
            callback(undefined, data);
        }
        return Promise.resolve(data);
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map