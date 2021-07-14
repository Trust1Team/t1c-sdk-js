
export class PaymentVerifyPinData {
    constructor(public pin?: string, public osDialog? :boolean, public base64Encoded?: boolean, public timeout?: number) {
    }
}

export class PaymentSignData {
    constructor(public txId: string, public language: string, public data: string, public timeout?: number) {
    }
}
