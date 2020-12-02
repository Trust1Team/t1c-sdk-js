import {
    AbstractFileExchange,
    FileListResponse,
    FileResponse, Page,
    TypeListResponse,
    TypeResponse
} from "./FileExchangeModel";
import {
    BoolDataResponse,
    DataResponse,
    LocalConnection,
    T1CLibException
} from "../../../..";

export class FileExchange implements AbstractFileExchange {
    static PATHFILEAPP = '/apps/file';

    static DOWNLOAD = '/download';
    static UPLOAD = '/upload';
    static TYPECREATE = '/create-type';
    static TYPEDIRSCREATE = '/create-type-dirs';
    static TYPEUPDATE = '/update-type';
    static TYPESLIST = '/list-types';
    static TYPELIST = '/list-type';
    static TYPECONTENTLIST = '/list-type-content';
    static CONTENTLIST = '/list-content';
    static TYPEDELETE = '/delete-type';
    static TYPEEXISTS = '/exist-type';
    static FILEEXISTS = '/exist-file';
    static FILEMOVE = '/move-file';
    static FILECOPY = '/copy-file';
    static FILERENAME = '/rename-file';
    static ACCESSMODE = '/get-access-mode';
    static DIRCREATE = '/create-dir';
    static FILEINFO = '/get-file-info';

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
    ) {
    }

    copyFile(entity: string, fromType: string, toType: string, fileName: string, newFileName: string, fromRelPath?: [string], toRelPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse> {
        let body = {entity, fromType, toType, fileName, newFileName, fromRelPath, toRelPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.FILECOPY),
            body,
            undefined,
            undefined,
            callback
        );
    }

    createDir(entity: string, type: string, relPath: [string], recursive?: boolean, callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse> {
        let body = {entity, type, relPath, recursive};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.DIRCREATE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    createType(entity: string, type: string, initPath?: [string], modal?: boolean, timeout?: number, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse> {
        let body = {entity, type, modal, timeout, initPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPECREATE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    createTypeDirs(entity: string, type: string, relPath: [string], modal?: boolean, timeout?: number, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse> {
        let body = {entity, type, modal, timeout, relPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPEDIRSCREATE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    deleteType(entity: string, type: string, callback?: (error: T1CLibException, data: boolean) => void): Promise<boolean> {
        let body = {entity, type};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPEDELETE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    download(entity: string, type: string, file: Int8Array, fileName: string, relPath?: [string], implicitCreationType?: boolean, notifyOnCompletion?: boolean, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<DataResponse> {
        let body = {entity, type, file, fileName, relPath, implicitCreationType, notifyOnCompletion};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.DOWNLOAD),
            body,
            undefined,
            undefined,
            callback
        );
    }

    existsFile(entity: string, type: string, relPath: [string], callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        let body = {entity, type, relPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.FILEEXISTS),
            body,
            undefined,
            undefined,
            callback
        );
    }

    existsType(entity: string, type: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        let body = {entity, type};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPEEXISTS),
            body,
            undefined,
            undefined,
            callback
        );
    }

    getAccessMode(entity: string, type: string, fileName: string, relPath?: [string], callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        let body = {entity, type, fileName, relPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.ACCESSMODE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    getFileInfo(entity: string, type: string, fileName: string, relPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse> {
        let body = {entity, type, fileName, relPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.FILEINFO),
            body,
            undefined,
            undefined,
            callback
        );
    }

    listContent(entity: string, page?: Page, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse> {
        let body = {entity, page};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.CONTENTLIST),
            body,
            undefined,
            undefined,
            callback
        );
    }

    listType(entity: string, type: string, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse> {
        let body = {entity, type};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPELIST),
            body,
            undefined,
            undefined,
            callback
        );
    }

    listTypeContent(entity: string, type: string, relPath?: [string], page?: Page, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<FileListResponse> {
        let body = {entity, type, relPath, page};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPECONTENTLIST),
            body,
            undefined,
            undefined,
            callback
        );
    }

    listTypes(entity: string, page?: Page, callback?: (error: T1CLibException, data: TypeListResponse) => void): Promise<TypeListResponse> {
        let body = {entity, page};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPESLIST),
            body,
            undefined,
            undefined,
            callback
        );
    }

    moveFile(entity: string, fromType: string, toType: string, fileName: string, fromRelPath?: [string], toRelPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse> {
        let body = {entity, fromType, toType, fileName, fromRelPath, toRelPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.FILEMOVE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    renameFile(entity: string, type: string, fileName: string, newFileName: string, relPath?: [string], callback?: (error: T1CLibException, data: FileResponse) => void): Promise<FileResponse> {
        let body = {entity, type, fileName, newFileName, relPath};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.FILERENAME),
            body,
            undefined,
            undefined,
            callback
        );
    }

    updateType(entity: string, type: string, timeout?: number, callback?: (error: T1CLibException, data: TypeResponse) => void): Promise<TypeResponse> {
        let body = {entity, type, timeout};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.TYPEUPDATE),
            body,
            undefined,
            undefined,
            callback
        );
    }

    upload(entity: string, type: string, fileName: string, relPath?: [string], notifyOnCompletion?: boolean, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<Int8Array> {
        let body = {entity, type, fileName, relPath, notifyOnCompletion};
        return this.connection.post(
            this.baseUrl,
            this.fileApp(FileExchange.UPLOAD),
            body,
            undefined,
            undefined,
            callback
        );
    }



    // resolves the readerid in the base URL
    protected fileApp(path?: string): string {
        let suffix = this.containerUrl;
        suffix += FileExchange.PATHFILEAPP;
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

}
