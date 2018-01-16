import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../models/order';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  placeOrder(order: Order) {
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    
    return result;
  }

  getOrders() {
    return this.db.list('/orders')
      .snapshotChanges().map(orders => {
        let data = [];
        orders.forEach(o => data.push({key: o.key, ...o.payload.val()}));
        return data;
      });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().map(orders => {
        let data = [];
        orders.forEach(o => data.push({ key: o.key, ...o.payload.val() }));
        return data;
      });
  }

}
