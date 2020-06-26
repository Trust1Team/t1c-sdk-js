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
import axios from 'axios';
import { T1CLibException } from '../exceptions/CoreExceptions';
import * as store from 'store2';
import { UrlUtil } from '../../util/UrlUtil';
var GenericConnection = (function () {
    function GenericConnection(cfg) {
        this.cfg = cfg;
    }
    GenericConnection.disabledWithoutApiKey = function (callback) {
    };
    GenericConnection.extractAccessToken = function (headers, config) {
        if (headers && headers.access_token) {
            config.t1cJwt = headers.access_token;
        }
    };
    GenericConnection.prototype.get = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
    };
    GenericConnection.prototype.post = function (basePath, suffix, body, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, headers, callback);
    };
    GenericConnection.prototype.put = function (basePath, suffix, body, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        return this.handleRequest(basePath, suffix, 'PUT', this.cfg, securityConfig, body, queryParams, headers, callback);
    };
    GenericConnection.prototype.delete = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        return this.handleRequest(basePath, suffix, 'DELETE', this.cfg, securityConfig, undefined, queryParams, headers, callback);
    };
    GenericConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['T1C-CSRF-Token'] = 'client';
        return reqHeaders;
    };
    GenericConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: true,
            sendT1CJwt: true,
            sendApiKey: false,
            sendToken: true,
            skipCitrixCheck: true,
        };
    };
    GenericConnection.prototype.handleRequest = function (basePath, suffix, method, t1cConfig, securityConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (securityConfig.skipCitrixCheck ||
            !t1cConfig.citrix) {
            var config_1 = {
                url: UrlUtil.create(basePath, suffix, securityConfig.skipCitrixCheck),
                method: method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json',
            };
            if (body) {
                config_1.data = body;
            }
            if (params) {
                config_1.params = params;
            }
            if (securityConfig.sendApiKey) {
                config_1.headers.apikey = t1cConfig.apiKey;
            }
            if (securityConfig.sendT1CJwt) {
                config_1.headers.Authorization = 'Bearer ' + t1cConfig.t1cJwt;
            }
            return new Promise(function (resolve, reject) {
                var securityPromise;
                if (securityConfig.sendGwJwt) {
                    securityPromise = t1cConfig.t1cJwt;
                }
                else {
                    securityPromise = Promise.resolve('');
                }
                securityPromise.then(function (jwt) {
                    if (securityConfig.sendGwJwt) {
                        config_1.headers.Authorization = 'Bearer ' + jwt;
                    }
                    axios
                        .request(config_1)
                        .then(function (response) {
                        GenericConnection.extractAccessToken(response.headers, t1cConfig);
                        callback(undefined, response.data);
                        return resolve(response.data);
                    })
                        .catch(function (error) {
                        if (!error.code && !error.response) {
                            var thrownError = new T1CLibException(500, '999', 'Network error occurred. Request could not be completed');
                            callback(thrownError, null);
                            return reject(thrownError);
                        }
                        else {
                            if (error.response) {
                                if (error.response.data) {
                                    if (error.response.data.message) {
                                        callback(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data.message), undefined);
                                        return reject(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data.message));
                                    }
                                    else if (error.response.data.description) {
                                        callback(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data.description), null);
                                        return reject(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data.description));
                                    }
                                    else {
                                        callback(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data), null);
                                        return reject(new T1CLibException(500, '' +
                                            (error.response.data.code || error.code || '998'), error.response.data));
                                    }
                                }
                                else {
                                    callback(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error.response)), null);
                                    return reject(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error.response)));
                                }
                            }
                            else {
                                callback(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error)), null);
                                return reject(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error)));
                            }
                        }
                    });
                }, function (err) {
                    return reject(err);
                });
            });
        }
        else {
            var agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801',
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
    };
    GenericConnection.AUTH_TOKEN_HEADER = 'X-Authentication-Token';
    GenericConnection.BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';
    GenericConnection.RELAY_STATE_HEADER_PREFIX = 'X-Relay-State-';
    GenericConnection.HEADER_GCL_LANG = 'X-Language-Code';
    return GenericConnection;
}());
export { GenericConnection };
var LocalAdminConnection = (function (_super) {
    __extends(LocalAdminConnection, _super);
    function LocalAdminConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalAdminConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: false,
            sendT1CJwt: false,
            sendApiKey: false,
            sendToken: true,
            skipCitrixCheck: true,
        };
    };
    return LocalAdminConnection;
}(GenericConnection));
export { LocalAdminConnection };
var LocalAuthAdminConnection = (function (_super) {
    __extends(LocalAuthAdminConnection, _super);
    function LocalAuthAdminConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalAuthAdminConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        reqHeaders.Authorization = 'Bearer ' + this.cfg.t1cJwt;
        return reqHeaders;
    };
    LocalAuthAdminConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: false,
            sendT1CJwt: true,
            sendApiKey: false,
            sendToken: true,
            skipCitrixCheck: true,
        };
    };
    LocalAuthAdminConnection.prototype.requestLogFile = function (basePath, suffix, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        var headers = this.getRequestHeaders({});
        return new Promise(function (resolve, reject) {
            axios
                .get(UrlUtil.create(basePath, suffix, true), {
                responseType: 'blob',
                headers: headers,
            })
                .then(function (response) {
                callback(null, response);
                return resolve(response);
            }, function (error) {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    };
    return LocalAuthAdminConnection;
}(GenericConnection));
export { LocalAuthAdminConnection };
var LocalAuthConnection = (function (_super) {
    __extends(LocalAuthConnection, _super);
    function LocalAuthConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalAuthConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        reqHeaders.Authorization = 'Bearer ' + this.cfg.t1cJwt;
        return reqHeaders;
    };
    LocalAuthConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: false,
            sendT1CJwt: true,
            sendApiKey: false,
            sendToken: true,
            skipCitrixCheck: false,
        };
    };
    LocalAuthConnection.prototype.getSkipCitrix = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, this.getRequestHeaders(headers), callback);
    };
    LocalAuthConnection.prototype.postSkipCitrix = function (basePath, suffix, queryParams, body, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, this.getRequestHeaders(headers), callback);
    };
    LocalAuthConnection.prototype.requestLogFile = function (basePath, suffix, callback) {
        var _this = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            var headers = _this.getRequestHeaders({});
            axios
                .get(UrlUtil.create(basePath, suffix, false), {
                responseType: 'blob',
                headers: headers,
            })
                .then(function (response) {
                callback(null, response);
                return resolve(response);
            }, function (error) {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    };
    return LocalAuthConnection;
}(GenericConnection));
export { LocalAuthConnection };
var LocalConnection = (function (_super) {
    __extends(LocalConnection, _super);
    function LocalConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        var contextToken = this.cfg.contextToken;
        return reqHeaders;
    };
    LocalConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: false,
            sendT1CJwt: false,
            sendApiKey: false,
            sendToken: true,
            skipCitrixCheck: false,
        };
    };
    LocalConnection.prototype.getSkipCitrix = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
    };
    return LocalConnection;
}(GenericConnection));
export { LocalConnection };
var RemoteApiKeyConnection = (function (_super) {
    __extends(RemoteApiKeyConnection, _super);
    function RemoteApiKeyConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    RemoteApiKeyConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: false,
            sendT1CJwt: false,
            sendApiKey: true,
            sendToken: false,
            skipCitrixCheck: true,
        };
    };
    return RemoteApiKeyConnection;
}(GenericConnection));
export { RemoteApiKeyConnection };
var RemoteJwtConnection = (function (_super) {
    __extends(RemoteJwtConnection, _super);
    function RemoteJwtConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    RemoteJwtConnection.prototype.getSecurityConfig = function () {
        return {
            sendGwJwt: true,
            sendT1CJwt: false,
            sendApiKey: false,
            sendToken: false,
            skipCitrixCheck: true,
        };
    };
    return RemoteJwtConnection;
}(GenericConnection));
export { RemoteJwtConnection };
var LocalTestConnection = (function (_super) {
    __extends(LocalTestConnection, _super);
    function LocalTestConnection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = undefined;
        return _this;
    }
    LocalTestConnection.prototype.get = function (basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'GET', this.config, undefined, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.post = function (basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'POST', this.config, body, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.put = function (basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'PUT', this.config, body, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.delete = function (basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'DELETE', this.config, undefined, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['X-Consumer-Username'] = 'testorg.testapp.v1';
        reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = store.get(GenericConnection.BROWSER_AUTH_TOKEN);
        return reqHeaders;
    };
    LocalTestConnection.prototype.handleTestRequest = function (basePath, suffix, method, gclConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (gclConfig.citrix && gclConfig.agentPort === -1) {
            var agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801',
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
        else {
            var config_2 = {
                url: UrlUtil.create(basePath, suffix, true),
                method: method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json',
            };
            if (body) {
                config_2.data = body;
            }
            if (params) {
                config_2.params = params;
            }
            if (gclConfig.t1cJwt) {
                config_2.headers.Authorization = 'Bearer ' + gclConfig.t1cJwt;
            }
            return new Promise(function (resolve, reject) {
                axios
                    .request(config_2)
                    .then(function (response) {
                    callback(null, response.data);
                    return resolve(response.data);
                })
                    .catch(function (error) {
                    if (error.response) {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                    else {
                        callback(error, null);
                        return reject(error);
                    }
                });
            });
        }
    };
    return LocalTestConnection;
}(GenericConnection));
export { LocalTestConnection };
//# sourceMappingURL=Connection.js.map