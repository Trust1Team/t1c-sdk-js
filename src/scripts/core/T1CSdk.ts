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
import {AbstractPaymentGeneric} from "../modules/smartcards/payment/generic/PaymentGenericModel";
import {AbstractCrelan} from "../modules/smartcards/payment/crelan/CrelanModel";
import {AbstractEidLux, PinType} from "../modules/smartcards/token/eid/lux/EidLuxModel";
import {AbstractWacom} from "../modules/wacom/WacomModel";
import {AbstractEidDiplad} from "../modules/smartcards/token/eid/diplad/EidDipladModel";
import {AbstractRawPrint} from "../modules/print/rawprint/RawPrintModel";
import {AbstractCertigna} from "../modules/smartcards/token/pki/certigna/CertignaModel";
import {AbstractCertinomis} from "../modules/smartcards/token/pki/certinomis/CertinomisModel";
import {ConsentUtil} from "../util/ConsentUtil";
import {AbstractDNIe} from "../modules/smartcards/token/pki/dnie/DNIeModel";
import {AbstractSafenet} from "../modules/smartcards/token/pki/safenet/SafenetModel";
import {AbstractEherkenning} from "../modules/smartcards/token/pki/eHerkenning/eHerkenningModel";
import {AbstractJcop} from "../modules/smartcards/token/pki/jcop/JcopModel";
import {AbstractAirbus} from "../modules/smartcards/token/pki/airbus/AirbusModel";
import { AbstractLuxTrust } from "../modules/smartcards/token/eid/luxtrust/LuxTrustModel";

