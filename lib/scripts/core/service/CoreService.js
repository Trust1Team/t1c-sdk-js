"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform = require("platform");
var CoreModel_1 = require("./CoreModel");
var CoreExceptions_1 = require("../exceptions/CoreExceptions");
var CORE_CONSENT = '/consent';
var CORE_INFO = '/';
var CORE_READERS = '/card-readers';
var CORE_CONSENT_IMPLICIT = '/consent/implicit';
var CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
var semver = require("semver");
var CoreService = (function () {
    function CoreService(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    CoreService.cardInsertedFilter = function (inserted) {
        return { 'card-inserted': inserted };
    };
    CoreService.platformInfo = function () {
        var _a, _b, _c, _d, _e;
        return {
            data: {
                manufacturer: platform.manufacturer || '',
                browser: {
                    name: platform.name ? platform.name : 'unknown',
                    version: platform.version ? platform.version : 'unknown',
                },
                os: {
                    name: ((_a = platform.os) === null || _a === void 0 ? void 0 : _a.family) ? (_b = platform.os) === null || _b === void 0 ? void 0 : _b.family : 'unknown',
                    version: ((_c = platform.os) === null || _c === void 0 ? void 0 : _c.version) ? (_d = platform.os) === null || _d === void 0 ? void 0 : _d.version : 'unknown',
                    architecture: ((_e = platform.os) === null || _e === void 0 ? void 0 : _e.architecture) ? platform.os.architecture.toString()
                        : 'unknown',
                },
                ua: platform.ua ? platform.ua : 'unknown',
            },
            success: true,
        };
    };
    CoreService.prototype.getConsent = function (title, codeWord, durationInDays, alertLevel, alertPosition, type, timeoutInSeconds, callback) {
        var days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        var timeout = this.connection.cfg.defaultConsentTimeout;
        if (timeoutInSeconds) {
            timeout = timeoutInSeconds;
        }
        return this.connection.post(this.url, CORE_CONSENT, {
            title: title,
            text: codeWord,
            days: days,
            alert_level: alertLevel,
            alert_position: alertPosition,
            type: type,
            timeout: timeout,
        }, undefined, undefined, callback);
    };
    CoreService.prototype.getImplicitConsent = function (codeWord, durationInDays, type, callback) {
        var days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        return this.connection.post(this.url, CORE_CONSENT_IMPLICIT, { challenge: codeWord, days: days, type: type }, undefined, undefined, callback);
    };
    CoreService.prototype.info = function (callback) {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, undefined, callback);
    };
    CoreService.prototype.infoBrowser = function (callback) {
        if (callback) {
            callback(undefined, CoreService.platformInfo());
            return undefined;
        }
        else {
            return Promise.resolve(CoreService.platformInfo());
        }
    };
    CoreService.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.connection.post(this.url, CORE_RETUREVE_ENCRYPTED_PIN, {}, undefined, undefined, callback);
    };
    CoreService.prototype.pollCardInserted = function (secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        var maxSeconds = secondsToPollCard || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
        }
    };
    CoreService.prototype.pollReadersWithCards = function (secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        var maxSeconds = secondsToPollCard || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
        });
    };
    CoreService.prototype.pollReaders = function (secondsToPollReader, callback, connectReaderCb, readerTimeoutCb) {
        var maxSeconds = secondsToPollReader || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
        });
    };
    CoreService.prototype.reader = function (reader_id, callback) {
        return this.connection.get(this.url, CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    };
    CoreService.prototype.readers = function (callback) {
        return this.connection.get(this.url, CORE_READERS, undefined, undefined, callback);
    };
    CoreService.prototype.readersCardAvailable = function (callback) {
        return this.connection.get(this.url, CORE_READERS, [CoreService.cardInsertedFilter(true)], undefined, callback);
    };
    CoreService.prototype.readersCardsUnavailable = function (callback) {
        return this.connection.get(this.url, CORE_READERS, [CoreService.cardInsertedFilter(false)], undefined, callback);
    };
    CoreService.prototype.infoBrowserSync = function () {
        return CoreService.platformInfo();
    };
    CoreService.prototype.getUrl = function () {
        return this.url;
    };
    CoreService.prototype.checkT1cApiVersion = function (client, gclVersion) {
        return new Promise(function (resolve, reject) {
            client
                .core()
                .info()
                .then(function (infoResponse) {
                var installedGclVersion = semver.coerce(infoResponse.data.version);
                var outdated = false;
                if (gclVersion) {
                    outdated = semver.ltr(installedGclVersion, gclVersion);
                }
                else {
                    if (client.config().t1cVersion) {
                        outdated = semver.ltr(installedGclVersion, client.config().t1cVersion);
                    }
                    else {
                        reject(new CoreExceptions_1.T1CLibException(412, '701', 'No version to check against was provided', client));
                    }
                }
                if (outdated === true) {
                    resolve(new CoreModel_1.CheckGclVersionResponse(new CoreModel_1.CheckGclVersion(outdated, client.config().t1cDownloadLink), true));
                }
                else {
                    resolve(new CoreModel_1.CheckGclVersionResponse(new CoreModel_1.CheckGclVersion(outdated), true));
                }
            }, function (err) {
                console.error('Could not receive info', err);
                reject(new CoreExceptions_1.T1CLibException(500, '700', 'Could not retrieve GCL information', client));
            });
        });
    };
    CoreService.prototype.version = function () {
        return Promise.resolve(VERSION);
    };
    return CoreService;
}());
exports.CoreService = CoreService;
//# sourceMappingURL=CoreService.js.map