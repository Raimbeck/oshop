import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsAsObject: {[key: string]: ShoppingCartItem}) {
        this.itemsAsObject = itemsAsObject || {};
        for(let productId in itemsAsObject)
            this.items.push(new ShoppingCartItem({
                key: productId,
                ...this.itemsAsObject[productId]
            }));
        
    }

    get totalPrice(): number {
        let totalPrice = 0;

        for(let item of this.items)
            totalPrice += item.totalPrice;
        return totalPrice;
    }

    getQuantity(product: Product) {
        let item = this.itemsAsObject[product.key];
        return (item) ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        for(let item of this.items) 
            count += item.quantity;

        return count;
    }
}