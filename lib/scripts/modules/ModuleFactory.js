"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EidBe_1 = require("./smartcards/eid/be/EidBe");
var Aventra_1 = require("./smartcards/pki/aventra4/Aventra");
var CONTAINER_NEW_CONTEXT_PATH = '/modules/';
var CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
var CONTAINER_BELAWYER = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
var CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
var CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
var CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
var CONTAINER_WACOM = CONTAINER_NEW_CONTEXT_PATH + 'wacom-stu';
var CONTAINER_ISABEL = CONTAINER_NEW_CONTEXT_PATH + 'isabel';
var CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'file-exchange';
var CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
var CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
var CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
var CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra4';
var CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur';
var CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
var CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
var CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
var CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'readerapi';
var CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
var CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
var CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';
var ModuleFactory = (function () {
    function ModuleFactory(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    ModuleFactory.prototype.createEidBE = function (reader_id) {
        return new EidBe_1.EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
    };
    ModuleFactory.prototype.createAventra4 = function (reader_id) {
        return new Aventra_1.Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
    };
    return ModuleFactory;
}());
exports.ModuleFactory = ModuleFactory;
//# sourceMappingURL=ModuleFactory.js.map