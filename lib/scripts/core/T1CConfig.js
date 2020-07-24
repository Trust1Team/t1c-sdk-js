"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T1CConfigOptions = (function () {
    function T1CConfigOptions(t1cApiUrl, t1cApiPort, t1cRpcPort, dsUrl, apiKey, gwJwt, dsContextPath, agentPort, forceHardwarePinpad, sessionTimeout, consentDuration, consentTimeout, osPinDialog, lang, t1cDownloadLink, t1cVersion, pkcs11Config) {
        this.t1cApiUrl = t1cApiUrl;
        this.t1cApiPort = t1cApiPort;
        this.t1cRpcPort = t1cRpcPort;
        this.dsUrl = dsUrl;
        this.apiKey = apiKey;
        this.gwJwt = gwJwt;
        this.dsContextPath = dsContextPath;
        this.agentPort = agentPort;
        this.forceHardwarePinpad = forceHardwarePinpad;
        this.sessionTimeout = sessionTimeout;
        this.consentDuration = consentDuration;
        this.consentTimeout = consentTimeout;
        this.osPinDialog = osPinDialog;
        this.lang = lang;
        this.t1cDownloadLink = t1cDownloadLink;
        this.t1cVersion = t1cVersion;
        this.pkcs11Config = pkcs11Config;
    }
    return T1CConfigOptions;
}());
exports.T1CConfigOptions = T1CConfigOptions;
var T1CConfig = (function () {
    function T1CConfig(options) {
        this._dsUrl = 'https://apim.t1t.be';
        this._t1cApiUrl = 'https://t1c.t1t.io';
        this._t1cApiPort = '51983';
        this._t1cRpcPort = '50051';
        this._dsContextPath = '';
        this._apiKey = 'PROVIDE APIKEY';
        this._gwJwt = 'PROVIDE DS JWT';
        this._t1cJwt = 'PROVIDE GCL JWT';
        this._citrix = false;
        this._agentPort = -1;
        this._forceHardwarePinpad = false;
        this._defaultSessionTimeout = 5;
        this._tokenCompatible = true;
        this._defaultConsentDuration = 1;
        this._defaultConsentTimeout = 10;
        this._osPinDialog = false;
        this._contextToken = '';
        this._lang = 'en';
        this._t1cDownloadLink = '';
        this._t1cVersion = 'NOT SPECIFIED';
        if (options) {
            if (options.t1cVersion) {
                this._t1cVersion = options.t1cVersion;
            }
            if (options.t1cApiUrl) {
                this._t1cApiUrl = options.t1cApiUrl;
            }
            if (options.t1cApiPort) {
                this._t1cApiPort = options.t1cApiPort;
            }
            if (options.t1cRpcPort) {
                this._t1cRpcPort = options.t1cRpcPort;
            }
            if (options.t1cDownloadLink) {
                this._t1cDownloadLink = options.t1cDownloadLink;
            }
            if (options.dsUrl) {
                this._dsUrl = options.dsUrl;
            }
            if (options.apiKey) {
                this._apiKey = options.apiKey;
            }
            if (options.gwJwt) {
                this._gwJwt = options.gwJwt;
            }
            if (options.agentPort) {
                this._agentPort = options.agentPort;
            }
            if (options.pkcs11Config) {
                this._pkcs11Config = options.pkcs11Config;
            }
            else {
                this._pkcs11Config = undefined;
            }
            if (options.forceHardwarePinpad) {
                this._forceHardwarePinpad = options.forceHardwarePinpad;
            }
            if (options.sessionTimeout) {
                this._defaultSessionTimeout = options.sessionTimeout;
            }
            if (options.consentDuration) {
                this._defaultConsentDuration = options.consentDuration;
            }
            if (options.consentTimeout) {
                this._defaultConsentTimeout = options.consentTimeout;
            }
            if (options.osPinDialog) {
                this._osPinDialog = options.osPinDialog;
            }
            if (options.lang) {
                this._lang = options.lang;
            }
            if (this.dsUrl) {
                if (options.dsContextPath) {
                    this._dsContextPath = options.dsContextPath;
                }
            }
        }
    }
    Object.defineProperty(T1CConfig.prototype, "pkcs11Config", {
        get: function () {
            return this._pkcs11Config;
        },
        set: function (value) {
            this._pkcs11Config = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cRpcPort", {
        set: function (value) {
            this._t1cRpcPort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cApiPort", {
        set: function (value) {
            this._t1cApiPort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cApiUrl", {
        get: function () {
            return this._t1cApiUrl + ":" + this._t1cApiPort;
        },
        set: function (value) {
            this._t1cApiUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "dsUrl", {
        get: function () {
            return this._dsUrl + this._dsContextPath;
        },
        set: function (value) {
            this._dsUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "dsContextPath", {
        get: function () {
            return this._dsContextPath;
        },
        set: function (value) {
            this._dsContextPath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "apiKey", {
        get: function () {
            return this._apiKey;
        },
        set: function (value) {
            this._apiKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "citrix", {
        get: function () {
            return this._citrix;
        },
        set: function (value) {
            this._citrix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "agentPort", {
        get: function () {
            return this._agentPort;
        },
        set: function (value) {
            this._agentPort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "forceHardwarePinpad", {
        get: function () {
            return this._forceHardwarePinpad;
        },
        set: function (value) {
            this._forceHardwarePinpad = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "tokenCompatible", {
        get: function () {
            return this._tokenCompatible;
        },
        set: function (value) {
            this._tokenCompatible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "defaultConsentDuration", {
        get: function () {
            return this._defaultConsentDuration;
        },
        set: function (value) {
            this._defaultConsentDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "defaultConsentTimeout", {
        get: function () {
            return this._defaultConsentTimeout;
        },
        set: function (value) {
            this._defaultConsentTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "osPinDialog", {
        get: function () {
            return this._osPinDialog;
        },
        set: function (value) {
            this._osPinDialog = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "contextToken", {
        get: function () {
            return this._contextToken;
        },
        set: function (value) {
            this._contextToken = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cJwt", {
        get: function () {
            return this._t1cJwt;
        },
        set: function (value) {
            this._t1cJwt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "lang", {
        get: function () {
            return this._lang;
        },
        set: function (value) {
            this._lang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cDownloadLink", {
        get: function () {
            return this._t1cDownloadLink;
        },
        set: function (value) {
            this._t1cDownloadLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "t1cVersion", {
        get: function () {
            return this._t1cVersion;
        },
        set: function (value) {
            this._t1cVersion = value;
        },
        enumerable: true,
        configurable: true
    });
    return T1CConfig;
}());
exports.T1CConfig = T1CConfig;
//# sourceMappingURL=T1CConfig.js.map