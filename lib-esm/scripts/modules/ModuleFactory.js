import { EidBe } from './smartcards/eid/be/EidBe';
import { Aventra } from './smartcards/pki/aventra4/Aventra';
import { Oberthur } from "./smartcards/pki/oberthur73/Oberthur";
import { Idemia } from "./smartcards/pki/idemia82/Idemia";
import { Emv } from "./payment/emv/Emv";
import { FileExchange } from "./file/fileExchange/FileExchange";
import { RemoteLoading } from "./hsm/remoteloading/RemoteLoading";
import { EidGeneric } from "./smartcards/eid/generic/EidGeneric";
import { EidDiplad } from "./smartcards/eid/diplad/EidDiplad";
import { Pkcs11Generic } from "./pkcs11/generic/Pkcs11Generic";
var CONTAINER_NEW_CONTEXT_PATH = '/modules/';
var CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
var CONTAINER_DIPLAD = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
var CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
var CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
var CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
var CONTAINER_WACOM = CONTAINER_NEW_CONTEXT_PATH + 'wacom-stu';
var CONTAINER_ISABEL = CONTAINER_NEW_CONTEXT_PATH + 'isabel';
var CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'fileexchange';
var CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
var CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
var CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
var CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra4';
var CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur_73';
var CONTAINER_IDEMIA = CONTAINER_NEW_CONTEXT_PATH + 'idemia_cosmo_82';
var CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
var CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
var CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
var CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'remoteloading';
var CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
var CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
var CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';
var ModuleFactory = (function () {
    function ModuleFactory(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    ModuleFactory.prototype.createEidGeneric = function (reader_id) {
        return new EidGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, reader_id);
    };
    ModuleFactory.prototype.createEidGenericMeta = function () {
        return new EidGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, "");
    };
    ModuleFactory.prototype.createEidDiplad = function (reader_id) {
        return new EidDiplad(this.url, CONTAINER_DIPLAD, this.connection, reader_id);
    };
    ModuleFactory.prototype.createPKCS11Generic = function () {
        return new Pkcs11Generic(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection);
    };
    ModuleFactory.prototype.createEidBE = function (reader_id) {
        return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
    };
    ModuleFactory.prototype.createAventra = function (reader_id) {
        return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
    };
    ModuleFactory.prototype.createOberthur = function (reader_id) {
        return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id);
    };
    ModuleFactory.prototype.createIdemia = function (reader_id) {
        return new Idemia(this.url, CONTAINER_IDEMIA, this.connection, reader_id);
    };
    ModuleFactory.prototype.createEmv = function (reader_id) {
        return new Emv(this.url, CONTAINER_EMV, this.connection, reader_id);
    };
    ModuleFactory.prototype.createFileExchange = function () {
        return new FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    };
    ModuleFactory.prototype.createRemoteLoading = function (reader_id) {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    };
    return ModuleFactory;
}());
export { ModuleFactory };
//# sourceMappingURL=ModuleFactory.js.map