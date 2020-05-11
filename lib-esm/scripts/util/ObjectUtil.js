var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    ObjectUtil.removeNullAndUndefinedFields = function (obj) {
        Object.keys(obj).forEach(function (key) { return !obj[key] && delete obj[key]; });
    };
    return ObjectUtil;
}());
export { ObjectUtil };
//# sourceMappingURL=ObjectUtil.js.map