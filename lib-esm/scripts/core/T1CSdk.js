import { CoreService } from './service/CoreService';
import { LocalConnection, RemoteJwtConnection, LocalAuthConnection, LocalTestConnection, RemoteApiKeyConnection, LocalAuthAdminConnection, LocalAdminConnection, } from './client/Connection';
import { Polyfills } from "../util/Polyfills";
import { ModuleFactory } from "../modules/ModuleFactory";
var urlVersion = "/v3";
var defaults = {
    t1cApiUrl: 'https://t1c.t1t.io',
    t1cApiPort: '51983',
    t1cRpcPort: '50051',
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
    function T1CClient(cfg) {
        var _this = this;
        this.core = function () {
            return _this.coreService;
        };
        this.config = function () {
            return _this.localConfig;
        };
        this.mf = function () {
            return _this.moduleFactory;
        };
        this.beid = function (reader_id) {
            return _this.moduleFactory.createEidBE(reader_id);
        };
        this.aventra = function (reader_id) {
            return _this.moduleFactory.createAventra4(reader_id);
        };
        this.localConfig = cfg;
        this.connection = new LocalConnection(this.localConfig);
        this.authConnection = new LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new LocalAdminConnection(this.localConfig);
        this.remoteConnection = new RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.localConfig);
        this.moduleFactory = new ModuleFactory(this.localConfig.t1cApiUrl + urlVersion, this.connection);
        this.localTestConnection = new LocalTestConnection(this.localConfig);
        this.coreService = new CoreService(this.localConfig.t1cApiUrl, this.authConnection);
        console.log("Core service initialized: " + this.localConfig.t1cApiUrl);
        this.coreService.version().then(function (info) { return console.log("Running T1C-sdk-js version: " + info); });
    }
    T1CClient.checkPolyfills = function () {
        Polyfills.check();
    };
    T1CClient.initialize = function (cfg, callback) {
        return new Promise(function (resolve, reject) {
            var client = new T1CClient(cfg);
            client.t1cInstalled = true;
            resolve(client);
        });
    };
    Object.defineProperty(T1CClient.prototype, "t1cInstalled", {
        set: function (value) {
            this._t1cInstalled = value;
        },
        enumerable: true,
        configurable: true
    });
    T1CClient.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.core().retrieveEncryptedUserPin(callback);
    };
    return T1CClient;
}());
export { T1CClient };
//# sourceMappingURL=T1CSdk.js.map