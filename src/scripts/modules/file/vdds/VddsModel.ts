import {BoolDataResponse, DataResponse, T1CLibException, T1CResponse} from "../../../..";

export interface AbstractVdds {
    import(body: VddsImportRequest): Promise<VddsResponse>;
    export(body: VddsExportRequest): Promise<VddsResponse>;
    view(body: VddsViewRequest): Promise<VddsResponse>;
    exec(body: VddsGenericRequest): Promise<VddsResponse>;
}

/* Model */
export interface VddsImportRequest {
    exec: ExecDescriptor,
    file: FileDescriptor 
}


export interface VddsExportRequest {
    exec: ExecDescriptor,
    file: FileDescriptor 
}

export interface VddsViewRequest {
    exec: ExecDescriptor,
    args: Array<String> 
}

export interface VddsGenericRequest {
    exec: ExecGenericDescriptor,
    file?: FileDescriptor,
    args?: Array<String>,
}

export interface ExecDescriptor {
    entity: String,
    type: String,
    relPath?: Array<String>
}

export interface ExecGenericDescriptor {
    entity: String,
    type: String,
    relPath?: Array<String>
    cmd: String,
}

export interface FileDescriptor {
    entity: String,
    type: String,
    relPath?: Array<String>
    fileName: String
}

export class VddsResponse extends T1CResponse {
    constructor(public success: boolean){
        super(success, null);
    }
}