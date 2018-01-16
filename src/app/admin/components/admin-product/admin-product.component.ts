import { Product } from '../../../shared/models/product';
import { Observable, Subscription } from 'rxjs/Rx';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table/src';

@Component({
  selector: 'admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  
  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    this.subscription = this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(this.products);
      });
  }

  filter(query: string) {
    let filteredProducts = (query)
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
    
    this.initializeTable(filteredProducts);
  }

  initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.count().then(count => this.itemCount = count);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reloadItems(params) {
    if(!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }
}
