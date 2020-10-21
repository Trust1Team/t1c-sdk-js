import {JSEncrypt} from 'jsencrypt';

export class Pinutil {
    private static pubKey: string;

    public static getPubKey() {
        return Pinutil.pubKey;
    }

    public static setPubKey(key: string) {
        Pinutil.pubKey = key
    }

    public static encryptPin(pin: string | undefined): string | undefined {
        if (pin && pin.length) {
            let pubKey = Pinutil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                // encrypt pin with pubkey
                let crypt = new JSEncrypt();
                crypt.setKey(pubKey);
                return crypt.encrypt(pin);
            } else {
                return pin;
            }
        } else {
            return undefined;
        }
    }
}
