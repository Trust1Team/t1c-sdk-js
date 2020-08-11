import {LocalAuthConnection} from '../client/Connection';
import {
  AbstractCore,
  BoolDataResponse,
  BrowserInfoResponse,
  CardReader,
  CardReadersResponse,
  CheckT1CVersion,
  CheckT1CVersionResponse,
  DataResponse,
  InfoResponse,
  SingleReaderResponse,
} from './CoreModel';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {T1CClient, T1CConfig} from '../../..';

const CORE_CONSENT = '/consent';
const CORE_INFO = '/info';
const CORE_VERSION = '/v3';
const CORE_READERS = '/readers';
const CORE_CONSENT_IMPLICIT = '/agents/consent';
const CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
import * as semver from 'semver';
import axios from "axios";

declare let VERSION: string;

/**
 * Core service functions: GCL information, reader detection, consent, polling, etc.
 */
export class CoreService implements AbstractCore {
  // constructor
  constructor(private url: string, private connection: LocalAuthConnection) {}

  private static cardInsertedFilter(inserted: boolean): {} {
    return {cardInserted: inserted};
  }

  public getConsent(
    title: string,
    codeWord: string,
    durationInDays?: number,
    alertLevel?: string,
    alertPosition?: string,
    type?: string,
    timeoutInSeconds?: number,
    callback?: (error: T1CLibException, data: BoolDataResponse) => void
  ): Promise<BoolDataResponse> {
    /*        if (!title || !title.length) {
            return ResponseHandler.error({status: 400, description: 'Title is required!', code: '801'}, callback);
        }
        if (!codeWord || !codeWord.length) {
            return ResponseHandler.error({status: 400, description: 'Code word is required!', code: '801'}, callback);
        }*/
    let days: number = 365;
    if (durationInDays) {
      days = durationInDays;
    }

    let timeout: number = 240;
    if (timeoutInSeconds) {
      timeout = timeoutInSeconds;
    }
    return this.connection.post(
      this.url,
      CORE_CONSENT,
      {
        title,
        text: codeWord,
        days,
        alert_level: alertLevel,
        alert_position: alertPosition,
        type,
        timeout,
      },
      undefined,
      undefined,
      callback
    );
  }


  /*NOTE: The application is responsible to copy the codeWord on the clipboard BEFORE calling this function*/
  public getImplicitConsent(
    codeWord: string,
    durationInDays?: number,
    callback?: (error: T1CLibException, data?: T1CClient) => void
  ): Promise<T1CClient> {
    return new Promise( (resolve,reject) => {
      let days: number = 365;
      if (durationInDays) {
        days = durationInDays;
      }
      return this.connection.get(
          this.connection.cfg.t1cProxyUrl,
          CORE_CONSENT_IMPLICIT + "/" + codeWord,
          {ttl: days * 24 * 60 * 60},
          undefined,
          callback
      ).then(res => {
        this.connection.cfg.t1cApiPort = res.data.apiPort;
        this.connection.cfg.t1cRpcPort = res.data.sandboxPort;
        const newClient = new T1CClient(this.connection.cfg)
        resolve(newClient)
      }, err => {
        reject(err);
      })
    });

  }

  public info(callback?: (error: T1CLibException, data: InfoResponse) => void): Promise<InfoResponse> {
    return this.connection.getSkipCitrix(
      this.url,
      CORE_INFO,
      undefined,
      undefined,
      callback
    );
  }

  public retrieveEncryptedUserPin(
    callback?: (error: T1CLibException, data: DataResponse) => void
  ): Promise<DataResponse> {
    return this.connection.post(
      this.url,
      CORE_RETUREVE_ENCRYPTED_PIN,
      {},
      undefined,
      undefined,
      callback
    );
  }

  public reader(
    reader_id: string,
    callback?: (error: T1CLibException, data: SingleReaderResponse) => void
  ): Promise<SingleReaderResponse> {
    return this.connection.get(
      this.url,
      CORE_VERSION + CORE_READERS + '/' + reader_id,
      undefined,
      undefined,
      callback
    );
  }

  public readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
    return this.connection.get(this.url, CORE_VERSION + CORE_READERS, undefined, undefined, callback);
  }

  public readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
    return this.connection.get(this.url, CORE_VERSION + CORE_READERS, {'cardInserted': true}, undefined, callback);
  }

  public readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse> {
    return this.connection.get(this.url, CORE_VERSION + CORE_READERS, {'cardInserted': false}, undefined, callback);
  }

  public getUrl(): string {
    return this.url;
  }

  // get Lib version
  public version(): Promise<string> {
    return Promise.resolve(VERSION);
  }
}
