import {CoreService} from './service/CoreService';
import {
  LocalConnection,
  RemoteJwtConnection,
  LocalAuthConnection,
  LocalTestConnection,
  RemoteApiKeyConnection,
  LocalAuthAdminConnection,
  LocalAdminConnection,
} from './client/Connection';
/*import {DSDownloadLinkResponse, DSDownloadRequest} from './ds/DSClientModel';
import {DSClient} from './ds/DSClient';*/
import {
  CardReadersResponse,
  CheckGclVersionResponse,
  DataResponse,
  T1CContainer,
  T1CContainerid,
} from './service/CoreModel';
import {AbstractEidBE} from '../plugins/smartcards/eid/be/EidBeModel';
import {T1CLibException} from './exceptions/CoreExceptions';
import * as moment from 'moment';
import {Polyfills} from '../util/Polyfills';
import {T1CConfig} from './T1CConfig';
import {DSException} from './exceptions/DSException';

// check if any polyfills are needed
const defaults = {
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

export class T1CClient {
  private _t1cInstalled: boolean | undefined;
  private localConfig: T1CConfig;
  private coreService: CoreService;
  private connection: LocalConnection;
  private authConnection: LocalAuthConnection;
  private authAdminConnection: LocalAuthAdminConnection;
  private adminConnection: LocalAdminConnection;
  private remoteConnection: RemoteJwtConnection;
  private remoteApiKeyConnection: RemoteApiKeyConnection;
  private localTestConnection: LocalTestConnection;

  public constructor(cfg: T1CConfig) {
    // resolve config to singleton
    this.localConfig = cfg;
    // init communication
    this.connection = new LocalConnection(this.localConfig);
    this.authConnection = new LocalAuthConnection(this.localConfig);
    this.authAdminConnection = new LocalAuthAdminConnection(this.localConfig);
    this.adminConnection = new LocalAdminConnection(this.localConfig);
    this.remoteConnection = new RemoteJwtConnection(this.localConfig);
    this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.localConfig);
    this.localTestConnection = new LocalTestConnection(this.localConfig);
    // in citrix mode the admin endpoint should not be called through the agent
    /*    this.adminService = new AdminService(
      this.localConfig.t1cApiUrl,
      this.authAdminConnection,
      this.adminConnection
    );*/
    this.coreService = new CoreService(
      this.localConfig.t1cApiUrl,
      this.authConnection
    );
    // init DS if DS url is provided
    /*    if (this.localConfig.dsUrl) {
      if (this.localConfig.localTestMode) {
        this.dsClient = new DSClient(
          this.localConfig.dsUrl,
          this.localTestConnection,
          this.localConfig
        );
      } else {
        this.dsClient = new DSClient(
          this.localConfig.dsUrl,
          this.remoteConnection,
          this.localConfig
        );
      }
    } else {
      this.dsClient = {} as DSClient;
    }

    this.authClient = new AuthClient(
      this.localConfig,
      this.remoteApiKeyConnection
    );
    // keep reference to client in ClientService
    ClientService.setClient(this);*/
  }

  public static checkPolyfills() {
    Polyfills.check();
  }

  public static initialize(cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void): Promise<T1CClient> {
    return new Promise((resolve, reject) => {
      const initTime = moment();
      const client = new T1CClient(cfg);
      // keep reference to client in ClientService
      // ClientService.setClient(client);
      // will be set to false if init fails
      client.t1cInstalled = true;

      /*      T1CClient.initLibrary().then(
        () => {
          if (callback && typeof callback === 'function') {
            callback(undefined, client);
          }
          const completionTime = moment();
          const duration = moment.duration(completionTime.diff(initTime));
          console.log('init completed in ' + duration.asMilliseconds() + ' ms');
          resolve(client);
        },
        error => {
          if (callback && typeof callback === 'function') {
            callback(error, undefined);
          }
          reject(error);
        }
      );*/
    });
  }

  /**
   * Init security context
   */

  /*  public encryptPin(pin: string): string {
    //return PinEnforcer.encryptPin(pin);
  }*/

  // get admin services
  /*public admin = (): AdminService => {
    return this.adminService;
  };
  // get auth service
  public auth = (): AuthClient => {
    return this.authClient;
  };*/
  // get core services
  public core = (): CoreService => {
    return this.coreService;
  };
  // get core config
  public config = (): T1CConfig => {
    return this.localConfig;
  };

  // get ds client services
  /*  public ds = (): Promise<DSClient> => {
    // als ds niet geconfigureerd is moet je hier een exception geven
    return new Promise((resolve, reject) => {
      if (this.dsClient) {
        resolve(this.dsClient);
      } else {
        reject(new DSException('Distribution server is not configured'));
      }
    });
  };*/

  // get plugin factory
  /*  public pf = (): PluginFactory => {
    return this.pluginFactory;
  };
  // get instance for belgian eID card
  public beid = (reader_id?: string): AbstractEidBE => {
    return this.pluginFactory.createEidBE(reader_id);
  };
  // get instance for Remote Loading
  public readerapi = (reader_id: string): AbstractRemoteLoading => {
    return this.pluginFactory.createRemoteLoading(reader_id);
  };
  // TODO change name
  // get instance for Belfius
  public belfius = (reader_id: string): AbstractBelfius => {
    return this.pluginFactory.createBelfius(reader_id);
  };
  // get instance for File Exchange
  public filex = (): AbstractFileExchange => {
    return this.pluginFactory.createFileExchange();
  };*/

  set t1cInstalled(value: boolean) {
    this._t1cInstalled = value;
  }

  /*  public download(
    version?: string,
    callback?: (error: T1CLibException, data: DSDownloadLinkResponse) => void
  ) {
    return this.core()
      .infoBrowser()
      .then(
        info => {
          const downloadData = new DSDownloadRequest(
            info.data.browser,
            info.data.manufacturer,
            info.data.os,
            info.data.ua,
            this.config().dsUrl,
            version
          );
          return this.ds().then(
            ds => {
              return ds.downloadLink(downloadData, callback);
            },
            err => {
              return ResponseHandler.error(err, callback);
            }
          );
        },
        error => {
          return ResponseHandler.error(error, callback);
        }
      );
  }*/

  public retrieveEncryptedUserPin(
    callback?: (error: T1CLibException, data: DataResponse) => void
  ) {
    return this.core().retrieveEncryptedUserPin(callback);
  }

  /**
   * Utility methods
   */
  /*  public updateAuthConnection(cfg: T1CConfig) {
    this.authConnection = new LocalAuthConnection(cfg);
    this.adminService = new AdminService(
      cfg.t1cApiUrl,
      this.authConnection,
      this.adminConnection
    ); // TODO check if authConnection or LocalAuthAdminConnection should be passed
    this.coreService = new CoreService(cfg.t1cApiUrl, this.authConnection);
  }*/
}
