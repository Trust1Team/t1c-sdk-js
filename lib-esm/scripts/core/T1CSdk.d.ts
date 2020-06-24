import { CoreService } from './service/CoreService';
import { DataResponse } from './service/CoreModel';
import { T1CLibException } from './exceptions/CoreExceptions';
import { AbstractEidBE } from '../modules/smartcards/eid/be/EidBeModel';
import { T1CConfig } from './T1CConfig';
import { ModuleFactory } from "../modules/ModuleFactory";
export declare class T1CClient {
    private _t1cInstalled;
    private localConfig;
    private moduleFactory;
    private coreService;
    private connection;
    private authConnection;
    private authAdminConnection;
    private adminConnection;
    private remoteConnection;
    private remoteApiKeyConnection;
    private localTestConnection;
    constructor(cfg: T1CConfig);
    static checkPolyfills(): void;
    static initialize(cfg: T1CConfig, callback?: (error?: T1CLibException, client?: T1CClient) => void): Promise<T1CClient>;
    core: () => CoreService;
    config: () => T1CConfig;
    mf: () => ModuleFactory;
    beid: (reader_id: string) => AbstractEidBE;
    set t1cInstalled(value: boolean);
    retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
