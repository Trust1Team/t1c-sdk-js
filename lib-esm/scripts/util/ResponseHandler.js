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
export { ResponseHandler };
//# sourceMappingURL=ResponseHandler.js.map