import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories')
      .snapshotChanges()
      .map(categories => {
        let data = [];
        categories.forEach(c => data.push({ key: c.key, ...c.payload.val() }));
        return data;
      });
  }

}
