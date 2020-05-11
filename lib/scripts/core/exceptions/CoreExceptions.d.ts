import { T1CClient } from '../T1CSdk';
export declare class T1CLibException {
    status: number;
    code: string;
    description: string;
    client?: T1CClient | undefined;
    constructor(status: number, code: string, description: string, client?: T1CClient | undefined);
}
