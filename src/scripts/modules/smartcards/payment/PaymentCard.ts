
export class PaymentVerifyPinData {
    constructor(public pin?: string, public osDialog? :boolean) {
    }
}

export class PaymentSignData {
    constructor(public txId: string, public language: string, public data: string) {
    }
}
