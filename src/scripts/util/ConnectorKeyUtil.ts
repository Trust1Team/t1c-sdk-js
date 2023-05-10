import { JSEncrypt } from "jsencrypt";
const CryptoJS = require("crypto-js");
const semver = require('semver');


// utility class (statically available) that can encrypt and decrypt data with the public key
// provided by the Trust1Connector.
// This public key should be loaded on startup/init of the SDK.
export class ConnectorKeyUtil {
    private static pubKey: string;
    private static reset: boolean = false;

    public static getPubKey() {
        return ConnectorKeyUtil.pubKey;
    }

    public static setPubKey(key: string) {
        ConnectorKeyUtil.pubKey = key;
        ConnectorKeyUtil.reset = false;
    }

    public static clearPubKey() {
        ConnectorKeyUtil.reset = true;
    }

    // When set to true -> skips validation of the response until key set
    public static keyReset() {
        return ConnectorKeyUtil.reset
    }

    public static decryptData(data: string | undefined): string | undefined {
        if (data) {
            let pubKey = ConnectorKeyUtil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                let crypt = new JSEncrypt();
                crypt.setKey(pubKey);
                let response: string | false = crypt.decrypt(data);
                if (response != false) {
                    // @ts-ignore
                    return response
                }
                else {
                    return undefined
                }
            } else {
                return undefined;
            }
        } else {
            return undefined
        }
    }


    public static verifySignature(data: string | undefined, signature: string | undefined): boolean | undefined {
        if (data && signature) {
            let pubKey = ConnectorKeyUtil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                let crypt = new JSEncrypt();
                crypt.setPublicKey(pubKey);
                return crypt.verify(data, signature, CryptoJS.SHA256)
            }
            else {
                return undefined
            }
        } else {
            return undefined
        }
    }

    public static encryptData(data: string | undefined, version?: string): string | undefined {
        if (data && data.length) {
            let pubKey = ConnectorKeyUtil.getPubKey();
            if (pubKey != null || pubKey != undefined) {
                let crypt = new JSEncrypt();
                crypt.setKey(pubKey);
                let response: string | boolean = crypt.encrypt(data);
                if (response != false) {
                    // @ts-ignore
                    return response
                }
                else {
                    return undefined
                }
            } else {
                if (version != undefined && semver.lt(semver.coerce(version).version, '3.5.0')) return btoa(data); else return data;
            }
        } else {
            return undefined;
        }
    }
}
