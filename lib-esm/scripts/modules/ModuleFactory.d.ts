import { LocalConnection } from "../core/client/Connection";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
import { AbstractAventra } from './smartcards/pki/aventra4/AventraModel';
export interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
}
export declare class ModuleFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidBE(reader_id: string): AbstractEidBE;
    createAventra4(reader_id: string): AbstractAventra;
}
