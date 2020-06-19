import { CoreService } from './service/CoreService';
import { DataResponse } from './service/CoreModel';
import { T1CLibException } from './exceptions/CoreExceptions';
import { T1CConfig } from './T1CConfig';
export declare class T1CClient {
    private _gclInstalled;
    private localConfig;
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
    set gclInstalled(value: boolean);
    retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
