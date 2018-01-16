import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') cart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
