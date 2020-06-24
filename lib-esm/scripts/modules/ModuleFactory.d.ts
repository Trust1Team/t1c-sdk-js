import { LocalConnection } from "../core/client/Connection";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
export interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
}
export declare class ModuleFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidBE(reader_id: string): AbstractEidBE;
}
