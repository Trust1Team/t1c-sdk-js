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
var AddressResponse = (function (_super) {
    __extends(AddressResponse, _super);
    function AddressResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AddressResponse;
}(CoreModel_1.DataObjectResponse));
exports.AddressResponse = AddressResponse;
var PictureResponse = (function (_super) {
    __extends(PictureResponse, _super);
    function PictureResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PictureResponse;
}(CoreModel_1.DataObjectResponse));
exports.PictureResponse = PictureResponse;
var VerifyPinResponse = (function (_super) {
    __extends(VerifyPinResponse, _super);
    function VerifyPinResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return VerifyPinResponse;
}(CoreModel_1.DataObjectResponse));
exports.VerifyPinResponse = VerifyPinResponse;
var VerifyPinResponseData = (function () {
    function VerifyPinResponseData(verified) {
        this.verified = verified;
    }
    return VerifyPinResponseData;
}());
exports.VerifyPinResponseData = VerifyPinResponseData;
var SignResponse = (function (_super) {
    __extends(SignResponse, _super);
    function SignResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return SignResponse;
}(CoreModel_1.DataObjectResponse));
exports.SignResponse = SignResponse;
var SignResponseData = (function () {
    function SignResponseData(data) {
        this.data = data;
    }
    return SignResponseData;
}());
exports.SignResponseData = SignResponseData;
var AuthenticateResponse = (function (_super) {
    __extends(AuthenticateResponse, _super);
    function AuthenticateResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AuthenticateResponse;
}(CoreModel_1.DataObjectResponse));
exports.AuthenticateResponse = AuthenticateResponse;
var AuthenticateResponseData = (function () {
    function AuthenticateResponseData(data) {
        this.data = data;
    }
    return AuthenticateResponseData;
}());
exports.AuthenticateResponseData = AuthenticateResponseData;
var AddressData = (function () {
    function AddressData(municipality, rawData, signature, streetAndNumber, version, zipcode) {
        this.municipality = municipality;
        this.rawData = rawData;
        this.signature = signature;
        this.streetAndNumber = streetAndNumber;
        this.version = version;
        this.zipcode = zipcode;
    }
    return AddressData;
}());
exports.AddressData = AddressData;
var AllCertsResponse = (function (_super) {
    __extends(AllCertsResponse, _super);
    function AllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.AllCertsResponse = AllCertsResponse;
var AllCerts = (function () {
    function AllCerts(authenticationCertificate, citizenCertificate, nonRepudiationCertificate, rootCertificate, encryptionCertificate) {
        this.authenticationCertificate = authenticationCertificate;
        this.citizenCertificate = citizenCertificate;
        this.nonRepudiationCertificate = nonRepudiationCertificate;
        this.rootCertificate = rootCertificate;
        this.encryptionCertificate = encryptionCertificate;
    }
    return AllCerts;
}());
exports.AllCerts = AllCerts;
var AllDataResponse = (function (_super) {
    __extends(AllDataResponse, _super);
    function AllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.AllDataResponse = AllDataResponse;
var AllData = (function () {
    function AllData(picture, biometric, address) {
        this.picture = picture;
        this.biometric = biometric;
        this.address = address;
    }
    return AllData;
}());
exports.AllData = AllData;
var PictureData = (function () {
    function PictureData(picture, signature, width, height) {
        this.picture = picture;
        this.signature = signature;
        this.width = width;
        this.height = height;
    }
    return PictureData;
}());
exports.PictureData = PictureData;
var TokenData = (function () {
    function TokenData(rawData, version, serialNumber, label, prnGeneration, eidCompliant, graphicalPersoVersion, versionRfu, electricalPersoVersion, electricalPersoInterfaceVersion, changeCounter, activated) {
        this.rawData = rawData;
        this.version = version;
        this.serialNumber = serialNumber;
        this.label = label;
        this.prnGeneration = prnGeneration;
        this.eidCompliant = eidCompliant;
        this.graphicalPersoVersion = graphicalPersoVersion;
        this.versionRfu = versionRfu;
        this.electricalPersoVersion = electricalPersoVersion;
        this.electricalPersoInterfaceVersion = electricalPersoInterfaceVersion;
        this.changeCounter = changeCounter;
        this.activated = activated;
    }
    return TokenData;
}());
exports.TokenData = TokenData;
var TokenDataResponse = (function (_super) {
    __extends(TokenDataResponse, _super);
    function TokenDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TokenDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.TokenDataResponse = TokenDataResponse;
var BiometricData = (function () {
    function BiometricData(birthDate, birthLocation, cardDeliveryMunicipality, cardNumber, cardValidityDateBegin, cardValidityDateEnd, chipNumber, documentType, firstNames, name, nationalNumber, nationality, nobleCondition, pictureHash, rawData, sex, signature, specialStatus, thirdName, version) {
        this.birthDate = birthDate;
        this.birthLocation = birthLocation;
        this.cardDeliveryMunicipality = cardDeliveryMunicipality;
        this.cardNumber = cardNumber;
        this.cardValidityDateBegin = cardValidityDateBegin;
        this.cardValidityDateEnd = cardValidityDateEnd;
        this.chipNumber = chipNumber;
        this.documentType = documentType;
        this.firstNames = firstNames;
        this.name = name;
        this.nationalNumber = nationalNumber;
        this.nationality = nationality;
        this.nobleCondition = nobleCondition;
        this.pictureHash = pictureHash;
        this.rawData = rawData;
        this.sex = sex;
        this.signature = signature;
        this.specialStatus = specialStatus;
        this.thirdName = thirdName;
        this.version = version;
    }
    return BiometricData;
}());
exports.BiometricData = BiometricData;
var BiometricDataResponse = (function (_super) {
    __extends(BiometricDataResponse, _super);
    function BiometricDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BiometricDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.BiometricDataResponse = BiometricDataResponse;
//# sourceMappingURL=EidBeModel.js.map