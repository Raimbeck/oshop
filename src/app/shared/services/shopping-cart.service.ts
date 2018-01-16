import { ShoppingCartItem } from '../models/shopping-cart-item';
import { FirebaseObject } from '../models/firebase-object';
import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges<FirebaseObject>()
      .map(sc => {
        console.log(sc);
        return new ShoppingCart(sc.items);
      });
  }

  addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateQuantity(product, -1 );
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + "/items").remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + "/items/" + productId);
  }

  private async updateQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges<ShoppingCartItem>().take(1).subscribe(item => {
      let quantity = ((item && item.quantity) || 0) + change;
      if(quantity === 0) item$.remove();
      else item$.update({
        quantity: quantity,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price
      });
    });
  }


}
