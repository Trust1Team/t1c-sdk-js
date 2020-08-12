import {
    AbstractPkcs11Generic, AliasesResponse, OsResponse,
    Pkcs11CertificatesResponse,
    Pkcs11ClearConfigResponse,
    Pkcs11Config,
    Pkcs11GetConfigResponse,
    Pkcs11InfoResponse,
    Pkcs11SignRequest,
    Pkcs11SlotInfoResponse,
    Pkcs11SlotsResponse,
    Pkcs11TokenResponse,
    Pkcs11UploadConfigResponse,
    Pkcs11VerifyPinRequest, PrivateKeyTypeResponse
} from "./Pkcs11GenericModel";
import {BoolDataResponse, DataResponse, LocalConnection, T1CLibException} from "../../../..";

export class Pkcs11Generic implements AbstractPkcs11Generic {
    static PATH_SLOT_ID = '/slots/';
    static PATH_SLOT_ALIAS = '/aliases/';
    static ALL_CERTIFICATES = '/certificates';
    static OS = '/os';
    static INFO = '/info';
    static SIGN = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static SLOTS = '/slots';
    static TOKEN_INFO = '/token';
    static SLOT_INFO = '';
    static ALIASES = '/aliases';
    static PRIVATE_KEY_TYPE = '/type';
    static UPLOAD_CONFIG = '/config';
    static GET_CONFIG = '/config';
    static CLEAR_CONFIG = '/config/clear';


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {
    }

    os(callback?: (error: T1CLibException, data: OsResponse) => void): Promise<OsResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.OS),
            undefined,
            undefined,
            callback
        );
    }
    slotInfo(slotId: number, callback?: (error: T1CLibException, data: Pkcs11SlotInfoResponse) => void): Promise<Pkcs11SlotInfoResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.SLOT_INFO, slotId),
            undefined,
            undefined,
            callback
        );
    }
    getAliases(slotId: number, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: AliasesResponse) => void): Promise<AliasesResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.ALIASES, slotId),
            data,
            undefined,
            undefined,
            callback
        );
    }
    getPrivateKeyType(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: PrivateKeyTypeResponse) => void): Promise<PrivateKeyTypeResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.PRIVATE_KEY_TYPE, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }
    verifyPin(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<import("../../../..").BoolDataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.VERIFY_PIN, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }

    getCertificates(slotId: number, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.ALL_CERTIFICATES, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }

    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.INFO),
            undefined,
            undefined,
            callback
        );
    }

    sign(slotId: number, alias: string, data: Pkcs11SignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.SIGN, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }

    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.SLOTS),
            undefined,
            undefined,
            callback
        );
    }

    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.SLOTS),
            {
                "tokenPresent": true
            },
            undefined,
            callback
        );
    }

    token(slotId: number, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.TOKEN_INFO, slotId),
            undefined,
            undefined,
            callback
        );
    }



    clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.CLEAR_CONFIG),
            undefined,
            undefined,
            callback
        );
    }

    getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.GET_CONFIG),
            undefined,
            undefined,
            callback
        );
    }

    uploadConfig(config: string, callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse> {
        return this.connection.put(
            this.baseUrl,
            this.genericPkcs11Path(Pkcs11Generic.UPLOAD_CONFIG),
            new Pkcs11Config(config),
            undefined,
            undefined,
            callback
        );
    }

    protected genericPkcs11Path(path?: string, slotNumber?: number, alias?: string): string {
        let suffix = this.containerUrl;
        if (slotNumber != null || slotNumber != undefined) {
            suffix += Pkcs11Generic.PATH_SLOT_ID + slotNumber.toString();
        }
        if(alias) {
            suffix += Pkcs11Generic.PATH_SLOT_ALIAS + alias;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
