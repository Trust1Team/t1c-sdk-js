/**
 * @author Trust1Team
 * @since 2020
 */
import {LocalConnection} from '../core/client/Connection';
import {EidBe} from './smartcards/token/eid/be/EidBe';
import {AbstractEidBE} from './smartcards/token/eid/be/EidBeModel';
import {Aventra} from './smartcards/token/pki/aventra4/Aventra';
import {AbstractAventra} from './smartcards/token/pki/aventra4/AventraModel';
import {AbstractOberthur73} from './smartcards/token/pki/oberthur73/OberthurModel';
import {Oberthur} from './smartcards/token/pki/oberthur73/Oberthur';
import {AbstractIdemia} from './smartcards/token/pki/idemia82/IdemiaModel';
import {Idemia} from './smartcards/token/pki/idemia82/Idemia';
import {AbstractEmv} from './smartcards/payment/emv/EmvModel';
import {Emv} from './smartcards/payment/emv/Emv';
import {AbstractFileExchange} from './file/fileExchange/FileExchangeModel';
import {FileExchange} from './file/fileExchange/FileExchange';
import {AbstractRemoteLoading} from './hsm/remoteloading/RemoteLoadingModel';
import {RemoteLoading} from './hsm/remoteloading/RemoteLoading';
import {AbstractEidGeneric} from './smartcards/token/eid/generic/EidGenericModel';
import {EidGeneric} from './smartcards/token/eid/generic/EidGeneric';
import {AbstractEidDiplad} from './smartcards/token/eid/diplad/EidDipladModel';
import {EidDiplad} from './smartcards/token/eid/diplad/EidDiplad';
import {AbstractPaymentGeneric} from './smartcards/payment/generic/PaymentGenericModel';
import {PaymentGeneric} from './smartcards/payment/generic/PaymentGeneric';
import {AbstractEidLux, PinType} from './smartcards/token/eid/lux/EidLuxModel';
import {EidLux} from './smartcards/token/eid/lux/EidLux';
import {AbstractWacom} from './wacom/WacomModel';
import {Wacom} from './wacom/Wacom';
import {Crelan} from './smartcards/payment/crelan/Crelan';
import {AbstractCrelan} from './smartcards/payment/crelan/CrelanModel';
import {AbstractRawPrint} from './print/rawprint/RawPrintModel';
import {RawPrint} from './print/rawprint/RawPrint';
import {AbstractCertigna} from './smartcards/token/pki/certigna/CertignaModel';
import {AbstractCertinomis} from './smartcards/token/pki/certinomis/CertinomisModel';
import {Certigna} from './smartcards/token/pki/certigna/Certigna';
import {AbstractDNIe} from './smartcards/token/pki/dnie/DNIeModel';
import {DNIe} from './smartcards/token/pki/dnie/DNIe';
import {Certinomis} from './smartcards/token/pki/certinomis/Certinomis';
import {Safenet} from './smartcards/token/pki/safenet/Safenet';
import {AbstractSafenet} from './smartcards/token/pki/safenet/SafenetModel';
import {AbstractEherkenning} from './smartcards/token/pki/eHerkenning/eHerkenningModel';
import {EHerkenning} from './smartcards/token/pki/eHerkenning/eHerkenning';
import {AbstractJcop} from './smartcards/token/pki/jcop/JcopModel';
import {Jcop} from './smartcards/token/pki/jcop/Jcop';
import {AbstractAirbus} from './smartcards/token/pki/airbus/AirbusModel';
import {Airbus} from './smartcards/token/pki/airbus/Airbus';
import {AbstractLuxTrust} from './smartcards/token/eid/luxtrust/LuxTrustModel';
import {LuxTrust} from './smartcards/token/eid/luxtrust/LuxTrust';
import {AbstractCamerfirma} from './smartcards/token/pki/camerfirma/CamerfirmaModel';
import {AbstractChambersign} from './smartcards/token/pki/chambersign/ChambersignModel';
import {Camerfirma} from './smartcards/token/pki/camerfirma/Camerfirma';
import {Chambersign} from './smartcards/token/pki/chambersign/Chambersign';
import {Abstractx509} from './x509/x509Model';
import {X509} from './x509/x509';
import {AbstractTruststore} from './truststore/truststoreModel';
import {Truststore} from './truststore/truststore';
import { AbstractPkcs11 } from './smartcards/token/pki/pkcs11/Pkcs11Model';
import { Pkcs11 } from './smartcards/token/pki/pkcs11/pkcs11';
import { SimpleSign } from './simplesign/simpleSign';
import { AbstractSimpleSign } from './simplesign/simpleSignModel';
import { Vdds } from './file/vdds/Vdds';
import { AbstractVdds } from './file/vdds/VddsModel';

