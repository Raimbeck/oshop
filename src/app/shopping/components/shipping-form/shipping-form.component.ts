import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { ShippingInfo } from '../../../shared/models/shippingInfo';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart;
  userSubscription: Subscription;
  shipping: ShippingInfo;
  userId: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shipping = new ShippingInfo();
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
