import {JSEncrypt} from 'jsencrypt';
const semver = require('semver');


// utility class (staticly available) that can encrypt and decrypt data with the public key
// provided by the Trust1Connector.
// This public key should be loaded on startup/init of the SDK.
export class ConnectorKeyUtil {
    private static pubKey: string;

    public static getPubKey() {
        return ConnectorKeyUtil.pubKey;
    }

    public static setPubKey(key: string) {
        ConnectorKeyUtil.pubKey = key
    }

    public static decryptData(data: string | undefined): string | undefined {
        let pubKey = ConnectorKeyUtil.getPubKey();
        if (pubKey != null || pubKey != undefined) {
            let crypt = new JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.decrypt(data);
        } else {
            return undefined;
        }
    }

    public static encryptData(data: string | undefined, version?: string): string | undefined {
        if (data && data.length) {
            let pubKey = ConnectorKeyUtil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                let crypt = new JSEncrypt();
                crypt.setKey(pubKey);
                return crypt.encrypt(data);
            } else {
                if (version != undefined && semver.lt(semver.coerce(version).version, '3.5.0')) return btoa(data); else return data;
            }
        } else {
            return undefined;
        }
    }
}
