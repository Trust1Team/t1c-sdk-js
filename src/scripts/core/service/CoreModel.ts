import {T1CLibException} from '../exceptions/CoreExceptions';
import {T1CClient} from '../T1CSdk';

export interface AbstractCore {
  // async
  //TODO
  getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
  //TODO
  getImplicitConsent(codeWord: string, durationInDays?: number, type?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
  info(callback?: (error: T1CLibException, data: InfoResponse) => void): void | Promise<InfoResponse>;
  reader(reader_id: string, callback?: (error: T1CLibException, data: SingleReaderResponse) => void): Promise<SingleReaderResponse>;
  readers(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
  readersCardAvailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
  readersCardsUnavailable(callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<CardReadersResponse>;
  getUrl(): string;
  checkT1cApiVersion(client: T1CClient, t1cVersion?: string): Promise<CheckT1CVersionResponse>;
  version(): Promise<string>;
}

export class T1CResponse {
  constructor(public success: boolean, public data: any) {}
}

export class BoolDataResponse extends T1CResponse {
  constructor(public data: boolean, public success: boolean) {
    super(success, data);
  }
}

export class DataResponse extends T1CResponse {
  constructor(public data: string, public success: boolean) {
    super(success, data);
  }
}

export class DataArrayResponse extends T1CResponse {
  constructor(public data: any[], public success: boolean) {
    super(success, data);
  }
}

export class DataObjectResponse extends T1CResponse {
  constructor(public data: {[key: string]: any}, public success: boolean) {
    super(success, data);
  }
}

export class InfoOS {
  constructor(public architecture: String, public os: String, public version: String){}
}
export class InfoJava {
  constructor(public runtime: String, public spec: String, public java: String){}
}
export class InfoUser {
  constructor(public timezone: String, public country: String, public language: String, public home: String, public tempDir: String) {}
}
export class InfoService{
  constructor(public url: String, public apiPort: String, public gRpcPort: String) {}
}
export class InfoApi{
  constructor(public service: InfoService,public activated: boolean,public citrix: boolean,public uid: String, public modules: Array<String>, public version: String, public logLevel: String) {}
}
export class InfoResponse { //extends T1CResponse
  constructor(public t1CinfoOS: InfoOS,public t1CInfoJava: InfoJava,public t1CInfoUser: InfoUser,public t1CInfoAPI: InfoApi) {
  }
}

export class T1CInfo {
  constructor(
    public activated: boolean,
    public citrix: boolean,
    public managed: boolean,
    public arch: string,
    public os: string,
    public uid: string,
    public containers: T1CContainer[],
    public version: string
  ) {}
}

export class T1CContainer {
  constructor(
    public name: string,
    public version: string,
    public status: string
  ) {}
}

export class T1CContainerid {
  constructor(public name: string) {}
}

export class BrowserInfoResponse extends T1CResponse {
  constructor(public data: BrowserInfo, public success: boolean) {
    super(success, data);
  }
}

export class BrowserInfo {
  constructor(
    public browser: {name: string; version: string},
    public manufacturer: string,
    public os: {name: string; version: string; architecture: string},
    public ua: string
  ) {}
}

export class SmartCard {
  constructor(public atr?: string, public description?: string[]) {}
}

export class CardReader {
  constructor(
    public id: string,
    public name: string,
    public pinpad: boolean,
    public card?: SmartCard
  ) {}
}

export class CardReadersResponse extends T1CResponse {
  constructor(public data: CardReader[], public success: boolean) {
    super(success, data);
  }
}

export class CertificateResponse extends T1CResponse {
  constructor(public data: T1CCertificate, public success: boolean) {
    super(success, data);
  }
}

export class CertificatesResponse extends T1CResponse {
  constructor(public data: T1CCertificate[], public success: boolean) {
    super(success, data);
  }
}


// certificate: Option[String], certificates: Option[Seq[String]] = None, certificateType: Option[String] = None, id: Option[String] = None
export class T1CCertificate {
  constructor(
    public certificate?: string,
    public certificates?: Array<string>,
    public certificateType?: string,
    public id?: string
  ) {}
}

export class SingleReaderResponse extends T1CResponse {
  constructor(public data: CardReader, public success: boolean) {
    super(success, data);
  }
}

export class CheckT1CVersion {
  constructor(public outDated: boolean, public downloadLink?: string) {}
}

export class CheckT1CVersionResponse extends T1CResponse {
  constructor(public data: CheckT1CVersion, public success: boolean) {
    super(success, data);
  }
}
