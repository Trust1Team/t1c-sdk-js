import { ObjectUtil } from '../../util/ObjectUtil';
var T1CLibException = (function () {
    function T1CLibException(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return T1CLibException;
}());
export { T1CLibException };
//# sourceMappingURL=CoreExceptions.js.map