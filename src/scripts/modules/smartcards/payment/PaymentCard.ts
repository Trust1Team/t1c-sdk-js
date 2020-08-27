
export class PaymentVerifyPinData {
    constructor(public pin?: string, public osDialog? :boolean) {
    }
}

export class PaymentSignData {
    constructor(public txId: string, language: string, data: string) {
    }
}
