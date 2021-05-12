import {JSEncrypt} from 'jsencrypt';
const semver = require('semver');

export class Pinutil {
    private static pubKey: string;

    public static getPubKey() {
        return Pinutil.pubKey;
    }

    public static setPubKey(key: string) {
        Pinutil.pubKey = key
    }

    public static encryptPin(pin: string | undefined, version?: string): string | undefined {
        if (pin && pin.length) {
            let pubKey = Pinutil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                let crypt = new JSEncrypt();
                crypt.setKey(pubKey);
                return crypt.encrypt(pin);
            } else {
                if (version != undefined && semver.gte(version, '3.4.9')) return btoa(pin); else return pin;
            }
        } else {
            return undefined;
        }
    }
}
