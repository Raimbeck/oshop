import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[];
  filteredProducts: Product[];
  cart$: Observable<ShoppingCart>;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private filterProducts() {
    this.filteredProducts = (this.category)
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }

  private populateProducts() {
    this.productService.getProducts().switchMap(products =>{
      this.products=products;

      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.filterProducts();
    });
  }

}
