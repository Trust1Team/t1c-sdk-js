import {
    BoolDataResponse,
    DataResponse,
    LocalConnection,
    T1CLibException
} from "../../../..";
import {AbstractRemoteLoading, CommandResponse, CommandsResponse, APDU} from "./RemoteLoadingModel";

export class RemoteLoading implements AbstractRemoteLoading {
    static PATHHSMMAPP = '/apps/hsm';
    static PATHREADERS = '/readers';

    static OPEN = '/open-session';
    static CLOSE = '/close-session';
    static CARDPRESENT = '/card-present';
    static ATR = '/atr';
    static CCIDFEATURES = '/ccid-features';
    static CCID = '/ccid';
    static COMMAND = '/command';
    static APDU = '/apdu';
    static COMMANDS = '/commands';
    static APDUS = '/apdus';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    // resolves the reader_id in the base URL
    protected reloApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += RemoteLoading.PATHHSMMAPP + RemoteLoading.PATHREADERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    apdu(apdu: APDU, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.APDU),
            {
                apdu: apdu,
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    apdus(apdu: APDU[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.APDUS),
            {
                apdus: apdu,
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    atr(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.ATR),
            {
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    ccid(feature: string, command: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.CCID),
            {
                feature: feature,
                command: command,
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    ccidFeatures(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.CCIDFEATURES),
            {
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    closeSession(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.CLOSE),
            {
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    command(tx: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.COMMAND),
            {
                command: tx,
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    commands(tx: string[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.COMMANDS),
            {
                commands: tx,
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    isPresent(sessionId?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.CARDPRESENT),
            {
                sessionId: sessionId
            },
            undefined,
            undefined,
            callback
        );
    }

    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.reloApp(RemoteLoading.OPEN),
            {
                timeout: timeout
            },
            undefined,
            undefined,
            callback
        );
    }


}
