var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { T1CResponse } from "../../../..";
var File = (function () {
    function File(extension, name, path, relPath, size, lastModificationTime, isDir, access) {
        this.extension = extension;
        this.name = name;
        this.path = path;
        this.relPath = relPath;
        this.size = size;
        this.lastModificationTime = lastModificationTime;
        this.isDir = isDir;
        this.access = access;
    }
    return File;
}());
export { File };
var FileListResponse = (function (_super) {
    __extends(FileListResponse, _super);
    function FileListResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return FileListResponse;
}(T1CResponse));
export { FileListResponse };
var FileList = (function () {
    function FileList(files, total) {
        this.files = files;
        this.total = total;
    }
    return FileList;
}());
export { FileList };
var FileResponse = (function (_super) {
    __extends(FileResponse, _super);
    function FileResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return FileResponse;
}(T1CResponse));
export { FileResponse };
var TypeListResponse = (function (_super) {
    __extends(TypeListResponse, _super);
    function TypeListResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TypeListResponse;
}(T1CResponse));
export { TypeListResponse };
var TypeResponse = (function (_super) {
    __extends(TypeResponse, _super);
    function TypeResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TypeResponse;
}(T1CResponse));
export { TypeResponse };
var Type = (function () {
    function Type(appid, entity, type, path, access, status, files) {
        this.appid = appid;
        this.entity = entity;
        this.type = type;
        this.path = path;
        this.files = files;
    }
    return Type;
}());
export { Type };
var TypeList = (function () {
    function TypeList(types, total) {
        this.types = types;
        this.total = total;
    }
    return TypeList;
}());
export { TypeList };
var Page = (function () {
    function Page(start, size, sort) {
        this.start = start;
        this.size = size;
        this.sort = sort;
    }
    return Page;
}());
export { Page };
var FileSort = (function () {
    function FileSort() {
    }
    FileSort.ASC = 'ASC';
    FileSort.DESC = 'DESC';
    return FileSort;
}());
export { FileSort };
export var TypeStatus;
(function (TypeStatus) {
    TypeStatus["MAPPED"] = "MAPPED";
    TypeStatus["UNMAPPED"] = "UNMAPPED";
})(TypeStatus || (TypeStatus = {}));
//# sourceMappingURL=FileExchangeModel.js.map