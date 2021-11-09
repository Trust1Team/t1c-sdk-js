import { local } from "store2";

export class ConsentUtil {
    private static consentKey: string = "t1c-consent-";


    public static removeConsent(domain: string) {
        localStorage.removeItem(ConsentUtil.consentKey + domain)
    }

    public static getRawConsent(domain: string): string | null {
        const localConsent = localStorage.getItem(ConsentUtil.consentKey + domain)
        if (localConsent != null) {
            return localConsent
        } else {
            return null;
        }
    }

    public static getConsents(domain: string): Array<string> | null {
        const localConsent = localStorage.getItem(ConsentUtil.consentKey + domain)
        if (localConsent != null) {
            try {
                return JSON.parse(localConsent);
            } catch (error) {
                // cleanup because not parsable
                console.error(error)
                return null;
            }
        } else {
            console.error("No consent present")
            return null;
        }
    }

    public static setConsents(consentValue: Array<string> | null, domain: string) {
        if (consentValue != null) localStorage.setItem(ConsentUtil.consentKey + domain, JSON.stringify(consentValue));
    }

    public static parseConsent(consentValue: string) : Consent | null {
        try {
            let obj = JSON.parse(atob(consentValue));
            return new Consent(
              new ConsentAgent(obj.agent.username,
                obj.agent.apiIp,
                obj.agent.apiPort,
                obj.agent.apiPid,
                obj.agent.sandboxIp,
                obj.agent.sandboxPort,
                obj.agent.sandboxPid,
                obj.agent.apiLastUsed,
                obj.agent.clientLastUsed,
                obj.agent.validityInDays,
                obj.agent.connectionState,
                obj.agent.hostname),
              obj.signedHash
            );
        } catch (error) {
            // cleanup because not parsable
            console.error(error)
            return null;
        }
    }

    public static getConsent(domain: string): Consent | null {
        const localConsent = localStorage.getItem(ConsentUtil.consentKey + domain)
        if (localConsent != null) {
            try {
                let obj = JSON.parse(atob(localConsent));
                return new Consent(
                    new ConsentAgent(obj.agent.username,
                        obj.agent.apiIp,
                        obj.agent.apiPort,
                        obj.agent.apiPid,
                        obj.agent.sandboxIp,
                        obj.agent.sandboxPort,
                        obj.agent.sandboxPid,
                        obj.agent.apiLastUsed,
                        obj.agent.clientLastUsed,
                        obj.agent.validityInDays,
                        obj.agent.connectionState,
                        obj.agent.hostname),
                    obj.signedHash
                );
            } catch (error) {
                // cleanup because not parsable
                console.error(error)
                localStorage.removeItem(ConsentUtil.consentKey + domain)
                return null;
            }

        } else {
            console.error("No consent present")
            return null;
        }
    }

    public static setConsent(consentValue: string, domain: string) {
        localStorage.setItem(ConsentUtil.consentKey + domain, consentValue)
    }
}

export class Consent {
    constructor(public agent: ConsentAgent, public signedHash?: string) {
    }
}

export class ConsentAgent {
    constructor(public username: string,
                public apiIp: string,
                public apiPort: string,
                public apiPid: string,
                public sandboxIp: number,
                public sandboxPort: number,
                public sandboxPid: string,
                public apiLastUsed: string,
                public clientLastUsed: string,
                public validityInDays: string,
                public connectionState: string,
                public hostname: string,) {
    }
}


// {
//     "agent": {
//     "username": "gilles",
//         "apiIp": "t1c.t1t.io",
//         "apiPort": "51884",
//         "apiPid": "76651",
//         "sandboxIp": "t1c.t1t.io",
//         "sandboxPort": "50051",
//         "sandboxPid": "76652",
//         "apiLastUsed": "2021-06-07 10:24:11.369992 UTC",
//         "clientLastUsed": "2021-06-07 10:27:14.230111 UTC",
//         "validityInDays": "365",
//         "connectionState": "CONSENT"
// },
//     "singedHash": "Gj84Qr5DJgsX6nkmmIQfxpAdghSC3nm6Yt7lhxbIQuzei7EyvrBYh9exiMGtpzVaRgz5ZZ9/W57JilEVKaTFoHNU4c3q+Nisl+UQyojhPbKW3ti8YENsMNz4ZhIVN+RGpMxdoH0D9yZj98CfWR72kSKRjh4z29373NgnSBeo7OIOV+iO2A2igzVoCtugvsNEAcOOXFz4V6oAoXfcre4Mf8HHgSd72Ygd3nPrlU6nd2fI2ZleRyJ2knIco5fGNlJBDK0IQ2Y2M/HmBpXMmkwAgTlMzzM1jUyfeQFMA5ORJNnlgPq3+AzNvAydpBBwEfB5FTAJ1UHw2fMe+fw2yyo7cA=="
// }
