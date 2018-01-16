import { Order } from '../../models/order';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input('orders') orders: Order[];

  constructor() { }

  ngOnInit() {
  }

}
