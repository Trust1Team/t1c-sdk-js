import { BoolDataResponse, DataResponse, T1CLibException, T1CResponse } from "../../../..";
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
export declare class ListFilesRequest {
    path: string;
    extensions: string[];
    constructor(path: string, extensions: string[]);
}
export declare class File {
    extension: string;
    name: string;
    path: string;
    size: number;
    type: string;
    entity: string;
    last_modification_time: string;
    is_dir: boolean;
    access_mode: AccessMode;
    constructor(extension: string, name: string, path: string, size: number, type: string, entity: string, last_modification_time: string, is_dir: boolean, access_mode: AccessMode);
}
export declare class FileListResponse extends T1CResponse {
    data: FileList;
    success: boolean;
    constructor(data: FileList, success: boolean);
}
export declare class FileList {
    files: File[];
    total: number;
    constructor(files: File[], total: number);
}
export declare class FileResponse extends T1CResponse {
    data: File;
    success: boolean;
    constructor(data: File, success: boolean);
}
export declare class TypeListResponse extends T1CResponse {
    data: TypeList;
    success: boolean;
    constructor(data: TypeList, success: boolean);
}
export declare class TypeResponse extends T1CResponse {
    data: Type;
    success: boolean;
    constructor(data: Type, success: boolean);
}
export declare class Type {
    appid?: string | undefined;
    entity?: string | undefined;
    type?: string | undefined;
    abs_path?: string | undefined;
    files?: number | undefined;
    constructor(appid?: string | undefined, entity?: string | undefined, type?: string | undefined, abs_path?: string | undefined, access_mode?: AccessMode, status?: string, files?: number | undefined);
}
export declare class TypeList {
    types: Type[];
    total: number;
    constructor(types: Type[], total: number);
}
export declare class Page {
    start: number;
    size: number;
    sort: FileSort;
    constructor(start: number, size: number, sort: FileSort);
}
export declare class FileSort {
    static ASC: string;
    static DESC: string;
}
export declare class AccessMode {
    static READ: string;
    static WRITE: string;
    static EXEC: string;
    static READ_WRITE: string;
    static READ_EXEC: string;
    static WRITE_EXEC: string;
    static READ_WRITE_EXEC: string;
}
export declare enum TypeStatus {
    MAPPED = 0,
    UNMAPPED = 1
}
export declare enum FileAction {
    UPLOAD = 0,
    DOWNLOAD = 1,
    COPY = 2,
    MOVE = 3
}
export declare class ModalType {
    static INFO: string;
    static CHOICE: string;
}
