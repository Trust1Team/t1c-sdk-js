
export class ObjectUtil {
    public static removeNullAndUndefinedFields(obj: any): any {
        Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
    }
}
