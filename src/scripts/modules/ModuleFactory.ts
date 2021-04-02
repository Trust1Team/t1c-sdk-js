/**
 * @author Trust1Team
 * @since 2020
 */
import {LocalConnection} from "../core/client/Connection";
import { EidBe } from './smartcards/token/eid/be/EidBe';
import {AbstractEidBE} from "./smartcards/token/eid/be/EidBeModel";
import { Aventra } from './smartcards/token/pki/aventra4/Aventra';
import { AbstractAventra } from './smartcards/token/pki/aventra4/AventraModel';
import {AbstractOberthur73} from "./smartcards/token/pki/oberthur73/OberthurModel";
import {Oberthur} from "./smartcards/token/pki/oberthur73/Oberthur";
import {AbstractIdemia} from "./smartcards/token/pki/idemia82/IdemiaModel";
import {Idemia} from "./smartcards/token/pki/idemia82/Idemia";
import {AbstractEmv} from "./smartcards/payment/emv/EmvModel";
import {Emv} from "./smartcards/payment/emv/Emv";
import {AbstractFileExchange} from "./file/fileExchange/FileExchangeModel";
import {FileExchange} from "./file/fileExchange/FileExchange";
import {AbstractRemoteLoading} from "./hsm/remoteloading/RemoteLoadingModel";
import {RemoteLoading} from "./hsm/remoteloading/RemoteLoading";
import {AbstractEidGeneric} from "./smartcards/token/eid/generic/EidGenericModel";
import {EidGeneric} from "./smartcards/token/eid/generic/EidGeneric";
import {AbstractPkcs11Generic} from "./pkcs11/generic/Pkcs11GenericModel";
import {AbstractEidDiplad} from "./smartcards/token/eid/diplad/EidDipladModel";
import {EidDiplad} from "./smartcards/token/eid/diplad/EidDiplad";
import {Pkcs11Generic} from "./pkcs11/generic/Pkcs11Generic";
import {AbstractPaymentGeneric} from "./smartcards/payment/generic/PaymentGenericModel";
import {PaymentGeneric} from "./smartcards/payment/generic/PaymentGeneric";
import {AbstractEidLux, PinType} from "./smartcards/token/eid/lux/EidLuxModel";
import {EidLux} from "./smartcards/token/eid/lux/EidLux";
import {AbstractWacom} from "./wacom/WacomModel";
import {Wacom} from "./wacom/Wacom";
import {AbstractPkcs11} from "./pkcs11/pkcs11Object/Pkcs11Model";
import {PKCS11} from "./pkcs11/pkcs11Object/Pkcs11";
import {Crelan} from "./smartcards/payment/crelan/Crelan";
import {AbstractCrelan} from "./smartcards/payment/crelan/CrelanModel";
import {AbstractRawPrint} from "./print/rawprint/RawPrintModel";
import {RawPrint} from "./print/rawprint/RawPrint";
import {AbstractCertigna} from "./smartcards/token/pki/certigna/CertignaModel";
import {AbstractCertinomis} from "./smartcards/token/pki/certinomis/CertinomisModel";
import {Certinomis} from "./smartcards/token/pki/certinomis/Certinomis";
import {Certigna} from "./smartcards/token/pki/certigna/Certigna";

export interface AbstractFactory {
    createEidGeneric(reader_id: string): AbstractEidGeneric;
    createEidGenericMeta(): AbstractEidGeneric;
    createEidBE(reader_id: string): AbstractEidBE;
    createEidDiplad(reader_id: string): AbstractEidDiplad;
    createEidLUX(reader_id: string, pin: string, pinType: PinType): AbstractEidLux;
    createEmv(reader_id: string): AbstractEmv;
    createCrelan(reader_id: string): AbstractCrelan;
    createPaymentGeneric(reader_id?: string): AbstractPaymentGeneric;
    createPaymentGenericMeta(): AbstractPaymentGeneric;
    createFileExchange(): AbstractFileExchange;
    createWacom(): AbstractWacom;
    // createIsabel(reader_id?: string, runInUserSpace?: boolean): AbstractIsabel;
    // createLuxTrust(reader_id?: string): AbstractLuxTrust;
    // createMobib(reader_id?: string): AbstractMobib;
    // createOcra(reader_id?: string): AbstractOcra;
    createAventra(reader_id?: string): AbstractAventra;
    createOberthur(reader_id?: string): AbstractOberthur73;
    // createPIV(reader_id?: string): AbstractPiv;
    createPKCS11Generic(): AbstractPkcs11Generic;
    createPKCS11(modulePath: string): AbstractPkcs11;
    // createJavaKeyTool(): AbstractJavaKeyTool
    // createSsh(): AbstractSsh
    createRawPrint(): AbstractRawPrint
    createCertigna(reader_id?: string): AbstractCertigna
    createCertinomis(reader_id?: string): AbstractCertinomis
}

const CONTAINER_NEW_CONTEXT_PATH = '/modules/';
const CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
const CONTAINER_DIPLAD = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
const CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
const CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
const CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
const CONTAINER_CRELAN = CONTAINER_NEW_CONTEXT_PATH + 'crelan';
const CONTAINER_WACOM = CONTAINER_NEW_CONTEXT_PATH + 'wacom-stu';
const CONTAINER_ISABEL = CONTAINER_NEW_CONTEXT_PATH + 'isabel';
const CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'fileexchange';
const CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
const CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
const CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
const CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra_myid_4';
const CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur_73';
const CONTAINER_IDEMIA = CONTAINER_NEW_CONTEXT_PATH + 'idemia_cosmo_82';
const CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
const CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
const CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
const CONTAINER_PKCS11_Object = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11-objects';
const CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'remoteloading';
const CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
const CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
const CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';
const CONTAINER_CERTIGNA = CONTAINER_NEW_CONTEXT_PATH + 'certigna';
const CONTAINER_CERTINOMIS = CONTAINER_NEW_CONTEXT_PATH + 'certinomis';


