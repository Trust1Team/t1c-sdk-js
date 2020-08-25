import {CoreService} from './service/CoreService';
import {
    LocalConnection,
    RemoteJwtConnection,
    LocalAuthConnection,
    LocalTestConnection,
    RemoteApiKeyConnection,
    LocalAuthAdminConnection,
    LocalAdminConnection, RequestHeaders,
} from './client/Connection';
import {DataResponse,} from './service/CoreModel';
import {T1CLibException} from './exceptions/CoreExceptions';
import {AbstractEidGeneric} from "../modules/smartcards/token/eid/generic/EidGenericModel";
import {AbstractEidBE} from '../modules/smartcards/token/eid/be/EidBeModel';
import {AbstractAventra} from '../modules/smartcards/token/pki/aventra4/AventraModel';
import {AbstractOberthur73} from "../modules/smartcards/token/pki/oberthur73/OberthurModel";
import {T1CConfig} from './T1CConfig';
import {Polyfills} from "../util/Polyfills";
import {ModuleFactory} from "../modules/ModuleFactory";
import {AbstractIdemia} from "../modules/smartcards/token/pki/idemia82/IdemiaModel";
import {AbstractEmv} from "../modules/smartcards/payment/emv/EmvModel";
import {AbstractFileExchange} from "../modules/file/fileExchange/FileExchangeModel";
import {AbstractRemoteLoading} from "../modules/hsm/remoteloading/RemoteLoadingModel";
import axios from 'axios';
import {AbstractPkcs11Generic} from "../modules/pkcs11/generic/Pkcs11GenericModel";
import {AbstractPaymentGeneric} from "../modules/smartcards/payment/generic/PaymentGenericModel";
import {AbstractPkcs11} from "../modules/pkcs11/pkcs11Object/pkcs11Model";

const urlVersion = "/v3";

export class T1CClient {
    private _t1cInstalled: boolean | undefined;
    private localConfig: T1CConfig;
    private moduleFactory: ModuleFactory;
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
        this.moduleFactory = new ModuleFactory(this.localConfig.t1cApiUrl + urlVersion, this.connection);
        this.localTestConnection = new LocalTestConnection(this.localConfig);
        this.coreService = new CoreService(this.localConfig.t1cApiUrl, this.authConnection);
        console.log("Core service initialized: " + this.localConfig.t1cApiUrl);
        this.coreService.version().then(info => console.log("Running T1C-sdk-js version: " + info))
    }

    public static checkPolyfills() {
        Polyfills.check();
    }

    public static initialize(cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void): Promise<T1CClient> {
        return new Promise((resolve, reject) => {
            axios.get(cfg.t1cApiUrl + "/info").then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    if (res.data.t1CInfoAPI.service.deviceType && res.data.t1CInfoAPI.service.deviceType == "PROXY") {
                        console.info("Proxy detected");
                        axios.get(cfg.t1cProxyUrl + "/consent", {withCredentials: true}).then((res) => {
                            cfg.t1cApiPort = res.data.data.apiPort;
                            const client = new T1CClient(cfg);
                            client.t1cInstalled = true;
                            resolve(client);
                        }, err => {
                            const client = new T1CClient(cfg);
                            reject(new T1CLibException(
                                "500",
                                "No valid consent found.",
                                client
                            ));
                        })
                    } else {
                        const client = new T1CClient(cfg);
                        client.t1cInstalled = true;
                        resolve(client);
                    }
                } else {
                    console.error(res.data)
                    const client = new T1CClient(cfg);
                    reject(new T1CLibException(
                        "100",
                        res.statusText,
                        client
                    ))
                }
            }, err => {
                const client = new T1CClient(cfg);
                reject(new T1CLibException(
                    "199",
                    "Failed to contact the Trust1Connector API",
                    client
                ))
                console.error(err);
            })
        });
    }

    /**
     * Init security context
     */
    // get auth service
    /*    public auth = (): AuthClient => {
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

    // get plugin factory
    public mf = (): ModuleFactory => {
        return this.moduleFactory;
    }
    public generic = (reader_id: string): AbstractEidGeneric => {
        return this.moduleFactory.createEidGeneric(reader_id)
    };

    public genericMeta = (): AbstractEidGeneric => {
        return this.moduleFactory.createEidGenericMeta()
    };

    public paymentGeneric = (reader_id: string): AbstractPaymentGeneric => {
        return this.moduleFactory.createPaymentGeneric(reader_id)
    };

    public paymentGenericMeta = (): AbstractPaymentGeneric => {
        return this.moduleFactory.createPaymentGenericMeta()
    };

    public pkcs11Generic = (): AbstractPkcs11Generic => {
        return this.moduleFactory.createPKCS11Generic()
    };

    public pkcs11 = (modulePath: string): AbstractPkcs11 => {
        return this.moduleFactory.createPKCS11(modulePath);
    };

    public fileex = (): AbstractFileExchange => {
        return this.moduleFactory.createFileExchange()
    };

    public beid = (reader_id: string): AbstractEidBE => {
        return this.moduleFactory.createEidBE(reader_id)
    };

    public remoteloading = (reader_id: string): AbstractRemoteLoading => {
        return this.moduleFactory.createRemoteLoading(reader_id)
    };

    public emv = (reader_id: string): AbstractEmv => {
        return this.moduleFactory.createEmv(reader_id)
    };
    // get instance for Aventra
    public aventra = (reader_id: string): AbstractAventra => {
        return this.moduleFactory.createAventra(reader_id);
    }

    // get instance for Oberthur
    public oberthur = (reader_id: string): AbstractOberthur73 => {
        return this.moduleFactory.createOberthur(reader_id);
    }

    // get instance for Oberthur
    public idemia = (reader_id: string): AbstractIdemia => {
        return this.moduleFactory.createIdemia(reader_id);
    }

    // get instance for Remote Loading
    /*    public readerapi = (reader_id: string): AbstractRemoteLoading => {
          return this.pluginFactory.createRemoteLoading(reader_id);
        };

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
    // public updateAuthConnection(cfg: T1CConfig) {
    //   this.authConnection = new LocalAuthConnection(cfg);
    //     cfg.t1cApiUrl,
    //     this.authConnection,
    //     this.adminConnection
    //   ); // TODO check if authConnection or LocalAuthAdminConnection should be passed
    //   this.coreService = new CoreService(cfg.t1cApiUrl, this.authConnection);
    // }
}
