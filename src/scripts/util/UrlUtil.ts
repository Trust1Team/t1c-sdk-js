export {UrlUtil};

class UrlUtil {
    // constructor
    constructor() {
    }

    public static create(base: string, suffix: string) {
        return encodeURI(base + suffix);
    }
}
