import { LocalAuthConnection } from '../client/Connection';
import { AbstractCore, BoolDataResponse, CardReadersResponse, CheckT1CVersionResponse, DataResponse, InfoResponse, SingleReaderResponse } from './CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { T1CClient } from '../../..';
export declare class CoreService implements AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: LocalAuthConnection);
    private static cardInsertedFilter;
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    info(callback?: (error: T1CLibException, data: InfoResponse) => void): Promise<InfoResponse>;
    retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
    readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
    getUrl(): string;
    checkT1cApiVersion(client: T1CClient, t1cVersion?: string): Promise<CheckT1CVersionResponse>;
    version(): Promise<string>;
}
