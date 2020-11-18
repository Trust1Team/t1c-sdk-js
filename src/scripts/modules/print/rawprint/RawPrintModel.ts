import {T1CLibException, T1CResponse} from "../../../..";

export interface AbstractRawPrint {
    list( callback?: (error: T1CLibException, data: PrinterListResponse) => void): Promise<PrinterListResponse>;
    print(name: string, job: string, data: string, callback?: (error: T1CLibException, data: PrintResponse) => void): Promise<PrintResponse>;
}

/* Model */

export class PrinterList {
    constructor(public printers: Array<string>) {}
}

export class PrinterListResponse extends T1CResponse {
    constructor(public data: PrinterList, public success: boolean) {
        super(success, data);
    }
}

export class Print {
    constructor(public printed: boolean) {}
}

export class PrintResponse extends T1CResponse {
    constructor(public data: Print, public success: boolean) {
        super(success, data);
    }
}
