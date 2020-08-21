import {AbstractWacom, WacomGetDevicesResponse, WacomSignDataRequest, WacomSignDataResponse, WacomSystemInfoResponse} from './WacomModel';
import {LocalConnection} from '../../..';

export class Wacom implements AbstractWacom {
    static CONTAINER_PREFIX = 'wacom-stu';
    static GET = '/get-key';
    static DEVICES = '/devices';
    static SIGN = '/sign';
    static SYSTEM_INFO = '/system-info';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection) {
    }

    getDevices(callback?: () => void): Promise<WacomGetDevicesResponse> {
        return this.connection.get(this.baseUrl, this.wacomApp(Wacom.DEVICES), undefined, undefined, callback);
    }

    signData(body: WacomSignDataRequest, callback?: () => void): Promise<WacomSignDataResponse> {
        return this.connection.post(this.baseUrl, this.wacomApp(Wacom.SIGN), body, undefined, undefined, callback);
    }

    systemInfo(callback?: () => void): Promise<WacomSystemInfoResponse> {
        return this.connection.get(this.baseUrl, this.wacomApp(Wacom.SYSTEM_INFO), undefined, undefined, callback);
    }

    protected wacomApp(path?: string): string {
        let suffix = this.containerUrl;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }
}