export class ModuleFactory implements AbstractFactory {
    constructor(private url: string, private connection: LocalConnection) {}

    public createEidGeneric(reader_id: string, pin?: string, pinType?: PinType): AbstractEidGeneric {
        return new EidGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, reader_id, pin, pinType);
    }

    public createEidGenericMeta(): AbstractEidGeneric {
        return new EidGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, ""); //only used for meta service info (with no selectted reader)
    }

    public createPaymentGeneric(reader_id: string): AbstractPaymentGeneric {
        return new PaymentGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, reader_id);
    }

    public createPaymentGenericMeta(): AbstractPaymentGeneric {
        return new PaymentGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, ""); //only used for meta service info (with no selectted reader)
    }

    public createEidDiplad(reader_id: string): AbstractEidDiplad {
        return new EidDiplad(this.url, CONTAINER_DIPLAD, this.connection, reader_id);
    }

    public createPKCS11Generic(): AbstractPkcs11Generic {
        return new Pkcs11Generic(this.url, CONTAINER_PKCS11, this.connection);
    }

    public createEidBE(reader_id: string): AbstractEidBE {
        return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
    }

    public createAventra(reader_id: string): AbstractAventra {
        return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
    }

    public createOberthur(reader_id: string): AbstractOberthur73 {
        return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id);
    }

    public createIdemia(reader_id: string): AbstractIdemia {
        return new Idemia(this.url, CONTAINER_IDEMIA, this.connection, reader_id);
    }

    public createEmv(reader_id: string): AbstractEmv {
        return new Emv(this.url, CONTAINER_EMV, this.connection, reader_id);
    }

    public createCrelan(reader_id: string): AbstractCrelan {
        return new Crelan(this.url, CONTAINER_CRELAN, this.connection, reader_id);
    }

    public createFileExchange(): AbstractFileExchange {
        return new FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }

    public createRawPrint(): AbstractRawPrint {
        return new RawPrint(this.url, CONTAINER_RAW_PRINT, this.connection);
    }

    public createRemoteLoading(reader_id: string): AbstractRemoteLoading {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createEidLUX(reader_id: string, pin: string, pinType: PinType): AbstractEidLux {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType);
    }

    public createWacom(): AbstractWacom {
        return new Wacom(this.url, CONTAINER_WACOM, this.connection);
    }

    public createPKCS11(modulePath: string): AbstractPkcs11 {
        return new PKCS11(this.url, CONTAINER_PKCS11_Object, this.connection, modulePath);
    }

    public createCertigna(reader_id: string): AbstractCertigna {
        return new Certigna(this.url, CONTAINER_CERTIGNA, this.connection, reader_id);
    }

    public createCertinomis(reader_id: string): AbstractCertinomis {
        return new Certinomis(this.url, CONTAINER_CERTINOMIS, this.connection, reader_id);
    }


/*    public createDNIe(reader_id?: string): AbstractDNIe {
        return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id);
    }

    public createBeLawyer(reader_id?: string): AbstractBeLawyer {
        return new BeLawyer(this.url, CONTAINER_BELAWYER, this.connection, reader_id);
    }

    public createEidLUX(reader_id?: string, pin?: string, pinType?: PinType, isEncrypted: boolean = false): AbstractEidLUX {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType, isEncrypted);
    }

    public createEidPT(reader_id?: string): AbstractEidPT {
        return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id);
    }



    public createWacom(): AbstractWacom {
        return new Wacom(this.url, CONTAINER_WACOM, this.connection, 'wacom-stu');
    }

    public createIsabel(reader_id?: string, runInUserSpace?: boolean): AbstractIsabel {
        return new Isabel(this.url, CONTAINER_ISABEL, this.connection, reader_id, runInUserSpace);
    }

    public createLuxTrust(reader_id?: string): AbstractLuxTrust {
        return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id);
    }

    public createMobib(reader_id?: string): AbstractMobib {
        return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id);
    }

    public createOcra(reader_id?: string): AbstractOcra {
        return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id);
    }

    public createOberthurNO(reader_id?: string): AbstractOberthur {
        return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id);
    }

    public createPIV(reader_id?: string): AbstractPiv {
        return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id);
    }

    public createPKCS11(): AbstractPkcs11 {
        return new PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    }

    public createRemoteLoading(reader_id?: string): AbstractRemoteLoading {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createBelfius(reader_id?: string): AbstractBelfius {
        return new Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createFileExchange(): AbstractFileExchange {
        return new RemoteLoading(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }

    public createDataContainer(containerPath: string): () => AbstractDataContainer {
        return (): AbstractDataContainer => {
            return new DataContainer(this.url, containerPath, this.connection);
        };
    }

    public createJavaKeyTool(): AbstractJavaKeyTool {
        return new JavaKeyTool(this.url, CONTAINER_JAVA_KEY_TOOL, this.connection);
    }

    public createSsh(): AbstractSsh {
        return new Ssh(this.url, '', this.connection, 'ssh');
    }

    public createRawPrint(runInUserSpace: boolean): AbstractRawPrint {
        return new RawPrint(this.url, CONTAINER_RAW_PRINT, this.connection, runInUserSpace);
    }*/
}
