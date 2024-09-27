import {T1CResponse, Vdds} from "../../../..";


// This section only represents the shape of VDDS_MMI.INI 
// This types will be not required in JS Library 
// You will need to parse VDDS_MMI.INI in Rust backend to simlar data structure
// You can use algebraic enum combined with HashMap

interface IBvsRecord {
    NAME: string,
    MMOEXPORT: string,
    MMOINFEXPORT: string,
    MMOVIEW: string,
    PATDATIMPORT: string,
}


interface IPvsRecord {
    NAME: string,
    MMOINFIMPORT_OS: string
}

type IVddsIni = {
    PVS: Record<string, string>;
    BVS: Record<string, string>;

} & {
    [key: string]: IBvsRecord | IPvsRecord
}

// END VDDS_MMI Ssection



export interface AbstractVdds {
    /**
     * Code flow ( in Rust backend ):
     * 1. Obtain diretory, where "Windows" is located ( located in %windir% variable )
     * 2. In this directory, find file called VDDS_MMI.INI ( this file includes information about all BVS programs doctor has installed )
     * 3. Parse .ini file
     * 4. Obtail all "BVS system names" from parsed .ini
     * 5. For each Bvs system name, create some BvsSystem data structure
     */
    getAllAvailableBvs(): Promise<AvailableBvsResponse>;


    // Code flow ( in Rust backend ) - mmoInfoExport, PatDatImport, mmoExport
    // 1. Obtain diretory, where "Windows" is located ( located in %windir% variable )
    // 2. In this directory, find file called VDDS_MMI.INI ( this file includes information about all BVS programs doctor has installed )
    // 3. Parse .ini file
    // 4. In parsed .ini file, find correct BVS section based on "IniVddsRequest.BvsSystem" method argument
    // 5. Obtain VDDS executable absolute path for correct BVS section
    //    1. mmoInfoExport -> search for field called "MMOINFEXPORT"
    //    2. PatDatImport -> search for field called "PATDATIMPORT"
    //    3. mmoExport -> search for field called "MMOEXPORT"

    // 6. Get location of custom .ini file from "IniVddsRequest.iniFile" argument
    // 7. Execute VDDS .exe ( absolute path to exacutable is parsed in 5th step ) together with "custom .ini" path as first program argument
    mmoInfoExport(body: IniVddsRequest): Promise<VddsResponse>;
    PatDatImport(body: IniVddsRequest): Promise<VddsResponse>;
    mmoExport(bosy: IniVddsRequest): Promise<VddsResponse>

     /**
      * Code flow ( in Rust backend ):
      * 1. Obtain diretory, where "Windows" is located ( located in %windir% variable )
      * In this directory, find file called VDDS_MMI.INI ( this file includes information about all BVS programs doctor has installed )
      * Parse .ini file
      * In parsed .ini file, find correct BVS section based on "IniVddsRequest.BvsSystem" method argument
      * Obtain VDDS executable absolute path for correct BVS section ( search for field called MMOVIEW )
      * Parse program arguments from "ViewVddsRequest.args" method argument
      * Execute VDDS .exe ( absolute path to exacutable is parsed in 5th step ) together with program arguments
     */
    MmoView(body: ViewVddsRequest): Promise<VddsResponse>;


    
}

type BvsSystem = {
    name: string
}


/**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {BvsSystem} bvsSystem - Return vale of "getAllAvailableBvs" 
   * @param {FileDescriptor} - Descriptor of custom .ini file.
*/
interface IniVddsRequest {
    bvsSystem: BvsSystem,
    iniFile: FileDescriptor 
}


/**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {BvsSystem} bvsSystem - Return vale of "getAllAvailableBvs" 
   * @param {FileDescriptor} - Arguments for VDDS executable
*/
export interface ViewVddsRequest {
    bvsSystem: BvsSystem,
    args: Array<String> 
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

export class AvailableBvsResponse extends T1CResponse {
    constructor(public success: boolean, data: BvsSystem[]) {
        super(success, data)
    }
}