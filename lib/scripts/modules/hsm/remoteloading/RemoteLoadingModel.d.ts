import { BoolDataResponse, DataResponse, T1CLibException, T1CResponse } from "../../../..";
export interface AbstractRemoteLoading {
    atr(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    apdu(apdu: APDU, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    apdus(apdu: APDU[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    ccid(feature: string, command: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    ccidFeatures(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    command(tx: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    commands(tx: string[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    closeSession(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    isPresent(sessionId?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
export declare class APDU {
    cla: string;
    ins: string;
    p1: string;
    p2: string;
    data?: string | undefined;
    le?: string | undefined;
    constructor(cla: string, ins: string, p1: string, p2: string, data?: string | undefined, le?: string | undefined);
}
export declare class CommandResponse extends T1CResponse {
    data: Command;
    success: boolean;
    constructor(data: Command, success: boolean);
}
export declare class CommandsResponse extends T1CResponse {
    data: Command[];
    success: boolean;
    constructor(data: Command[], success: boolean);
}
export declare class Command {
    sw: string;
    tx: string;
    rx?: string | undefined;
    constructor(sw: string, tx: string, rx?: string | undefined);
}
