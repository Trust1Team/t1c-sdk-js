import { LocalConnection } from "../core/client/Connection";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
import { AbstractAventra } from './smartcards/pki/aventra4/AventraModel';
import { AbstractOberthur73 } from "./smartcards/pki/oberthur73/OberthurModel";
import { AbstractIdemia } from "./smartcards/pki/idemia82/IdemiaModel";
import { AbstractEmv } from "./payment/emv/EmvModel";
import { AbstractFileExchange } from "./file/fileExchange/FileExchangeModel";
import { AbstractRemoteLoading } from "./hsm/remoteloading/RemoteLoadingModel";
import { AbstractEidGeneric } from "./smartcards/eid/generic/EidGenericModel";
export interface AbstractFactory {
    createEidGeneric(reader_id?: string): AbstractEidGeneric;
    createEidGenericMeta(): AbstractEidGeneric;
    createEidBE(reader_id?: string): AbstractEidBE;
    createEmv(reader_id?: string): AbstractEmv;
    createFileExchange(): AbstractFileExchange;
    createAventra(reader_id?: string): AbstractAventra;
    createOberthur(reader_id?: string): AbstractOberthur73;
}
export declare class ModuleFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidGeneric(reader_id: string): AbstractEidGeneric;
    createEidGenericMeta(): AbstractEidGeneric;
    createEidBE(reader_id: string): AbstractEidBE;
    createAventra(reader_id: string): AbstractAventra;
    createOberthur(reader_id: string): AbstractOberthur73;
    createIdemia(reader_id: string): AbstractIdemia;
    createEmv(reader_id: string): AbstractEmv;
    createFileExchange(): AbstractFileExchange;
    createRemoteLoading(reader_id: string): AbstractRemoteLoading;
}
