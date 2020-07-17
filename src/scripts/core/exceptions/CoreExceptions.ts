import {ObjectUtil} from '../../util/ObjectUtil';
import {T1CClient} from "../T1CSdk";
/**
 * Generic T1CLib exception
 */
export class T1CLibException {
  constructor(public code: string, public description: string, public client?: T1CClient) {
    // remove null and undefined fields during construction
    ObjectUtil.removeNullAndUndefinedFields(this);
  }
}
