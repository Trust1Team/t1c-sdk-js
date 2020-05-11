export {UrlUtil};

class UrlUtil {
    // constructor
    constructor() {
    }

    public static create(base: string, suffix: string, skipCitrixCheck: boolean) {
        return base + suffix;
    }
}
