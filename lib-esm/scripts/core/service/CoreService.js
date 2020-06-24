import { CheckT1CVersion, CheckT1CVersionResponse, } from './CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
var CORE_CONSENT = '/consent';
var CORE_INFO = '/info';
var CORE_VERSION = '/v3';
var CORE_READERS = '/readers';
var CORE_CONSENT_IMPLICIT = '/consent/implicit';
var CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
import * as semver from 'semver';
var CoreService = (function () {
    function CoreService(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    CoreService.cardInsertedFilter = function (inserted) {
        return { cardInserted: inserted };
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
    CoreService.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.connection.post(this.url, CORE_RETUREVE_ENCRYPTED_PIN, {}, undefined, undefined, callback);
    };
    CoreService.prototype.reader = function (reader_id, callback) {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    };
    CoreService.prototype.readers = function (callback) {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, undefined, undefined, callback);
    };
    CoreService.prototype.readersCardAvailable = function (callback) {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, { 'cardInserted': true }, undefined, callback);
    };
    CoreService.prototype.readersCardsUnavailable = function (callback) {
        return this.connection.get(this.url, CORE_VERSION + CORE_READERS, { 'cardInserted': false }, undefined, callback);
    };
    CoreService.prototype.getUrl = function () {
        return this.url;
    };
    CoreService.prototype.checkT1cApiVersion = function (client, t1cVersion) {
        return new Promise(function (resolve, reject) {
            client.core().info().then(function (infoResponse) {
                var installedGclVersion = semver.coerce(infoResponse.t1CInfoAPI.version);
                var outdated = false;
                if (t1cVersion) {
                    outdated = semver.ltr(installedGclVersion, t1cVersion);
                }
                else {
                    if (client.config().t1cVersion) {
                        outdated = semver.ltr(installedGclVersion, client.config().t1cVersion);
                    }
                    else {
                        reject(new T1CLibException(412, '701', 'No version to check against was provided', client));
                    }
                }
                if (outdated === true) {
                    resolve(new CheckT1CVersionResponse(new CheckT1CVersion(outdated, client.config().t1cDownloadLink), true));
                }
                else {
                    resolve(new CheckT1CVersionResponse(new CheckT1CVersion(outdated), true));
                }
            }, function (err) {
                console.error('Could not receive info', err);
                reject(new T1CLibException(500, '700', 'Could not retrieve GCL information', client));
            });
        });
    };
    CoreService.prototype.version = function () {
        return Promise.resolve(VERSION);
    };
    return CoreService;
}());
export { CoreService };
//# sourceMappingURL=CoreService.js.map