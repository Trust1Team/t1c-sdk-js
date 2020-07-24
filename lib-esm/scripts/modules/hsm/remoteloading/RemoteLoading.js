var RemoteLoading = (function () {
    function RemoteLoading(baseUrl, containerUrl, connection, reader_id) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
    }
    RemoteLoading.prototype.reloApp = function (path) {
        var suffix = this.containerUrl;
        suffix += RemoteLoading.PATHHSMMAPP + RemoteLoading.PATHREADERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    RemoteLoading.prototype.apdu = function (apdu, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.APDU), {
            apdu: apdu,
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.apdus = function (apdu, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.APDUS), {
            apdus: apdu,
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.atr = function (sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.ATR), {
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.ccid = function (feature, command, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.CCID), {
            feature: feature,
            command: command,
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.ccidFeatures = function (sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.CCIDFEATURES), {
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.closeSession = function (sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.CLOSE), {
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.command = function (tx, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.COMMAND), {
            command: tx,
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.commands = function (tx, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.COMMANDS), {
            commands: tx,
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.isPresent = function (sessionId, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.CARDPRESENT), {
            sessionId: sessionId
        }, undefined, undefined, callback);
    };
    RemoteLoading.prototype.openSession = function (timeout, callback) {
        return this.connection.post(this.baseUrl, this.reloApp(RemoteLoading.OPEN), {
            timeout: timeout
        }, undefined, undefined, callback);
    };
    RemoteLoading.PATHHSMMAPP = '/apps/hsm';
    RemoteLoading.PATHREADERS = '/readers';
    RemoteLoading.OPEN = '/open-session';
    RemoteLoading.CLOSE = '/close-session';
    RemoteLoading.CARDPRESENT = '/card-present';
    RemoteLoading.ATR = '/atr';
    RemoteLoading.CCIDFEATURES = '/ccid-features';
    RemoteLoading.CCID = '/ccid';
    RemoteLoading.COMMAND = '/command';
    RemoteLoading.APDU = '/apdu';
    RemoteLoading.COMMANDS = '/commands';
    RemoteLoading.APDUS = '/apdus';
    return RemoteLoading;
}());
export { RemoteLoading };
//# sourceMappingURL=RemoteLoading.js.map