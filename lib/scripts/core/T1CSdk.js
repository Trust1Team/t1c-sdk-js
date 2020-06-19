"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreService_1 = require("./service/CoreService");
var Connection_1 = require("./client/Connection");
var moment = require("moment");
var Polyfills_1 = require("../util/Polyfills");
var defaults = {
    t1cApiUrl: 'https://localhost:51983/v3',
    gwUrl: 'https://accapim.t1t.be:443',
    dsContextPath: '/trust1team/gclds/v3',
    dsContextPathTestMode: '/gcl-ds-web/v3',
    implicitDownload: false,
    localTestMode: false,
    forceHardwarePinpad: false,
    sessionTimeout: 5,
    consentDuration: 1,
    consentTimeout: 10,
    syncManaged: true,
    osPinDialog: false,
    containerDownloadTimeout: 30,
};
var T1CClient = (function () {
    function T1CClient(cfg, automatic) {
        var _this = this;
        this.core = function () {
            return _this.coreService;
        };
        this.config = function () {
            return _this.localConfig;
        };
        this.localConfig = cfg;
        this.connection = new Connection_1.LocalConnection(this.localConfig);
        this.authConnection = new Connection_1.LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new Connection_1.LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new Connection_1.LocalAdminConnection(this.localConfig);
        this.remoteConnection = new Connection_1.RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new Connection_1.RemoteApiKeyConnection(this.localConfig);
        this.localTestConnection = new Connection_1.LocalTestConnection(this.localConfig);
        this.coreService = new CoreService_1.CoreService(this.localConfig.t1cApiUrl, this.authConnection);
        if (!automatic) {
        }
    }
    T1CClient.checkPolyfills = function () {
        Polyfills_1.Polyfills.check();
    };
    T1CClient.initialize = function (cfg, callback) {
        return new Promise(function (resolve, reject) {
            var initTime = moment();
            var client = new T1CClient(cfg, true);
            client.gclInstalled = true;
        });
    };
    Object.defineProperty(T1CClient.prototype, "gclInstalled", {
        set: function (value) {
            this._gclInstalled = value;
        },
        enumerable: true,
        configurable: true
    });
    T1CClient.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.core().retrieveEncryptedUserPin(callback);
    };
    return T1CClient;
}());
exports.T1CClient = T1CClient;
//# sourceMappingURL=T1CSdk.js.map