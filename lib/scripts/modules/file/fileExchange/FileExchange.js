"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileExchange = (function () {
    function FileExchange(baseUrl, containerUrl, connection) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
    }
    FileExchange.prototype.copyFile = function (entity, fromType, toType, fileName, newFileName, fromRelPath, toRelPath, callback) {
        var body = { entity: entity, fromType: fromType, toType: toType, fileName: fileName, newFileName: newFileName, fromRelPath: fromRelPath, toRelPath: toRelPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.FILECOPY), body, undefined, undefined, callback);
    };
    FileExchange.prototype.createDir = function (entity, type, relPath, recursive, callback) {
        var body = { entity: entity, type: type, relPath: relPath, recursive: recursive };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.DIRCREATE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.createType = function (entity, type, iniTabsPath, modal, timeout, callback) {
        var body = { entity: entity, type: type, modal: modal, timeout: timeout, iniTabsPath: iniTabsPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPECREATE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.createTypeDirs = function (entity, type, relPath, modal, timeout, callback) {
        var body = { entity: entity, type: type, modal: modal, timeout: timeout, relPath: relPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPEDIRSCREATE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.deleteType = function (entity, type, callback) {
        var body = { entity: entity, type: type };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPEDELETE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.download = function (entity, type, file, fileName, relPath, implicitCreationType, notifyOnCompletion, callback) {
        var body = { entity: entity, type: type, file: file, fileName: fileName, relPath: relPath, implicitCreationType: implicitCreationType, notifyOnCompletion: notifyOnCompletion };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.DOWNLOAD), body, undefined, undefined, callback);
    };
    FileExchange.prototype.existsFile = function (entity, type, relPath, callback) {
        var body = { entity: entity, type: type, relPath: relPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.FILEEXISTS), body, undefined, undefined, callback);
    };
    FileExchange.prototype.existsType = function (entity, type, callback) {
        var body = { entity: entity, type: type };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPEEXISTS), body, undefined, undefined, callback);
    };
    FileExchange.prototype.getAccessMode = function (entity, type, fileName, relPath, callback) {
        var body = { entity: entity, type: type, fileName: fileName, relPath: relPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.ACCESSMODE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.getFileInfo = function (entity, type, fileName, relPath, callback) {
        var body = { entity: entity, type: type, fileName: fileName, relPath: relPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.FILEINFO), body, undefined, undefined, callback);
    };
    FileExchange.prototype.listContent = function (entity, page, callback) {
        var body = { entity: entity, page: page };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.CONTENTLIST), body, undefined, undefined, callback);
    };
    FileExchange.prototype.listType = function (entity, type, callback) {
        var body = { entity: entity, type: type };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPELIST), body, undefined, undefined, callback);
    };
    FileExchange.prototype.listTypeContent = function (entity, type, relPath, page, callback) {
        var body = { entity: entity, type: type, relPath: relPath, page: page };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPECONTENTLIST), body, undefined, undefined, callback);
    };
    FileExchange.prototype.listTypes = function (entity, page, callback) {
        var body = { entity: entity, page: page };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPESLIST), body, undefined, undefined, callback);
    };
    FileExchange.prototype.moveFile = function (entity, fromType, toType, fileName, fromRelPath, toRelPath, callback) {
        var body = { entity: entity, fromType: fromType, toType: toType, fileName: fileName, fromRelPath: fromRelPath, toRelPath: toRelPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.FILEMOVE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.renameFile = function (entity, type, fileName, newFileName, relPath, callback) {
        var body = { entity: entity, type: type, fileName: fileName, newFileName: newFileName, relPath: relPath };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.FILERENAME), body, undefined, undefined, callback);
    };
    FileExchange.prototype.updateType = function (entity, type, timeout, callback) {
        var body = { entity: entity, type: type, timeout: timeout };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.TYPEUPDATE), body, undefined, undefined, callback);
    };
    FileExchange.prototype.upload = function (entity, type, fileName, relPath, notifyOnCompletion, callback) {
        var body = { entity: entity, type: type, fileName: fileName, relPath: relPath, notifyOnCompletion: notifyOnCompletion };
        return this.connection.post(this.baseUrl, this.fileApp(FileExchange.UPLOAD), body, undefined, undefined, callback);
    };
    FileExchange.prototype.fileApp = function (path) {
        var suffix = this.containerUrl;
        suffix += FileExchange.PATHFILEAPP;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    FileExchange.PATHFILEAPP = '/apps/file';
    FileExchange.DOWNLOAD = '/download';
    FileExchange.UPLOAD = '/upload';
    FileExchange.TYPECREATE = '/create-type';
    FileExchange.TYPEDIRSCREATE = '/create-type-dirs';
    FileExchange.TYPEUPDATE = '/update-type';
    FileExchange.TYPESLIST = '/list-types';
    FileExchange.TYPELIST = '/list-type';
    FileExchange.TYPECONTENTLIST = '/list-type-content';
    FileExchange.CONTENTLIST = '/list-content';
    FileExchange.TYPEDELETE = '/delete-type';
    FileExchange.TYPEEXISTS = '/exist-type';
    FileExchange.FILEEXISTS = '/exist-file';
    FileExchange.FILEMOVE = '/move-file';
    FileExchange.FILECOPY = '/copy-file';
    FileExchange.FILERENAME = '/rename-file';
    FileExchange.ACCESSMODE = '/get-access-mode';
    FileExchange.DIRCREATE = '/create-dir';
    FileExchange.FILEINFO = '/get-file-info';
    return FileExchange;
}());
exports.FileExchange = FileExchange;
//# sourceMappingURL=FileExchange.js.map