'use strict';
exports.__esModule = true;
const CoreService_1 = require('./service/CoreService');
const Connection_1 = require('./client/Connection');
const DSClientModel_1 = require('./ds/DSClientModel');
const DSClient_1 = require('./ds/DSClient');
const OCVClient_1 = require('./ocv/OCVClient');
const PluginFactory_1 = require('../plugins/PluginFactory');
const GenericService_1 = require('./generic/GenericService');
const ResponseHandler_1 = require('../util/ResponseHandler');
const agent_1 = require('./agent/agent');
const admin_1 = require('./admin/admin');
const InitUtil_1 = require('../util/InitUtil');
const ClientService_1 = require('../util/ClientService');
const Auth_1 = require('./auth/Auth');
const moment = require('moment');
const Polyfills_1 = require('../util/Polyfills');
const DSException_1 = require('./exceptions/DSException');
const __1 = require('../..');
// check if any polyfills are needed
const defaults = {
  gclUrl: 'https://localhost:10443/v2',
  gwUrl: 'https://accapim.t1t.be:443',
  dsContextPath: '/trust1team/gclds/v2',
  ocvContextPath: '/trust1team/ocv-api/v1',
  dsContextPathTestMode: '/gcl-ds-web/v2',
  dsFileContextPath: '/trust1team/gclds-file/v1',
  tokenExchangeContextPath: '/apiengineauth/v1',
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
const GCLClient = /** @class */ (function () {
  function GCLClient(cfg, automatic) {
    const _this = this;
    // get admin services
    this.admin = function () {
      return _this.adminService;
    };
    // get auth service
    this.auth = function () {
      return _this.authClient;
    };
    // get core services
    this.core = function () {
      return _this.coreService;
    };
    // get core config
    this.config = function () {
      return _this.localConfig;
    };
    // get agent client services
    this.agent = function () {
      return _this.agentClient;
    };
    // get ds client services
    this.ds = function () {
      // als ds niet geconfigureerd is moet je hier een exception geven
      return new Promise((resolve, reject) => {
        if (_this.dsClient) {
          resolve(_this.dsClient);
        } else {
          reject(
            new DSException_1.DSException(
              'Distribution server is not configured'
            )
          );
        }
      });
    };
    // get ocv client services
    this.ocv = function () {
      return _this.ocvClient;
    };
    // get plugin factory
    this.pf = function () {
      return _this.pluginFactory;
    };
    // get instance for belgian eID card
    this.beid = function (reader_id) {
      return _this.pluginFactory.createEidBE(reader_id);
    };
    // get instance for belgian eID card
    this.beLawyer = function (reader_id) {
      return _this.pluginFactory.createBeLawyer(reader_id);
    };
    // get instance for spanish DNIe card
    this.dnie = function (reader_id) {
      return _this.pluginFactory.createDNIe(reader_id);
    };
    // get instance for luxemburg eID card
    this.luxeid = function (reader_id, pin, pinType, isEncrypted) {
      if (isEncrypted === void 0) {
        isEncrypted = false;
      }
      return _this.pluginFactory.createEidLUX(
        reader_id,
        pin,
        pinType,
        isEncrypted
      );
    };
    // get instance for luxtrust card
    this.luxtrust = function (reader_id, pin) {
      return _this.pluginFactory.createLuxTrust(reader_id);
    };
    // get instance for EMV
    this.emv = function (reader_id) {
      return _this.pluginFactory.createEmv(reader_id);
    };
    // get instance for MOBIB
    this.mobib = function (reader_id) {
      return _this.pluginFactory.createMobib(reader_id);
    };
    // get instance for OCRA
    this.ocra = function (reader_id) {
      return _this.pluginFactory.createOcra(reader_id);
    };
    // get instance for Aventra
    this.aventra = function (reader_id) {
      return _this.pluginFactory.createAventraNO(reader_id);
    };
    // get instance for Oberthur
    this.oberthur = function (reader_id) {
      return _this.pluginFactory.createOberthurNO(reader_id);
    };
    // get instance for PIV
    this.piv = function (reader_id) {
      return _this.pluginFactory.createPIV(reader_id);
    };
    // get instance for PT Eid
    this.pteid = function (reader_id) {
      return _this.pluginFactory.createEidPT(reader_id);
    };
    // get instance for PKCS11
    this.pkcs11 = function () {
      return _this.pluginFactory.createPKCS11();
    };
    // get instance for Remote Loading
    this.readerapi = function (reader_id) {
      return _this.pluginFactory.createRemoteLoading(reader_id);
    };
    // TODO change name
    // get instance for Belfius
    this.belfius = function (reader_id) {
      return _this.pluginFactory.createBelfius(reader_id);
    };
    // get instance for File Exchange
    this.filex = function () {
      return _this.pluginFactory.createFileExchange();
    };
    // get instance for Java key tool
    this.javakeytool = function () {
      return _this.pluginFactory.createJavaKeyTool();
    };
    // get instance for SSH
    this.ssh = function () {
      return _this.pluginFactory.createSsh();
    };
    // get instance for Wacom
    this.wacom = function () {
      return _this.pluginFactory.createWacom();
    };
    this.rawprint = function () {
      return _this.pluginFactory.createRawPrint(!_this.config().citrix);
    };
    this.isabel = function (reader_id) {
      return _this.pluginFactory.createIsabel(
        reader_id,
        !_this.config().citrix
      );
    };
    // resolve config to singleton
    this.localConfig = cfg;
    // init communication
    this.connection = new Connection_1.LocalConnection(this.localConfig);
    this.authConnection = new Connection_1.LocalAuthConnection(
      this.localConfig
    );
    this.authAdminConnection = new Connection_1.LocalAuthAdminConnection(
      this.localConfig
    );
    this.adminConnection = new Connection_1.LocalAdminConnection(
      this.localConfig
    );
    this.remoteConnection = new Connection_1.RemoteJwtConnection(
      this.localConfig
    );
    this.remoteApiKeyConnection = new Connection_1.RemoteApiKeyConnection(
      this.localConfig
    );
    this.localTestConnection = new Connection_1.LocalTestConnection(
      this.localConfig
    );
    this.pluginFactory = new PluginFactory_1.PluginFactory(
      this.localConfig.gclUrl,
      this.connection
    );
    // in citrix mode the admin endpoint should not be called through the agent
    this.adminService = new admin_1.AdminService(
      this.localConfig.gclUrl,
      this.authAdminConnection,
      this.adminConnection
    );
    this.coreService = new CoreService_1.CoreService(
      this.localConfig.gclUrl,
      this.authConnection
    );
    this.agentClient = new agent_1.AgentClient(
      this.localConfig.gclUrl,
      this.authConnection
    );
    // init DS if DS url is provided
    if (this.localConfig.dsUrl) {
      if (this.localConfig.localTestMode) {
        this.dsClient = new DSClient_1.DSClient(
          this.localConfig.dsUrl,
          this.localTestConnection,
          this.localConfig
        );
      } else {
        this.dsClient = new DSClient_1.DSClient(
          this.localConfig.dsUrl,
          this.remoteConnection,
          this.localConfig
        );
      }
    } else {
      this.dsClient = undefined;
    }
    // init OCV if OCV url is provided - check if initialised with API key or JWT to determine which to use
    if (this.localConfig.ocvUrl) {
      if (this.localConfig.apiKey && this.localConfig.apiKey.length) {
        this.ocvClient = new OCVClient_1.OCVClient(
          this.localConfig.ocvUrl,
          this.remoteApiKeyConnection
        );
      } else {
        this.ocvClient = new OCVClient_1.OCVClient(
          this.localConfig.ocvUrl,
          this.remoteConnection
        );
      }
    } else {
      this.ocvClient = undefined;
    }
    this.authClient = new Auth_1.AuthClient(
      this.localConfig,
      this.remoteApiKeyConnection
    );
    // keep reference to client in ClientService
    ClientService_1.ClientService.setClient(this);
    if (!automatic) {
      // setup security - fail safe
      GCLClient.initLibrary();
    }
  }
  GCLClient.checkPolyfills = function () {
    Polyfills_1.Polyfills.check();
  };
  GCLClient.initialize = function (cfg, callback) {
    return new Promise((resolve, reject) => {
      const initTime = moment();
      const client = new GCLClient(cfg, true);
      // keep reference to client in ClientService
      ClientService_1.ClientService.setClient(client);
      // will be set to false if init fails
      client.gclInstalled = true;
      /*            GCLClient.initLibrary().then(function () {
                if (callback && typeof callback === 'function') {
                    callback(null, client);
                }
                var completionTime = moment();
                var duration = moment.duration(completionTime.diff(initTime));
                console.log('init completed in ' + duration.asMilliseconds() + ' ms');
                resolve(client);
            }, function (error) {
                if (callback && typeof callback === 'function') {
                    callback(error, null);
                }
                reject(error);
            });*/
    });
  };
  /**
   * Init security context
   */
  GCLClient.initLibrary = function () {
    return InitUtil_1.InitUtil.initializeLibrary(
      ClientService_1.ClientService.getClient()
    );
  };
  GCLClient.prototype.encryptPin = function (pin) {
    return __1.PinEnforcer.encryptPin(pin);
  };
  Object.defineProperty(GCLClient.prototype, 'gclInstalled', {
    get: function () {
      return this._gclInstalled;
    },
    set: function (value) {
      this._gclInstalled = value;
    },
    enumerable: true,
    configurable: true,
  });
  // generic methods
  GCLClient.prototype.containerFor = function (readerId, callback) {
    return GenericService_1.GenericService.containerForReader(
      this,
      readerId,
      callback
    );
  };
  GCLClient.prototype.download = function (version, callback) {
    const _this = this;
    return this.core()
      .infoBrowser()
      .then(
        info => {
          const downloadData = new DSClientModel_1.DSDownloadRequest(
            info.data.browser,
            info.data.manufacturer,
            info.data.os,
            info.data.ua,
            _this.config().gwUrl,
            version
          );
          return _this.ds().then(
            ds => {
              return ds.downloadLink(downloadData, callback);
            },
            err => {
              return ResponseHandler_1.ResponseHandler.error(err, callback);
            }
          );
        },
        error => {
          return ResponseHandler_1.ResponseHandler.error(error, callback);
        }
      );
  };
  GCLClient.prototype.dumpData = function (readerId, data, callback) {
    return GenericService_1.GenericService.dumpData(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.readersCanAuthenticate = function (callback) {
    return GenericService_1.GenericService.authenticateCapable(this, callback);
  };
  GCLClient.prototype.authenticate = function (readerId, data, callback) {
    return GenericService_1.GenericService.authenticate(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.authenticateWithEncryptedPin = function (
    readerId,
    data,
    callback
  ) {
    return GenericService_1.GenericService.authenticateWithEncryptedPin(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.readersCanSign = function (callback) {
    return GenericService_1.GenericService.signCapable(this, callback);
  };
  GCLClient.prototype.sign = function (readerId, data, callback) {
    return GenericService_1.GenericService.sign(this, readerId, data, callback);
  };
  GCLClient.prototype.signWithEncryptedPin = function (
    readerId,
    data,
    callback
  ) {
    return GenericService_1.GenericService.signWithEncryptedPin(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.readersCanVerifyPin = function (callback) {
    return GenericService_1.GenericService.verifyPinCapable(this, callback);
  };
  GCLClient.prototype.verifyPin = function (readerId, data, callback) {
    return GenericService_1.GenericService.verifyPin(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.verifyPinWithEncryptedPin = function (
    readerId,
    data,
    callback
  ) {
    return GenericService_1.GenericService.verifyPinWithEncryptedPin(
      this,
      readerId,
      data,
      callback
    );
  };
  GCLClient.prototype.retrieveEncryptedUserPin = function (callback) {
    return this.core().retrieveEncryptedUserPin(callback);
  };
  /**
   * Utility methods
   */
  GCLClient.prototype.updateAuthConnection = function (cfg) {
    this.authConnection = new Connection_1.LocalAuthConnection(cfg);
    this.adminService = new admin_1.AdminService(
      cfg.gclUrl,
      this.authConnection,
      this.adminConnection
    ); // TODO check if authConnection or LocalAuthAdminConnection should be passed
    this.coreService = new CoreService_1.CoreService(
      cfg.gclUrl,
      this.authConnection
    );
  };
  return GCLClient;
})();
exports.GCLClient = GCLClient;
