import {BoolDataResponse, DataResponse, T1CLibException, T1CResponse} from "../../../..";


export interface AbstractRemoteLoading {
    atr(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    apdu(apdu: APDU, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    apdus(apdu: APDU[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    ccid(feature: CCIDFeature, command: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    ccidFeatures(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    command(tx: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    commands(tx: string[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    closeSession(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    isPresent(sessionId?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}

/* Model */

export class APDU {
    constructor(public cla: string, public ins: string, public p1: string, public p2: string, public data?: string, public le?: string) {
    }
}

export class CommandResponse extends T1CResponse {
    constructor(public data: Command, public success: boolean) {
        super(success, data);
    }
}

export class CommandsResponse extends T1CResponse {
    constructor(public data: Command[], public success: boolean) {
        super(success, data);
    }
}

export class Command {
    constructor(public sw: string, public tx: string, public rx?: string) {
    }
}

export enum CCIDFeature {
    VERIFY_PIN_DIRECT = 'VERIFY_PIN_DIRECT',
    MODIFY_PIN_DIRECT = 'MODIFY_PIN_DIRECT',
    GET_TLV_PROPERTIES = 'GET_TLV_PROPERTIES'
}
