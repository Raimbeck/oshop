import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from 'app/shopping/components/check-out/check-out.component';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { SharedModule } from './../shared/shared.module';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/products', component: AdminProductComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/orders/edit/:id', component: CheckOutComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/orders', component: AdminOrderComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductComponent,
    AdminOrderComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
