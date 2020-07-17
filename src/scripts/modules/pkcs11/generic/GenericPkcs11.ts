import {
    AbstractGenericPkcs11,
    Pkcs11CertificatesResponse, Pkcs11ClearConfigResponse, Pkcs11GetConfigResponse,
    Pkcs11InfoResponse,
    Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse, Pkcs11UploadConfigResponse, Pkcs11VerifyPinRequest
} from "./GenericPkcs11Model";
import {DataResponse, LocalConnection, T1CLibException} from "../../../..";

export class GenericPkcs11 implements AbstractGenericPkcs11 {

    static PATH_SLOT_ID = '/slots/';
    static PATH_SLOT_ALIAS = '/aliases/';

    static ALL_CERTIFICATES = '/certificates';
    static INFO = '/info';
    static SIGN = '/sign';
    static SLOTS = '/slots';
    static TOKEN = '/token';
    static UPLOAD_CONFIG = '/config';
    static GET_CONFIG = '/config';
    static CLEAR_CONFIG = '/config/clear';


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {
    }

    certificates(slotId: string, alias: string, data: Pkcs11VerifyPinRequest, callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse) => void): Promise<Pkcs11CertificatesResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.ALL_CERTIFICATES, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }

    info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.INFO),
            undefined,
            undefined,
            callback
        );
    }

    signData(slotId: string, alias: string, data: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.SIGN, slotId, alias),
            data,
            undefined,
            undefined,
            callback
        );
    }

    slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.SLOTS),
            undefined,
            undefined,
            callback
        );
    }

    slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.SLOTS),
            {
                "tokenPresent": true
            },
            undefined,
            callback
        );
    }

    token(slotId: string, callback?: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse> {
        return this.connection.get(
            this.baseUrl,
            this.genericPkcs11Path(GenericPkcs11.TOKEN, slotId),
            undefined,
            undefined,
            callback
        );
    }

    // clearConfig(callback?: (error: T1CLibException, data: Pkcs11ClearConfigResponse) => void): Promise<Pkcs11ClearConfigResponse> {
    //     return this.connection.get(
    //         this.baseUrl,
    //         this.genericPkcs11Path(GenericPkcs11.CLEAR_CONFIG),
    //         undefined,
    //         undefined,
    //         callback
    //     );
    // }
    //
    // getConfig(callback?: (error: T1CLibException, data: Pkcs11GetConfigResponse) => void): Promise<Pkcs11GetConfigResponse> {
    //     return this.connection.get(
    //         this.baseUrl,
    //         this.genericPkcs11Path(GenericPkcs11.GET_CONFIG),
    //         undefined,
    //         undefined,
    //         callback
    //     );
    // }
    //
    // uploadConfig(callback?: (error: T1CLibException, data: Pkcs11UploadConfigResponse) => void): Promise<Pkcs11UploadConfigResponse> {
    //     return this.connection.post(
    //         this.baseUrl,
    //         this.genericPkcs11Path(GenericPkcs11.UPLOAD_CONFIG),
    //         undefined,
    //         undefined,
    //         callback
    //     );
    // }

    protected genericPkcs11Path(path?: string, slotNumber?: string, alias?: string): string {
        let suffix = this.containerUrl;
        if (slotNumber) {
            suffix += GenericPkcs11.PATH_SLOT_ID + slotNumber;
        }
        if(alias) {
            suffix += GenericPkcs11.PATH_SLOT_ALIAS + alias;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