const urlVersion = "/v3";
const semver = require('semver');

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
        // this.coreService.version().then(info => console.info("Running T1C-sdk-js version: " + info))
    }

    public static checkPolyfills() {
        Polyfills.check();
    }

    public static initialize(cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void): Promise<T1CClient> {
        return new Promise((resolve, reject) => {
            // Base client
            let _client = new T1CClient(cfg);
            _client.core().info().then(infoRes => {
                _client.config().version = infoRes.t1CInfoAPI?.version;
                if (infoRes.t1CInfoAPI?.service?.deviceType === "PROXY") {
                    if (infoRes.t1CInfoAPI?.service?.distributionServiceUrl && infoRes.t1CInfoAPI.service.dsRegistryActivated) {
                        _client.config().dsUrl = infoRes.t1CInfoAPI.service.distributionServiceUrl
                    }
                    if (infoRes.t1CInfoUser?.hostName) {
                        _client.config().deviceHostName = infoRes.t1CInfoUser.hostName
                    }

                    if (infoRes.t1CInfoAPI && semver.lt(semver.coerce(infoRes.t1CInfoAPI.version).version, '3.5.0')) {
                        this._init(resolve, reject, _client.config(), callback);
                    } else {
                        this.init(resolve, reject, _client.config(), callback);
                    }
                } else {
                    _client.coreService.getDevicePublicKey();
                    resolve(_client);
                }
            }, err => {
                console.error(err)
                if (callback && typeof callback === 'function') {callback(new T1CLibException("112999", "Failed to contact the Trust1Connector", _client), _client);}
                reject(new T1CLibException("112999", "Failed to contact the Trust1Connector", _client));
            });
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
    public generic = (reader_id: string, pin?: string, pinType?: PinType): AbstractEidGeneric => {
        return this.moduleFactory.createEidGeneric(reader_id, pin, pinType)
    };

    public paymentGeneric = (reader_id: string): AbstractPaymentGeneric => {
        return this.moduleFactory.createPaymentGeneric(reader_id)
    };

    public fileex = (): AbstractFileExchange => {
        return this.moduleFactory.createFileExchange()
    };

    public rawprint = (): AbstractRawPrint => {
        return this.moduleFactory.createRawPrint()
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

    public crelan = (reader_id: string): AbstractCrelan => {
        return this.moduleFactory.createCrelan(reader_id)
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

    public luxeid = (reader_id: string, pin: string, pin_type: PinType): AbstractEidLux => {
        return this.moduleFactory.createEidLUX(reader_id, pin, pin_type);
    }

    public wacom = (): AbstractWacom => {
        return this.moduleFactory.createWacom();
    }

    public diplad = (reader_id: string): AbstractEidDiplad => {
        return this.moduleFactory.createEidDiplad(reader_id);
    }

    public certigna = (reader_id: string): AbstractCertigna => {
        return this.moduleFactory.createCertigna(reader_id);
    }

    public certinomis = (reader_id: string): AbstractCertinomis => {
        return this.moduleFactory.createCertinomis(reader_id);
    }

    public dnie = (reader_id: string): AbstractDNIe => {
        return this.moduleFactory.createDNIe(reader_id);
    }

    public safenet = (reader_id: string): AbstractSafenet => {
        return this.moduleFactory.createSafenet(reader_id);
    }

    public eherkenning = (reader_id: string): AbstractEherkenning => {
        return this.moduleFactory.createEherkenning(reader_id);
    }

    public jcop = (reader_id: string): AbstractJcop => {
        return this.moduleFactory.createJcop(reader_id);
    }

    public airbus = (reader_id: string): AbstractAirbus => {
        return this.moduleFactory.createAirbus(reader_id);
    }

    public luxtrust = (reader_id: string): AbstractLuxTrust => {
        return this.moduleFactory.createLuxTrust(reader_id);
    }


    set t1cInstalled(value: boolean) {
        this._t1cInstalled = value;
    }


    private static init(resolve: (value?: (PromiseLike<T1CClient> | T1CClient)) => void, reject: (reason?: any) => void, cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void) {
        // base client config
        let _client = new T1CClient(cfg);
        const currentConsent = ConsentUtil.getRawConsent(cfg.applicationDomain + "::" + cfg.t1cApiUrl)
        if (currentConsent != null) {
            // Validate
            _client.core().validateConsent().then(validateRes => {
                resolve(validateRes);
            }, err => {
                if (!callback || typeof callback !== 'function') { callback = function () {}; }
                callback(new T1CLibException("814501", err.description ? err.description : "No valid consent", _client), undefined)
                reject(new T1CLibException("814501", err.description ? err.description : "No valid consent", _client));
            })

        } else {
            // Consent required
            let error = new T1CLibException("814501", "Consent required", _client)
            if (callback && typeof callback === 'function') {callback(error, undefined);}
            reject(error)
        }
    }


    // Random generation for copy to clipboard
    public static generateConsentToken(): string {
        const prefix = "::t1c::miksa::";
        const length = 32;
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return prefix + result;
    }

    /**
     * Deprecated
     */
    private static _init(resolve: (value?: (PromiseLike<T1CClient> | T1CClient)) => void, reject: (reason?: any) => void, cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void) {
        axios.get(cfg.t1cApiUrl + "/info", {
            withCredentials: true, headers: {
                Authorization: "Bearer " + cfg.t1cJwt,
                "X-CSRF-Token": "t1c-js"
            }
        }).then((infoRes) => {
            if (infoRes.status >= 200 && infoRes.status < 300) {
                if (infoRes.data.t1CInfoAPI.service.deviceType && infoRes.data.t1CInfoAPI.service.deviceType == "PROXY") {
                    console.info("Proxy detected");
                    axios.get(cfg.t1cApiUrl + "/consent", {
                        withCredentials: true, headers: {
                            Authorization: "Bearer " + cfg.t1cJwt,
                            "X-CSRF-Token": "t1c-js"
                        }
                    }).then((res) => {
                        cfg.t1cApiPort = res.data.data.apiPort;
                        const client = new T1CClient(cfg);
                        client.t1cInstalled = true;
                        client.coreService.getDevicePublicKey();
                        if (callback && typeof callback === 'function') { callback(undefined, client); }
                        resolve(client);
                    }, err => {
                        const client = new T1CClient(cfg);
                        reject(new T1CLibException(err.response?.data.code, err.response?.data.description, client));
                    })
                } else {
                    cfg.version = infoRes.data.t1CInfoAPI.version;
                    const client = new T1CClient(cfg);
                    client.coreService.getDevicePublicKey();
                    if (callback && typeof callback === 'function') { callback(undefined, client); }
                    resolve(client);
                }
            } else {
                const client = new T1CClient(cfg);
                client.coreService.getDevicePublicKey();
                const error = new T1CLibException("112999", infoRes.statusText, client)
                if (callback && typeof callback === 'function') { callback(error, client); }
                reject(error)
            }
        }, err => {
            const client = new T1CClient(cfg);
            reject(new T1CLibException("112999", "Failed to contact the Trust1Connector API", client))
            console.error(err);
        })
    }

}
