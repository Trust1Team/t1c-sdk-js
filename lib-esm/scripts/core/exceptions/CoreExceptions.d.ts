import { T1CClient } from "../T1CSdk";
export declare class T1CLibException {
    code: string;
    description: string;
    client?: T1CClient | undefined;
    constructor(code: string, description: string, client?: T1CClient | undefined);
}
