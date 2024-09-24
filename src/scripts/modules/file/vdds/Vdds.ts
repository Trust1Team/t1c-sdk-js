import {
    AbstractVdds,
    VddsExportRequest,
    VddsImportRequest,
    VddsResponse,
    VddsViewRequest,
} from "./VddsModel";
import {
    LocalConnection,
} from "../../../..";


export class Vdds implements AbstractVdds {
    static EXEC = '/cmd/exec';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
    ) {
    }
    import(body: VddsImportRequest): Promise<VddsResponse> {
        let request: any = {
            exec: body.exec,
            file: body.file
        }; 
        request.exec.cmd = "import";
        return this.connection.post(
            this.baseUrl,
            this.fileApp(Vdds.EXEC),
            request,
            undefined,
            undefined,
           undefined 
        );
    }
    export(body: VddsExportRequest): Promise<VddsResponse> {
        let request: any = {
            exec: body.exec,
            file: body.file
        }; 
        request.exec.cmd = "export";
        return this.connection.post(
            this.baseUrl,
            this.fileApp(Vdds.EXEC),
            body,
            undefined,
            undefined,
           undefined 
        );
    }
    view(body: VddsViewRequest): Promise<VddsResponse> {
        let request: any = {
            exec: body.exec,
            args: body.args
        }; 
        request.exec.cmd = "view";
        return this.connection.post(
            this.baseUrl,
            this.fileApp(Vdds.EXEC),
            body,
            undefined,
            undefined,
           undefined 
        );
    }

    protected fileApp(path?: string): string {
        let suffix = this.containerUrl;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

}
