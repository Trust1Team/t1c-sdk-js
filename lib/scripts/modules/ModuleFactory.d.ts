import { LocalConnection } from "../core/client/Connection";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
import { AbstractAventra } from './smartcards/pki/aventra4/AventraModel';
import { AbstractOberthur73 } from "./smartcards/pki/oberthur73/OberthurModel";
import { AbstractIdemia } from "./smartcards/pki/idemia82/IdemiaModel";
import { AbstractEmv } from "./payment/emv/EmvModel";
import { AbstractFileExchange } from "./file/fileExchange/FileExchangeModel";
import { AbstractRemoteLoading } from "./hsm/remoteloading/RemoteLoadingModel";
import { AbstractEidGeneric } from "./smartcards/eid/generic/EidGenericModel";
import { AbstractPkcs11Generic } from "./pkcs11/generic/Pkcs11GenericModel";
import { AbstractEidDiplad } from "./smartcards/eid/diplad/EidDipladModel";
export interface AbstractFactory {
    createEidGeneric(reader_id?: string): AbstractEidGeneric;
    createEidGenericMeta(): AbstractEidGeneric;
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidDiplad(reader_id?: string): AbstractEidDiplad;
    createEmv(reader_id?: string): AbstractEmv;
    createFileExchange(): AbstractFileExchange;
    createAventra(reader_id?: string): AbstractAventra;
    createOberthur(reader_id?: string): AbstractOberthur73;
    createPKCS11Generic(): AbstractPkcs11Generic;
}
export declare class ModuleFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidGeneric(reader_id: string): AbstractEidGeneric;
    createEidGenericMeta(): AbstractEidGeneric;
    createEidDiplad(reader_id: string): AbstractEidDiplad;
    createPKCS11Generic(): AbstractPkcs11Generic;
    createEidBE(reader_id: string): AbstractEidBE;
    createAventra(reader_id: string): AbstractAventra;
    createOberthur(reader_id: string): AbstractOberthur73;
    createIdemia(reader_id: string): AbstractIdemia;
    createEmv(reader_id: string): AbstractEmv;
    createFileExchange(): AbstractFileExchange;
    createRemoteLoading(reader_id: string): AbstractRemoteLoading;
}
