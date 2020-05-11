var GCLConfigOptions = (function () {
    function GCLConfigOptions(gclUrl, gwOrProxyUrl, apiKey, gwJwt, dsContextPath, agentPort, forceHardwarePinpad, sessionTimeout, consentDuration, consentTimeout, osPinDialog, lang, gclDownloadLink, gclVersion) {
        this.gclUrl = gclUrl;
        this.gwOrProxyUrl = gwOrProxyUrl;
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
        this.gclDownloadLink = gclDownloadLink;
        this.gclVersion = gclVersion;
    }
    return GCLConfigOptions;
}());
export { GCLConfigOptions };
var T1CConfig = (function () {
    function T1CConfig(options) {
        this._gwUrl = 'https://apim.t1t.be';
        this._gclUrl = 'https://t1c.t1t.io';
        this._dsContextPath = '';
        this._apiKey = 'PROVIDE APIKEY';
        this._gwJwt = 'PROVIDE DS JWT';
        this._gclJwt = 'PROVIDE GCL JWT';
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
        this._gclDownloadLink = '';
        this._gclVersion = 'NOT SPECIFIED';
        if (options) {
            if (options.gclVersion) {
                this.gclVersion = options.gclVersion;
            }
            if (options.gclUrl) {
                this._gclUrl = options.gclUrl;
            }
            if (options.gclDownloadLink) {
                this._gclDownloadLink = options.gclDownloadLink;
            }
            if (options.gwOrProxyUrl) {
                this._gwUrl = options.gwOrProxyUrl;
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
            if (this.gwUrl) {
                if (options.dsContextPath) {
                    this._dsContextPath = options.dsContextPath;
                }
            }
        }
    }
    Object.defineProperty(T1CConfig.prototype, "gclUrl", {
        get: function () {
            return this._gclUrl;
        },
        set: function (value) {
            this._gclUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "dsUrl", {
        get: function () {
            return this.gwUrl + this.dsContextPath;
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
    Object.defineProperty(T1CConfig.prototype, "gwUrl", {
        get: function () {
            return this._gwUrl;
        },
        set: function (value) {
            this._gwUrl = value;
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
    Object.defineProperty(T1CConfig.prototype, "gclJwt", {
        get: function () {
            return this._gclJwt;
        },
        set: function (value) {
            this._gclJwt = value;
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
    Object.defineProperty(T1CConfig.prototype, "gclDownloadLink", {
        get: function () {
            return this._gclDownloadLink;
        },
        set: function (value) {
            this._gclDownloadLink = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(T1CConfig.prototype, "gclVersion", {
        get: function () {
            return this._gclVersion;
        },
        set: function (value) {
            this._gclVersion = value;
        },
        enumerable: true,
        configurable: true
    });
    return T1CConfig;
}());
export { T1CConfig };
//# sourceMappingURL=T1CConfig.js.map