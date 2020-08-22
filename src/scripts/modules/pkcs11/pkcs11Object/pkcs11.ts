import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {DataResponse} from '../../../core/service/CoreModel';
import {LocalConnection} from '../../../core/client/Connection';
import {RequestHandler} from '../../../util/RequestHandler';
import {
    AbstractPkcs11, Pkcs11CertificatesResponse, Pkcs11InfoResponse,
    Pkcs11SignData, Pkcs11SlotsResponse, Pkcs11TokenResponse, Pkcs11VerifySignedData
} from './pkcs11Model';

export class PKCS11 implements AbstractPkcs11 {

    static CONTAINER_NEW_CONTEXT_PATH = '/containers/';
    static PATH_SLOT_ID = '/slots/';

    static ALL_CERTIFICATES = '/certificates';
    static INFO = '/info';
    static SIGN = '/sign';
    static SLOTS = '/slots';
    static TOKEN = '/token';
    // static DEFAULT_CONFIG = {
    //     linux: '/usr/local/lib/libeTPkcs11.so',
    //     mac: '/Library/cv cryptovision/libcvP11.dylib',
    //     win: 'C:\\Windows\\System32\\eTPKCS11.dll'
    // };

    private modulePath;
    private os;


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {
        // // determine os
        // if (platform.os.family) {
        //     if (platform.os.family.indexOf('Win') > -1) {
        //         this.os = 'win';
        //     }
        //     if (platform.os.family.indexOf('OS X') > -1) {
        //         this.os = 'mac';
        //     }
        //     // assume we are dealing with linux ==> will not always be correct!
        //     if (!this.os) {
        //         this.os = 'linux';
        //     }
        // }
        // // default if unknown or not provided
        // else {
        //     this.os = 'win';
        // }
        //
        //
        // const moduleConfig = connection.cfg.pkcs11Config;
        // if (moduleConfig && moduleConfig[this.os]) {
        //     this.modulePath = moduleConfig[this.os];
        // }
    }

    public certificates(slotId: string,
                        options?: any,
                        callback?: (error: T1CLibException, data: Pkcs11CertificatesResponse)
                            => void): Promise<Pkcs11CertificatesResponse> {
        let req = Object.assign({slot_id: slotId}, {module: this.modulePath});
        const reqOptions = RequestHandler.determineOptions(options, callback);
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.ALL_CERTIFICATES), req, undefined)
    }

    public info(callback?: (error: T1CLibException, data: Pkcs11InfoResponse) => void): Promise<Pkcs11InfoResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.INFO), req, undefined)
    }

    public signData(signData: Pkcs11SignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        let req = {
            module: this.modulePath,
            id: signData.cert_id,
            slot_id: signData.slot_id,
            pin: signData.pin,
            data: signData.data,
            digest: signData.algorithm_reference,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.SIGN), req, undefined)
    }

    public slots(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.SLOTS), req, undefined)
    }

    public slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11SlotsResponse) => void): Promise<Pkcs11SlotsResponse> {
        let req = {module: this.modulePath};
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.SLOTS), req, {'token-present': 'true'})
    }

    public token(slotId: string, callback: (error: T1CLibException, data: Pkcs11TokenResponse) => void): Promise<Pkcs11TokenResponse> {
        let req = Object.assign({slot_id: slotId}, {module: this.modulePath});
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.TOKEN), req, undefined)
    }


    protected pkcs11Path(path?: string, slotNumber?: number): string {
        let suffix = this.containerUrl;
        if (slotNumber != null || slotNumber != undefined) {
            suffix += PKCS11.PATH_SLOT_ID + slotNumber.toString();
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

}

