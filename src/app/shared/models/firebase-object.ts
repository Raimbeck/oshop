import { ShoppingCartItem } from './shopping-cart-item';
export interface FirebaseObject {
    dateCreated: number,
    items: { [key: string]: ShoppingCartItem }
}