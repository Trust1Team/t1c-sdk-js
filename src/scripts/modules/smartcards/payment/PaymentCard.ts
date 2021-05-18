
export class PaymentVerifyPinData {
    constructor(public pin?: string, public osDialog? :boolean, public base64Encoded?: boolean) {
    }
}

export class PaymentSignData {
    constructor(public txId: string, public language: string, public data: string) {
    }
}
