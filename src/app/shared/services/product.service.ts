import { Observable } from 'rxjs/Rx';
import { Product } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getProducts(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .map(products => {
        let data = [];
        products.forEach(p => data.push({ key: p.key, ...p.payload.val() }));
        return data;
      });
  }

  getProduct(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  updateProduct(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id) {
    return this.db.object('/products/' + id).remove();
  }

}
