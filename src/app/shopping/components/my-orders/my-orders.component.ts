import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orders$ = this.authService.user$.switchMap(user => this.orderService.getOrdersByUser(user.uid));
  }

}
