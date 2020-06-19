import { CoreService } from './service/CoreService';
import { LocalConnection, RemoteJwtConnection, LocalAuthConnection, LocalTestConnection, RemoteApiKeyConnection, LocalAuthAdminConnection, LocalAdminConnection, } from './client/Connection';
import * as moment from 'moment';
import { Polyfills } from '../util/Polyfills';
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
        this.connection = new LocalConnection(this.localConfig);
        this.authConnection = new LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new LocalAdminConnection(this.localConfig);
        this.remoteConnection = new RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.localConfig);
        this.localTestConnection = new LocalTestConnection(this.localConfig);
        this.coreService = new CoreService(this.localConfig.t1cApiUrl, this.authConnection);
        if (!automatic) {
        }
    }
    T1CClient.checkPolyfills = function () {
        Polyfills.check();
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
export { T1CClient };
//# sourceMappingURL=T1CSdk.js.map