export interface AbstractFactory {
  createEidGeneric(reader_id: string): AbstractEidGeneric;
  createEidBE(reader_id: string): AbstractEidBE;
  createEidDiplad(reader_id: string): AbstractEidDiplad;
  createEidLUX(
    reader_id: string,
    pin: string,
    pinType: PinType
  ): AbstractEidLux;
  createEmv(reader_id: string): AbstractEmv;
  createCrelan(reader_id: string): AbstractCrelan;
  createPaymentGeneric(reader_id?: string): AbstractPaymentGeneric;
  createFileExchange(): AbstractFileExchange;
  createWacom(): AbstractWacom;
  createAventra(reader_id?: string): AbstractAventra;
  createOberthur(reader_id?: string): AbstractOberthur73;
  createRawPrint(): AbstractRawPrint;
  createCertigna(reader_id?: string): AbstractCertigna;
  createCertinomis(reader_id?: string): AbstractCertinomis;
  createDNIe(reader_id?: string): AbstractDNIe;
  createSafenet(reader_id?: string): AbstractSafenet;
  createEherkenning(reader_id?: string): AbstractEherkenning;
  createJcop(reader_id?: string): AbstractJcop;
  createAirbus(reader_id?: string): AbstractAirbus;
  createAirbus(reader_id?: string): AbstractAirbus;
}

const CONTAINER_NEW_CONTEXT_PATH = '/modules/';
const CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
const CONTAINER_DIPLAD = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
const CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
const CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
const CONTAINER_SAFENET = CONTAINER_NEW_CONTEXT_PATH + 'safenet';
const CONTAINER_EHERKENNING = CONTAINER_NEW_CONTEXT_PATH + 'eherkenning';
const CONTAINER_JCOP = CONTAINER_NEW_CONTEXT_PATH + 'jcop3';
const CONTAINER_AIRBUS = CONTAINER_NEW_CONTEXT_PATH + 'airbus';
const CONTAINER_CAMERFIRMA = CONTAINER_NEW_CONTEXT_PATH + 'camerfirma';
const CONTAINER_CHAMBERSIGN = CONTAINER_NEW_CONTEXT_PATH + 'chambersign';
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
const CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'remoteloading';
const CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
const CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
const CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';
const CONTAINER_CERTIGNA = CONTAINER_NEW_CONTEXT_PATH + 'certigna';
const CONTAINER_CERTINOMIS = CONTAINER_NEW_CONTEXT_PATH + 'certinomis';
const CONTAINER_X509 = CONTAINER_NEW_CONTEXT_PATH + 'x509';
const CONTAINER_TRUSTSTORE = CONTAINER_NEW_CONTEXT_PATH + 'truststore';
const CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
const CONTAINER_SIMPLESIGN= CONTAINER_NEW_CONTEXT_PATH + 'simplesign';
const CONTAINER_VDDS= CONTAINER_NEW_CONTEXT_PATH + 'vdds';

export class ModuleFactory implements AbstractFactory {
  constructor(
    private url: string,
    private connection: LocalConnection
  ) {}

  public createEidGeneric(
    reader_id: string,
    pin?: string,
    pinType?: PinType
  ): AbstractEidGeneric {
    return new EidGeneric(
      this.url,
      CONTAINER_NEW_CONTEXT_PATH,
      this.connection,
      reader_id,
      pin,
      pinType
    );
  }

