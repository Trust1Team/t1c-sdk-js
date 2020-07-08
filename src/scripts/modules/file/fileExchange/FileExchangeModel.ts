import {BoolDataResponse, DataResponse, T1CLibException, T1CResponse} from "../../../..";

export interface AbstractFileExchange {
    download(entity: string, type: string, file: ArrayBuffer, fileName: string, relPath?: [string], implicitCreationType?: boolean, notifyOnCompletion?: boolean, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<DataResponse>;
    upload(entity: string, type: string, fileName: string, relPath?: [string], notifyOnCompletion?: boolean, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<ArrayBuffer>;
    listTypes(entity?: string, page?: Page, callback?: (error: T1CLibException, data: TypeListResponse) => void): Promise<TypeListResponse>;
    listType(entity: string, type: string, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse>;
    listTypeContent(entity: string, type: string, relPath?: [string], page?: Page, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse>;
    listContent(entity: string, page?: Page, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse>;
    existsType(entity: string, type: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    existsFile(entity: string, type: string, relPath: [string], callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getAccessMode(entity: string, type: string, fileName: string, relPath?: [string], callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    createDir(entity: string, type: string, relPath: [string], recursive?: boolean, callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse>;
    copyFile(entity: string, fromType: string, toType: string, fileName: string, newfileName: string, fromrelPath?: [string], toRelPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse>;
    moveFile(entity: string, fromType: string, toType: string, fileName: string, fromrelPath?: [string], toRelPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse>;
    renameFile(entity: string, type: string, fileName: string, newfileName: string, relPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse>;
    getFileInfo(entity: string, type: string, fileName: string, relPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse>;
    createType(entity: string, type: string, initPath: [string], modal?: boolean, timeout?: number, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse>;
    createTypeDirs(entity: string, type: string, relPath: [string], modal?: boolean, timeout?: number, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse>;
    updateType(entity: string, type: string, timeout?: number, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse>;
    deleteType(entity: string, type: string, callback?: (error: T1CLibException, data: boolean) => void): Promise<boolean>;
}

/* Model */
export class ListFilesRequest {
    constructor(public path: string, public extensions: string[]) {}
}

export class File {
    constructor(public extension: string,
                public name: string,
                public path: string,
                public size: number,
                public type: string,
                public entity: string,
                public last_modification_time: string,
                public is_dir: boolean,
                public access_mode: AccessMode) {}
}

export class FileListResponse extends T1CResponse {
    constructor(public data: FileList, public success: boolean) {
        super(success, data);
    }
}

export class FileList {
    constructor(public files: File[], public total: number) {}
}

export class FileResponse extends T1CResponse {
    constructor(public data: File, public success: boolean) {
        super(success, data);
    }
}

export class TypeListResponse extends T1CResponse {
    constructor(public data: TypeList, public success: boolean) {
        super(success, data);
    }
}

export class TypeResponse extends T1CResponse {
    constructor(public data: Type, public success: boolean){
        super(success, data);
    }
}

export class Type {
    constructor(public appid?: string, public entity?: string, public type?: string, public abs_path?: string, access_mode?: AccessMode, status?: string, public files?: number) {}
}

export class TypeList {
    constructor(public types: Type[], public total: number) {}
}

export class Page {
    constructor (public start: number, public size: number, public sort: FileSort) {}
}

/* Enumerations */

export class FileSort {
    static ASC = 'asc';
    static DESC = 'desc';
}

export class AccessMode {
    static READ = 'r';
    static WRITE = 'w';
    static EXEC = 'x';
    static READ_WRITE = 'rw';
    static READ_EXEC = 'rx';
    static WRITE_EXEC = 'wx';
    static READ_WRITE_EXEC = 'rwx';
}

export enum TypeStatus {
    MAPPED,
    UNMAPPED
}

export enum FileAction {
    UPLOAD, DOWNLOAD, COPY, MOVE
}

export class ModalType {
    static INFO = 'info';
    static CHOICE = 'choice';
}
