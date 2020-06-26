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
import {T1CClient} from '../../..';

const CORE_CONSENT = '/consent';
const CORE_INFO = '/info';
const CORE_VERSION = '/v3';
const CORE_READERS = '/readers';
const CORE_CONSENT_IMPLICIT = '/consent/implicit';
const CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
import * as semver from 'semver';

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
    let days: number = this.connection.cfg.defaultConsentDuration;
    if (durationInDays) {
      days = durationInDays;
    }

    let timeout: number = this.connection.cfg.defaultConsentTimeout;
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
    type?: string,
    callback?: (error: T1CLibException, data: BoolDataResponse) => void
  ): Promise<BoolDataResponse> {
    /*        if (!codeWord || !codeWord.length) {
            return ResponseHandler.error({status: 400, description: 'Code word is required!', code: '801'}, callback);
        }*/
    let days: number = this.connection.cfg.defaultConsentDuration;
    if (durationInDays) {
      days = durationInDays;
    }
    return this.connection.post(
      this.url,
      CORE_CONSENT_IMPLICIT,
      {challenge: codeWord, days, type},
      undefined,
      undefined,
      callback
    );
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

  public checkT1cApiVersion(client: T1CClient, t1cVersion?: string): Promise<CheckT1CVersionResponse> {
    return new Promise<CheckT1CVersionResponse>((resolve, reject) => {
      client.core().info().then(
          infoResponse => {
            const installedGclVersion = semver.coerce(
              infoResponse.t1CInfoAPI.version
            );
            let outdated = false;
            if (t1cVersion) {
              outdated = semver.ltr(installedGclVersion, t1cVersion);
            } else {
              if (client.config().t1cVersion) {
                outdated = semver.ltr(
                  installedGclVersion,
                  client.config().t1cVersion
                );
              } else {
                reject(
                  new T1CLibException(
                    412,
                    '701',
                    'No version to check against was provided',
                    client
                  )
                );
              }
            }

            if (outdated === true) {
              resolve(
                new CheckT1CVersionResponse(
                  new CheckT1CVersion(
                    outdated,
                    client.config().t1cDownloadLink
                  ),
                  true
                )
              );
            } else {
              resolve(
                new CheckT1CVersionResponse(new CheckT1CVersion(outdated), true)
              );
            }
          },
          err => {
            console.error('Could not receive info', err);
            // TODO check if errorcode is good
            // failure probably because GCL is not installed
            reject(
              new T1CLibException(
                500,
                '700',
                'Could not retrieve GCL information',
                client
              )
            );
          }
        );
    });
  }

  // get Lib version
  public version(): Promise<string> {
    return Promise.resolve(VERSION);
  }
}
