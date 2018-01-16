export class ShippingInfo {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;

    constructor(init?: Partial<ShippingInfo>) {
        Object.assign(this, init);
    }
}