  public createPaymentGeneric(reader_id: string): AbstractPaymentGeneric {
    return new PaymentGeneric(
      this.url,
      CONTAINER_NEW_CONTEXT_PATH,
      this.connection,
      reader_id
    );
  }

  public createEidDiplad(reader_id: string): AbstractEidDiplad {
    return new EidDiplad(
      this.url,
      CONTAINER_DIPLAD,
      this.connection,
      reader_id
    );
  }

  public createEidBE(reader_id: string): AbstractEidBE {
    return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
  }

  public createAventra(reader_id: string): AbstractAventra {
    return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
  }

  public createOberthur(reader_id: string): AbstractOberthur73 {
    return new Oberthur(
      this.url,
      CONTAINER_OBERTHUR,
      this.connection,
      reader_id
    );
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
    return new RemoteLoading(
      this.url,
      CONTAINER_REMOTE_LOADING,
      this.connection,
      reader_id
    );
  }

  public createEidLUX(
    reader_id: string,
    pin: string,
    pinType: PinType
  ): AbstractEidLux {
    return new EidLux(
      this.url,
      CONTAINER_LUXEID,
      this.connection,
      reader_id,
      pin,
      pinType
    );
  }

  public createWacom(): AbstractWacom {
    return new Wacom(this.url, CONTAINER_WACOM, this.connection);
  }

  public createCertigna(reader_id: string): AbstractCertigna {
    return new Certigna(
      this.url,
      CONTAINER_CERTIGNA,
      this.connection,
      reader_id
    );
  }

  public createCertinomis(reader_id: string): AbstractCertinomis {
    return new Certinomis(
      this.url,
      CONTAINER_CERTINOMIS,
      this.connection,
      reader_id
    );
  }

  public createDNIe(reader_id: string): AbstractDNIe {
    return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id);
  }

  public createSafenet(reader_id: string): AbstractSafenet {
    return new Safenet(this.url, CONTAINER_SAFENET, this.connection, reader_id);
  }

  public createEherkenning(reader_id: string): AbstractEherkenning {
    return new EHerkenning(
      this.url,
      CONTAINER_EHERKENNING,
      this.connection,
      reader_id
    );
  }

  public createJcop(reader_id: string): AbstractJcop {
    return new Jcop(this.url, CONTAINER_JCOP, this.connection, reader_id);
  }

  public createAirbus(reader_id: string): AbstractAirbus {
    return new Airbus(this.url, CONTAINER_AIRBUS, this.connection, reader_id);
  }

  public createLuxTrust(reader_id: string): AbstractLuxTrust {
    return new LuxTrust(
      this.url,
      CONTAINER_LUXTRUST,
      this.connection,
      reader_id
    );
  }

  public createCamerfirma(reader_id: string): AbstractCamerfirma {
    return new Camerfirma(
      this.url,
      CONTAINER_CAMERFIRMA,
      this.connection,
      reader_id
    );
  }

  public createChambersign(reader_id: string): AbstractChambersign {
    return new Chambersign(
      this.url,
      CONTAINER_CHAMBERSIGN,
      this.connection,
      reader_id
    );
  }

  public createx509(): Abstractx509 {
    return new X509(this.url, CONTAINER_X509, this.connection);
  }

  public createTruststore(): AbstractTruststore {
    return new Truststore(this.url, CONTAINER_TRUSTSTORE, this.connection);
  }

  public createPkcs11(reader_id: string): AbstractPkcs11{
    return new Pkcs11(this.url, CONTAINER_PKCS11, this.connection, reader_id);
  }

  public createSimpleSign(): AbstractSimpleSign{
    return new SimpleSign(this.url, CONTAINER_SIMPLESIGN, this.connection);
  }

  public createVdds(): AbstractVdds {
    return new Vdds(this.url, CONTAINER_VDDS, this.connection);
  }
}
