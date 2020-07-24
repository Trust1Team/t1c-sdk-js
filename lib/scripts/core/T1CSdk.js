"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreService_1 = require("./service/CoreService");
var Connection_1 = require("./client/Connection");
var CoreExceptions_1 = require("./exceptions/CoreExceptions");
var Polyfills_1 = require("../util/Polyfills");
var ModuleFactory_1 = require("../modules/ModuleFactory");
var axios_1 = require("axios");
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
        this.generic = function (reader_id) {
            return _this.moduleFactory.createEidGeneric(reader_id);
        };
        this.genericMeta = function () {
            return _this.moduleFactory.createEidGenericMeta();
        };
        this.pkcs11Generic = function () {
            return _this.moduleFactory.createPKCS11Generic();
        };
        this.fileex = function () {
            return _this.moduleFactory.createFileExchange();
        };
        this.beid = function (reader_id) {
            return _this.moduleFactory.createEidBE(reader_id);
        };
        this.remoteloading = function (reader_id) {
            return _this.moduleFactory.createRemoteLoading(reader_id);
        };
        this.emv = function (reader_id) {
            return _this.moduleFactory.createEmv(reader_id);
        };
        this.aventra = function (reader_id) {
            return _this.moduleFactory.createAventra(reader_id);
        };
        this.oberthur = function (reader_id) {
            return _this.moduleFactory.createOberthur(reader_id);
        };
        this.idemia = function (reader_id) {
            return _this.moduleFactory.createIdemia(reader_id);
        };
        this.localConfig = cfg;
        this.connection = new Connection_1.LocalConnection(this.localConfig);
        this.authConnection = new Connection_1.LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new Connection_1.LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new Connection_1.LocalAdminConnection(this.localConfig);
        this.remoteConnection = new Connection_1.RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new Connection_1.RemoteApiKeyConnection(this.localConfig);
        this.moduleFactory = new ModuleFactory_1.ModuleFactory(this.localConfig.t1cApiUrl + urlVersion, this.connection);
        this.localTestConnection = new Connection_1.LocalTestConnection(this.localConfig);
        this.coreService = new CoreService_1.CoreService(this.localConfig.t1cApiUrl, this.authConnection);
        console.log("Core service initialized: " + this.localConfig.t1cApiUrl);
        this.coreService.version().then(function (info) { return console.log("Running T1C-sdk-js version: " + info); });
    }
    T1CClient.checkPolyfills = function () {
        Polyfills_1.Polyfills.check();
    };
    T1CClient.getConsent = function (cfg, consentToken) {
        return new Promise(function (resolve, reject) {
            var reqHeaders = {};
            reqHeaders['Authorization'] = "Bearer " + cfg.t1cJwt;
            axios_1.default.get(cfg.t1cApiUrl + "/agents/consent/" + consentToken, { headers: reqHeaders }).then(function (res) {
                cfg.t1cApiPort = res.data.data.apiPort;
                cfg.t1cRpcPort = res.data.data.sandboxPort;
                var client = new T1CClient(cfg);
                client.t1cInstalled = true;
                resolve(client);
            }, function (err) {
                var _a, _b;
                var client = new T1CClient(cfg);
                reject(new CoreExceptions_1.T1CLibException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.code, (_b = err.response) === null || _b === void 0 ? void 0 : _b.data.description, client));
                console.error(err);
            });
        });
    };
    T1CClient.initialize = function (cfg, consentToken, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(cfg.t1cApiUrl + "/info").then(function (res) {
                if (res.status >= 200 && res.status < 300) {
                    if (res.data.t1CInfoAPI.service.deviceType && res.data.t1CInfoAPI.service.deviceType == "PROXY") {
                        console.info("Proxy detected");
                        if (document.cookie) {
                            var proxyCookie = document.cookie.split(";").find(function (s) { return s.includes("t1c-agent-proxy"); });
                            if (proxyCookie) {
                                cfg.t1cApiPort = proxyCookie.split("::").reverse()[0];
                                var client = new T1CClient(cfg);
                                client.t1cInstalled = true;
                                resolve(client);
                            }
                            else {
                                if (consentToken) {
                                    _this.getConsent(cfg, consentToken).then(function (res) {
                                        resolve(res);
                                    }, function (err) {
                                        var _a, _b;
                                        var client = new T1CClient(cfg);
                                        reject(new CoreExceptions_1.T1CLibException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.code, (_b = err.response) === null || _b === void 0 ? void 0 : _b.data.description, client));
                                        console.error(err);
                                    });
                                }
                                else {
                                    var client = new T1CClient(cfg);
                                    reject(new CoreExceptions_1.T1CLibException("500", "No valid consent found.", client));
                                }
                            }
                        }
                        else {
                            if (consentToken) {
                                _this.getConsent(cfg, consentToken).then(function (res) {
                                    resolve(res);
                                }, function (err) {
                                    var _a, _b;
                                    var client = new T1CClient(cfg);
                                    reject(new CoreExceptions_1.T1CLibException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.code, (_b = err.response) === null || _b === void 0 ? void 0 : _b.data.description, client));
                                    console.error(err);
                                });
                            }
                            else {
                                var client = new T1CClient(cfg);
                                reject(new CoreExceptions_1.T1CLibException("500", "No valid consent found.", client));
                            }
                        }
                    }
                    else {
                        var client = new T1CClient(cfg);
                        client.t1cInstalled = true;
                        resolve(client);
                    }
                }
                else {
                    console.error(res.data);
                    var client = new T1CClient(cfg);
                    reject(new CoreExceptions_1.T1CLibException("100", res.statusText, client));
                }
            }, function (err) {
                var _a, _b;
                var client = new T1CClient(cfg);
                reject(new CoreExceptions_1.T1CLibException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.code, (_b = err.response) === null || _b === void 0 ? void 0 : _b.data.description, client));
                console.error(err);
            });
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
exports.T1CClient = T1CClient;
//# sourceMappingURL=T1CSdk.js.map