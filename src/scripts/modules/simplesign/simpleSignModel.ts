import { GenericT1CResponse } from '../../core/service/CoreModel';

export interface AbstractSimpleSign {
  getInfo(): Promise<GenericT1CResponse<SimpleSignInfoResponse>>;
  initializeContext(origin: string): Promise<GenericT1CResponse<SimpleSignInitializeResponse>>;
  uploadFileContext(origin: string, request: SimpleSignUploadFileContextRequest): Promise<GenericT1CResponse<SimpleSignUploadFileContextResponse>>;
}

export interface SimpleSignInfoResponse {
  version: string;
  localFolder: string;
}

export interface SimpleSignInitializeResponse {
  folderBootstrap: string;
  folderExternalUploaded: string;
  folderExternalSigned: string;
  filexOrigin: string;
  filexEntity: string;
  filexTypes: Array<string>;
}

export interface SimpleSignUploadFileContextResponse {
  origin: string;
  entity: string;
  filename: string;
  callback: string;
  externalId: string;
}

export interface SimpleSignUploadFileContextRequest {
  filename: string;
  callback: string;
  externalId: string;
}