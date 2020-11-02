import {
    PrintResponse,
    PrinterListResponse, AbstractRawPrint
} from "./RawPrintModel";
import {
    LocalConnection,
    T1CLibException
} from "../../../..";

export class RawPrint implements AbstractRawPrint {
    static PATHPRINTAPP = '/apps/print';

    static LIST = '/printer-list';
    static PRINT = '/print';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
    ) {
    }

    list(callback?: (error: T1CLibException, data: PrinterListResponse) => void): Promise<PrinterListResponse> {
        return this.connection.get(
            this.baseUrl,
            this.printApp(RawPrint.LIST),
            undefined,
            undefined,
            callback
        );
    }

    print(name: string, job: string, data: string, callback?: (error: T1CLibException, data: PrintResponse) => void): Promise<PrintResponse> {
        let body = {name, job, data};
        return this.connection.post(
            this.baseUrl,
            this.printApp(RawPrint.PRINT),
            body,
            undefined,
            undefined,
            callback
        );
    }



    // resolves the readerid in the base URL
    protected printApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += RawPrint.PATHPRINTAPP;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

}
