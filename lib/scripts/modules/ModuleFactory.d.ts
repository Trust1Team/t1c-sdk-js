import { LocalConnection } from "../core/client/Connection";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
import { AbstractAventra } from './smartcards/pki/aventra4/AventraModel';
import { AbstractOberthur73 } from "./smartcards/pki/oberthur73/OberthurModel";
import { AbstractIdemia } from "./smartcards/pki/idemia82/IdemiaModel";
import { AbstractEmv } from "./payment/emv/EmvModel";
export interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEmv(reader_id?: string): AbstractEmv;
}
export declare class ModuleFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidBE(reader_id: string): AbstractEidBE;
    createAventra4(reader_id: string): AbstractAventra;
    createOberthur(reader_id: string): AbstractOberthur73;
    createIdemia(reader_id: string): AbstractIdemia;
    createEmv(reader_id: string): AbstractEmv;
}
