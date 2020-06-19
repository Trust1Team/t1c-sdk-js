export class Util {

    public static includes(array: any[], searchElement: any, fromIndex?: number) {
        if (array == null) {
            throw new TypeError('array is null or not defined');
        }
        let o = Object(array);
        let len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        let n: number = fromIndex? fromIndex : 0;
        let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        function sameValueZero(x: any, y: any) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
        while (k < len) {
            if (sameValueZero(o[k], searchElement)) {
                return true;
            }
            k++;
        }
        return false;
    }

    // checks if value is an empty object, collection, map, or set.
    public static isEmpty(value: any) {
        if (Array.isArray(value)) {
            return value.length <= 0;
        }
        else if (typeof value === 'object' && value !== null) {
            return Object.keys(value).length <= 0;
        }
        else if (value instanceof Set && value !== null) {
            return value.size <= 0;
        }
        else if (value instanceof Map && value !== null) {
            return value.size <= 0;
        }
        else {
            return true;
        }
    }
}
