import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product = {};

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
      this.productService.getProduct(this.id)
        .take(1).subscribe(product => this.product = product);
  }

  save(product) {
    this.id
      ? this.productService.updateProduct(this.id, product)
      : this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
