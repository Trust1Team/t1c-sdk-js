import { LocalConnection } from '../../../../core/client/Connection';
export declare class EidBe {
    static CONTAINER_PREFIX: string;
    static RN_DATA: string;
    static ADDRESS: string;
    static PHOTO: string;
    static TOKEN: string;
    static VERIFY_PRIV_KEY_REF: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
}
