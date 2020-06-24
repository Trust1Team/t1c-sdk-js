"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CoreModel_1 = require("../../../../core/service/CoreModel");
var BeidAddressResponse = (function (_super) {
    __extends(BeidAddressResponse, _super);
    function BeidAddressResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeidAddressResponse;
}(CoreModel_1.DataObjectResponse));
exports.BeidAddressResponse = BeidAddressResponse;
var BeidAddress = (function () {
    function BeidAddress(municipality, raw_data, signature, street_and_number, version, zipcode) {
        this.municipality = municipality;
        this.raw_data = raw_data;
        this.signature = signature;
        this.street_and_number = street_and_number;
        this.version = version;
        this.zipcode = zipcode;
    }
    return BeidAddress;
}());
exports.BeidAddress = BeidAddress;
var BeidAllCertsResponse = (function (_super) {
    __extends(BeidAllCertsResponse, _super);
    function BeidAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeidAllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.BeidAllCertsResponse = BeidAllCertsResponse;
var BeidAllCerts = (function () {
    function BeidAllCerts(authentication_certificate, citizen_certificate, non_repudiation_certificate, root_certificate, rrn_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.citizen_certificate = citizen_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificate = root_certificate;
        this.rrn_certificate = rrn_certificate;
    }
    return BeidAllCerts;
}());
exports.BeidAllCerts = BeidAllCerts;
var BeidAllDataResponse = (function (_super) {
    __extends(BeidAllDataResponse, _super);
    function BeidAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeidAllDataResponse;
}(BeidAllCertsResponse));
exports.BeidAllDataResponse = BeidAllDataResponse;
var BeidAllData = (function () {
    function BeidAllData(address, authentication_certificate, citizen_certificate, non_repudiation_certificate, picture, rn, root_certificate, rrn_certificate, token_data) {
        this.address = address;
        this.authentication_certificate = authentication_certificate;
        this.citizen_certificate = citizen_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.picture = picture;
        this.rn = rn;
        this.root_certificate = root_certificate;
        this.rrn_certificate = rrn_certificate;
        this.token_data = token_data;
    }
    return BeidAllData;
}());
exports.BeidAllData = BeidAllData;
var BeidTokenData = (function () {
    function BeidTokenData(eid_compliant, electrical_perso_interface_version, electrical_perso_version, graphical_perso_version, label, prn_generation, raw_data, serial_number, version, version_rfu) {
        this.eid_compliant = eid_compliant;
        this.electrical_perso_interface_version = electrical_perso_interface_version;
        this.electrical_perso_version = electrical_perso_version;
        this.graphical_perso_version = graphical_perso_version;
        this.label = label;
        this.prn_generation = prn_generation;
        this.raw_data = raw_data;
        this.serial_number = serial_number;
        this.version = version;
        this.version_rfu = version_rfu;
    }
    return BeidTokenData;
}());
exports.BeidTokenData = BeidTokenData;
var BeidTokenDataResponse = (function (_super) {
    __extends(BeidTokenDataResponse, _super);
    function BeidTokenDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeidTokenDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.BeidTokenDataResponse = BeidTokenDataResponse;
var BeidRnData = (function () {
    function BeidRnData(birth_date, birth_location, card_delivery_municipality, card_number, card_validity_date_begin, card_validity_date_end, chip_number, document_type, first_names, name, national_number, nationality, noble_condition, picture_hash, raw_data, sex, signature, special_status, third_name, version) {
        this.birth_date = birth_date;
        this.birth_location = birth_location;
        this.card_delivery_municipality = card_delivery_municipality;
        this.card_number = card_number;
        this.card_validity_date_begin = card_validity_date_begin;
        this.card_validity_date_end = card_validity_date_end;
        this.chip_number = chip_number;
        this.document_type = document_type;
        this.first_names = first_names;
        this.name = name;
        this.national_number = national_number;
        this.nationality = nationality;
        this.noble_condition = noble_condition;
        this.picture_hash = picture_hash;
        this.raw_data = raw_data;
        this.sex = sex;
        this.signature = signature;
        this.special_status = special_status;
        this.third_name = third_name;
        this.version = version;
    }
    return BeidRnData;
}());
exports.BeidRnData = BeidRnData;
var BeidRnDataResponse = (function (_super) {
    __extends(BeidRnDataResponse, _super);
    function BeidRnDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeidRnDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.BeidRnDataResponse = BeidRnDataResponse;
//# sourceMappingURL=EidBeModel.js.map