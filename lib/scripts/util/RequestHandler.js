"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestOptions = (function () {
    function RequestOptions(params, callback) {
        this.params = params;
        this.callback = callback;
    }
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var RequestHandler = (function () {
    function RequestHandler() {
    }
    RequestHandler.determineOptions = function (firstParam, secondParam) {
        var result = new RequestOptions();
        if (firstParam) {
            if (typeof firstParam === 'function') {
                result.callback = firstParam;
            }
            else {
                result.callback = secondParam;
            }
        }
        else {
            if (typeof secondParam === 'function') {
                result.callback = secondParam;
            }
        }
        return result;
    };
    RequestHandler.determineOptionsWithFilter = function (firstParam) {
        var result = new RequestOptions({});
        if (Array.isArray(firstParam)) {
            if (firstParam.length) {
                result.params.filter = firstParam.join(',');
            }
        }
        else if (typeof firstParam === 'object') {
            if (firstParam.filters && Array.isArray(firstParam.filters)) {
                if (firstParam.filters.length) {
                    result.params.filter = firstParam.filters.join(',');
                }
            }
        }
        return result;
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=RequestHandler.js.map