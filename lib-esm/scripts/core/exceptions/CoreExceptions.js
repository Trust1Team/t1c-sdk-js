import { ObjectUtil } from '../../util/ObjectUtil';
var T1CLibException = (function () {
    function T1CLibException(code, description, client) {
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return T1CLibException;
}());
export { T1CLibException };
//# sourceMappingURL=CoreExceptions.js.map