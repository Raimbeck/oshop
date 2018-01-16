import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shipping-summary',
  templateUrl: './shipping-summary.component.html',
  styleUrls: ['./shipping-summary.component.css']
})
export class ShippingSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  constructor() { }

  ngOnInit() {
  }

}
