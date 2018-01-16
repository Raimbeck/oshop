import { ShoppingCart } from './shopping-cart';
import { ShippingInfo } from './shippingInfo';
export class Order {
    key?: string;
    datePlaced: number;
    items: any[];

    constructor(
        public userId: string, 
        public shipping: ShippingInfo, 
        shoppingCart: ShoppingCart
    ) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(item => {
            return {
                product: {
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
            }
        });
    }
}